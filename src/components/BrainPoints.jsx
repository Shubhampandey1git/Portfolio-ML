import { useGLTF } from "@react-three/drei";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler";
import { useMemo } from "react";
import * as THREE from "three";

export default function useBrainPoints(count = 250) {

  const { scene } = useGLTF("/brain.glb");

  return useMemo(() => {

    const points = [];

    let mesh;

    scene.traverse((child) => {
      if (child.isMesh && !mesh) {
        mesh = child;
      }
    });

    if (!mesh) return [];

    const sampler = new MeshSurfaceSampler(mesh).build();

    const temp = new THREE.Vector3();

    while (points.length < count) {
    sampler.sample(temp);

    const d = Math.sqrt(
        temp.x * temp.x +
        temp.y * temp.y +
        temp.z * temp.z
    );

    // Remove dense center
    const keepChance = Math.min(1, d * 1.5);

    if (Math.random() > keepChance) continue;


    // Stretch hemispheres slightly
    const x = temp.x * 1.25;
    const y = temp.y;
    const z = temp.z;

    points.push([
        x * 4,
        y * 4,
        z * 4,
    ]);
    }

    return points;

  }, [scene, count]);
}