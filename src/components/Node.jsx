import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Node({
  sphere,
  brain,

  morph,

  explode,
  explosionTarget,

  showSkillClusters,
  skillTarget,
  skillColor,

  color,
  size,
}) {
  const ref = useRef();
  const colorObj = useRef(new THREE.Color(color));
  const targetColorObj = useRef(new THREE.Color(color));

  useFrame(() => {
    if (!ref.current) return;

    let target;
    let speed;

    if (showSkillClusters) {
      target = skillTarget;
      speed = 0.05;
      targetColorObj.current.set(skillColor || color);
    }
    else if (explode) {
      target = explosionTarget;
      speed = 0.15;
      targetColorObj.current.set(color);
    }
    else if (morph) {
      target = brain;
      speed = 0.04;
      targetColorObj.current.set(color);
    }
    else {
      target = sphere;
      speed = 0.04;
      targetColorObj.current.set(color);
    }

    ref.current.position.x +=
      (target[0] - ref.current.position.x) * speed;

    ref.current.position.y +=
      (target[1] - ref.current.position.y) * speed;

    ref.current.position.z +=
      (target[2] - ref.current.position.z) * speed;

    // Lerp color
    colorObj.current.lerp(targetColorObj.current, 0.04);
    if (ref.current.material) {
      ref.current.material.color.copy(colorObj.current);
    }
  });

  return (
    <mesh ref={ref} position={sphere}>
      <sphereGeometry args={[size * 0.7, 8, 8]} />
      <meshBasicMaterial color={color} transparent />
    </mesh>
  );
}