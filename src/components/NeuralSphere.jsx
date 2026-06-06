import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import Node from "./Node";
import useBrainPoints from "./BrainPoints";
import ProjectClusters, { PROJECTS, tickClusters } from "./ProjectClusters";
import { buildSkillNetwork } from "./SkillNetwork";
import SkillHubs from "./SkillHubs";
import useResponsive from "../hooks/useResponsive";

function makeNodeRef() {
  return {
    hovered:   { current: false },
    outer:     { current: null },
    mid:       { current: null },
    core:      { current: null },
    ring:      { current: null },
    cardGroup: { current: null },
    group:     { current: null },
  };
}

function MobileScale({ active }) {
  const { camera, size } = useThree();

  useFrame(() => {
    if (!active) return;
    // On narrow screens, zoom out to fit the network
    const targetZ = size.width < 768 ? 12 : 6;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);
  });

  return null;
}

const COL_COLORS_LIST = ["#00ff66", "#00e5ff", "#7b61ff", "#ff66ff"];

function Nodes({
  morph,
  expand,
  showBrainConnections,
  hideEdges,
  showProjectClusters,
  setSelectedProject,
  showSkillClusters,
  showExplosion,
  isMobile,
}) {
  // This group rotates for sphere/brain, but we stop rotating once skill clusters show
  const groupRef    = useRef();
  const rotationRef = useRef(0); // tracks current Y rotation

  const clusterNodeRefs = useMemo(() => PROJECTS.map(() => makeNodeRef()), []);

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 800; i++) {
      const radius = 2 + Math.random() * 1.2;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(2 * Math.random() - 1);
      arr.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }
    return arr;
  }, []);

  const brainPositions = useBrainPoints(800);

  const skillNodes = useMemo(() => buildSkillNetwork().nodes, []);

  const explosionCloudTargets = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 800; i++) {
      const radius = 4 + Math.random() * 3;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(2 * Math.random() - 1);
      arr.push([
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
      ]);
    }
    return arr;
  }, []);

  const skillNetworkTargets = useMemo(() => {
    const targets = [];
    for (let i = 0; i < 800; i++) {
      const hub    = skillNodes[i % skillNodes.length];
      const radius = 0.15 + Math.random() * 0.2;
      const angle  = Math.random() * Math.PI * 2;
      targets.push([
        hub.position[0] + Math.cos(angle) * radius,
        hub.position[1] + Math.sin(angle) * radius,
        (Math.random() - 0.5) * 0.2,
      ]);
    }
    return targets;
  }, [skillNodes]);

  // Per-particle skill column color
  const skillParticleColors = useMemo(() => {
    const colCounts = [6, 6, 7, 3]; // languages, frameworks, aiml, outcomes
    const total     = skillNodes.length;
    return Array.from({ length: 800 }, (_, i) => {
      const hubIdx = i % total;
      let offset   = 0;
      for (let c = 0; c < colCounts.length; c++) {
        if (hubIdx < offset + colCounts[c]) return COL_COLORS_LIST[c];
        offset += colCounts[c];
      }
      return "#00ff66";
    });
  }, [skillNodes]);

  const activePoints = showBrainConnections ? brainPositions : nodes;

  const connections = useMemo(() => {
    const lines = [];
    for (let i = 0; i < activePoints.length; i++) {
      for (let j = i + 1; j < activePoints.length; j++) {
        const dx   = activePoints[i][0] - activePoints[j][0];
        const dy   = activePoints[i][1] - activePoints[j][1];
        const dz   = activePoints[i][2] - activePoints[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 0.5) lines.push([activePoints[i], activePoints[j]]);
      }
    }
    return lines;
  }, [activePoints]);

  const colors       = ["#00ff66", "#00ff66", "#00ff66", "#00e5ff"];
  const edgeOpacity  = useRef(0.5);
  const linesGroupRef = useRef();

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (showSkillClusters) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0,
        0.35
      );

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0,
        0.35
      );

      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        0,
        0.35
      );
    }

    if (showSkillClusters) {

      groupRef.current.rotation.set(0, 0, 0);

    }

    // --- Scale ---
    const targetScale =
      isMobile
        ? (
            showSkillClusters
              ? 0.75
              : showExplosion
                ? 0.7
                : expand
                  ? 1.0
                  : 0.35
          )
        : (
            showSkillClusters
              ? 1.0
              : showExplosion
                ? 0.9
                : expand
                  ? 1.4
                  : 0.6
          );

    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale), 0.008
    );

    // --- X offset (sphere sits right on home, centered for projects/skills) ---
    const targetX =
      isMobile
        ? 1.5
        : (expand || showSkillClusters)
          ? 0
          : 3;
    const targetY = 0;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x, targetX, 0.01
    );

    groupRef.current.position.y =
      THREE.MathUtils.lerp(
        groupRef.current.position.y,
        targetY,
        0.01
      );

    // --- Edge opacity ---
    const targetOpacity =
      showSkillClusters || showExplosion ? 0 : hideEdges ? 0 : 0.5;
    edgeOpacity.current = THREE.MathUtils.lerp(
      edgeOpacity.current, targetOpacity, 0.15
    );

    if (linesGroupRef.current) {
      linesGroupRef.current.traverse((child) => {
        if (child.material) {
          child.material.opacity     = edgeOpacity.current;
          child.material.transparent = true;
        }
      });
    }

    tickClusters(clusterNodeRefs);
  });
  

  return (
    <>
      {/* Rotating group: sphere, brain, particles, project clusters */}
      <group ref={groupRef}>
        <group ref={linesGroupRef}>
          {connections.map((line, i) => (
            <Line key={i} points={line} color="#00ff66" lineWidth={1} transparent opacity={0.5} />
          ))}
        </group>

        {nodes.map((pos, i) => (
          <Node
            key={i}
            sphere={pos}
            brain={brainPositions[i]}
            morph={morph}
            explode={showExplosion}
            explosionTarget={explosionCloudTargets[i]}
            showSkillClusters={showSkillClusters}
            skillTarget={skillNetworkTargets[i]}
            skillColor={skillParticleColors[i]}
            color={colors[Math.floor(Math.random() * colors.length)]}
            size={0.025 + Math.random() * 0.015}
          />
        ))}

        <ProjectClusters
          visible={showProjectClusters}
          nodeRefs={clusterNodeRefs}
          setSelectedProject={setSelectedProject}
        />
      </group>

      {/* Skill hubs rendered OUTSIDE the rotating group — stays front-facing */}
      <SkillHubs visible={showSkillClusters} />
    </>
  );
}

function ForceFrontView({ active }) {
  const { camera, size } = useThree();

  useFrame(() => {
    if (!active) return;

    const isMobile = size.width < 768;
    const targetZ = isMobile ? 8 : 8.5;  // just slightly back on mobile

    camera.position.lerp(
      new THREE.Vector3(0, 0, targetZ),
      0.12
    );
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function NeuralSphere({
  morph,
  expand,
  showBrainConnections,
  hideEdges,
  showProjectClusters,
  setSelectedProject,
  showSkillClusters,
  showExplosion,
  controlsRef,
}) {
  const isMobile = useResponsive();

  let autoRotateSpeed = 3;

  if (morph && !showProjectClusters) {
    autoRotateSpeed = 15;
  }
  else if (showProjectClusters) {
    autoRotateSpeed = 3;
  }
  else if (showSkillClusters) {
    autoRotateSpeed = 0;
  }
  return (
    <div
      className={
        showSkillClusters && isMobile
          ? "w-screen min-h-[1400px]"
          : "w-screen h-screen overflow-hidden"
      }
    >
      <Canvas camera={{ position: [0, 0, isMobile ? 9 : 6]}}>
        <MobileScale active={showSkillClusters} />
        <ForceFrontView active={showSkillClusters} />
        <ambientLight intensity={5} />
        <directionalLight position={[5, 5, 5]} intensity={5} />
        <Nodes
          morph={morph}
          expand={expand}
          showBrainConnections={showBrainConnections}
          hideEdges={hideEdges}
          showProjectClusters={showProjectClusters}
          setSelectedProject={setSelectedProject}
          showSkillClusters={showSkillClusters}
          showExplosion={showExplosion}
          isMobile={isMobile}
        />
        {/* OrbitControls only for user drag — autoRotate removed, we drive rotation manually */}
        <OrbitControls
          enabled={!showSkillClusters}
          ref={controlsRef}
          enablePan={showSkillClusters}        // ← allow pan when viewing skills
          enableRotate={!showSkillClusters}    // ← disable rotate when viewing skills
          autoRotate={!showSkillClusters}
          autoRotateSpeed={autoRotateSpeed}
          enableDamping
          dampingFactor={0.08}
          minDistance={isMobile ? 9 : 6}
          maxDistance={isMobile ? 9 : 6}
          makeDefault
        />
      </Canvas>
    </div>
  );
}