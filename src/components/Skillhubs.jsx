import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Text, Line } from "@react-three/drei";
import * as THREE from "three";
import { buildSkillNetwork } from "./SkillNetwork";


function HubNode({ node, color }) {
  const groupRef = useRef();
  const cardRef = useRef();
  const hovered = useRef(false);
  const scale = useRef(1);

  useFrame(() => {
    const target = hovered.current ? 1.4 : 1.0;
    scale.current = THREE.MathUtils.lerp(scale.current, target, 0.12);
    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale.current);
    }
    if (cardRef.current) {
      cardRef.current.visible = hovered.current;
    }
  });

  return (
    <group ref={groupRef} position={node.position}>
      <OrbitingParticles position={[0, 0, 0]} color={color} count={20} />

      {/* Invisible hit area */}
      <mesh
        onPointerEnter={(e) => { e.stopPropagation(); hovered.current = true; document.body.style.cursor = "pointer"; }}
        onPointerLeave={() => { hovered.current = false; document.body.style.cursor = "default"; }}
      >
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Glow layers */}
      <Sphere args={[0.40, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Sphere>
      <Sphere args={[0.26, 16, 16]}>
        <meshBasicMaterial color={color} transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Sphere>
      <Sphere args={[0.17, 24, 24]}>
        <meshBasicMaterial color={color} transparent opacity={0.35} blending={THREE.AdditiveBlending} depthWrite={false} />
      </Sphere>
      <Sphere args={[0.1, 24, 24]}>
        <meshBasicMaterial color={color} />
      </Sphere>

      {/* Skill label */}
      <Text position={[0, -0.5, 0]} fontSize={0.13} color={color} anchorX="center" fontWeight="bold">
        {node.skill}
      </Text>

      {/* Hover card */}
      <group ref={cardRef} position={[0.55, 0.1, 0]} visible={false}>
        {/* Card background */}
        <mesh>
          <planeGeometry args={[1.1, 0.5 + node.projects.length * 0.13]} />
          <meshBasicMaterial color="#050505" transparent opacity={0.92} />
        </mesh>

        {/* Border line top */}
        <mesh position={[0, (0.5 + node.projects.length * 0.13) / 2 - 0.01, 0.001]}>
          <planeGeometry args={[1.1, 0.012]} />
          <meshBasicMaterial color={color} />
        </mesh>

        {/* Skill name */}
        <Text
          position={[0, (node.projects.length * 0.065), 0.01]}
          fontSize={0.09}
          color={color}
          anchorX="center"
          fontWeight="bold"
        >
          {node.skill}
        </Text>

        {/* Divider */}
        <Text
          position={[0, (node.projects.length * 0.065) - 0.13, 0.01]}
          fontSize={0.065}
          color="#555555"
          anchorX="center"
        >
          USED IN
        </Text>

        {/* Project list */}
        {node.projects.map((proj, pi) => (
          <Text
            key={pi}
            position={[0, (node.projects.length * 0.065) - 0.26 - pi * 0.13, 0.01]}
            fontSize={0.072}
            color="#cccccc"
            anchorX="center"
          >
            ◆ {proj}
          </Text>
        ))}
      </group>
    </group>
  );
}

// Orbiting particle cloud around each hub
function OrbitingParticles({ position, color, count = 18 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      angle: Math.random() * Math.PI * 2,
      speed: (0.3 + Math.random() * 0.5) * (Math.random() > 0.5 ? 1 : -1),
      radius: 0.15 + Math.random() * 0.18,
      yOffset: (Math.random() - 0.5) * 0.15,
      size: 0.01 + Math.random() * 0.008,
      tilt: Math.random() * Math.PI,
    }));
  }, [count]);

  const anglesRef = useRef(particles.map(p => p.angle));
  const meshRefs = useRef(particles.map(() => ({ current: null })));

  useFrame((_, delta) => {
    particles.forEach((p, i) => {
      anglesRef.current[i] += p.speed * delta;
      const mesh = meshRefs.current[i]?.current;
      if (!mesh) return;
      mesh.position.set(
        Math.cos(anglesRef.current[i]) * p.radius,
        p.yOffset + Math.sin(anglesRef.current[i] * 0.5) * 0.05,
        Math.sin(anglesRef.current[i]) * p.radius,
      );
    });
  });

  return (
    <group position={position}>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={meshRefs.current[i]}
          position={[
            Math.cos(p.angle) * p.radius,
            p.yOffset,
            Math.sin(p.angle) * p.radius,
          ]}
        >
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}


// Store curve data for particle animation
function buildConnections(nodes) {
  const lines = [];
  const byColumn = {};

  nodes.forEach((node) => {
    if (!byColumn[node.columnIndex]) byColumn[node.columnIndex] = [];
    byColumn[node.columnIndex].push(node);
  });

  const cols = Object.values(byColumn);

  for (let c = 0; c < cols.length - 1; c++) {
    cols[c].forEach((src) => {
      const nearest = [...cols[c + 1]]
        .sort((a, b) =>
          Math.abs(a.position[1] - src.position[1]) -
          Math.abs(b.position[1] - src.position[1])
        )
        .slice(0, 2);

      nearest.forEach((dst) => {
        const midX = (src.position[0] + dst.position[0]) / 2;
        const midY = (src.position[1] + dst.position[1]) / 2;
        const offsetY = (Math.random() - 0.5) * 1.5;
        const offsetX = (Math.random() - 0.5) * 0.8;

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(src.position[0], src.position[1], 0),
          new THREE.Vector3(midX + offsetX, midY + offsetY, 0.3),
          new THREE.Vector3(dst.position[0], dst.position[1], 0)
        );

        lines.push({
          points: curve.getPoints(30).map(p => [p.x, p.y, p.z]), // ← plain arrays
          curve,
          color: src.color,
        });
      });
    });
  }
  return lines;
}

// Particles traveling along a single curve
function TravelingParticles({ curve, color }) {
  const particles = useMemo(() => (
    Array.from({ length: 3 }, (_, i) => ({
      t: Math.random(),           // current position 0-1 along curve
      speed: 0.08 + Math.random() * 0.12,
      size: 0.012 + Math.random() * 0.01,
      offset: i / 3,              // stagger start positions
    }))
  ), []);

  const refs = useRef(particles.map(() => ({ current: null })));
  const tRef = useRef(particles.map(p => p.t));

  useFrame((_, delta) => {
    particles.forEach((p, i) => {
      tRef.current[i] = (tRef.current[i] + p.speed * delta) % 1;
      const mesh = refs.current[i]?.current;
      if (!mesh) return;
      const pos = curve.getPoint(tRef.current[i]);
      mesh.position.copy(pos);
    });
  });

  return (
    <>
      {particles.map((p, i) => (
        <mesh
          key={i}
          ref={refs.current[i]}
          position={[0, 0, 0]}
        >
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.9}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

function StarField({ visible }) {
  const particles = useMemo(() => {
    return Array.from({ length: 800 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 12,
        -(Math.random() * 3),
      ],
      size: 0.006 + Math.random() * 0.018,
      color: Math.random() > 0.6 ? "#00ff66" : Math.random() > 0.5 ? "#00e5ff" : "#7b61ff",
      opacity: 0.15 + Math.random() * 0.5,
    }));
  }, []);

  const opacityRef = useRef(0);

  useFrame(() => {
    opacityRef.current = THREE.MathUtils.lerp(
      opacityRef.current,
      visible ? 1 : 0,
      0.04
    );
  });

  if (!visible) return null;

  return (
    <>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position}>
          <sphereGeometry args={[p.size, 4, 4]} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={p.opacity * opacityRef.current}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  );
}

export default function SkillHubs({ visible }) {
  const { nodes, headers } = useMemo(() => buildSkillNetwork(), []);
  const connections = useMemo(() => buildConnections(nodes), [nodes]);

  const linesRef = useRef();
  const opacity = useRef(0);

  useFrame(() => {
    opacity.current = THREE.MathUtils.lerp(
      opacity.current,
      visible ? 0.6 : 0,
      0.06
    );

    if (linesRef.current) {
      linesRef.current.traverse((child) => {
        if (child.material) {
          child.material.opacity = opacity.current;
          child.material.transparent = true;
          child.material.blending = THREE.AdditiveBlending;
          child.material.depthWrite = false;
          child.material.needsUpdate = true;
        }
      });
    }
  });

  return (
    <group visible={visible}>  {/* ← This hides everything instantly when false */}
      <StarField visible={visible} />

      {/* Glowing lines with additive blending */}
      <group ref={linesRef}>
        {connections.map((conn, i) => (
          <Line
            key={i}
            points={conn.points}
            color={conn.color}
            transparent
            opacity={0}
            lineWidth={1.5}
            // // Additive blending via vertexColors workaround:
            // onUpdate={(self) => {
            //   self.material.blending = THREE.AdditiveBlending;
            //   self.material.depthWrite = false;
            // }}
          />
        ))}
      </group>

      {/* Traveling particles along each connection */}
      {visible && connections.map((conn, i) => (
        <TravelingParticles
          key={i}
          curve={conn.curve}
          color={conn.color}
        />
))}

      {nodes.map((node, i) => (
        <HubNode key={i} node={node} color={node.color} />
        ))}
      {headers.map((header, i) => (
        <Text key={i} position={header.position} fontSize={0.15} color={header.color} anchorX="center" fontWeight="bold">
          {header.label}
        </Text>
      ))}
    </group>
  );
}