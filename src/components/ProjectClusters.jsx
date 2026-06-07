import { Sphere, Text } from "@react-three/drei";
import * as THREE from "three";

export const PROJECTS = [
  {
    label: "Visual Cortex • Computer Vision",
    color: "#00ff66",
    position: [-1.2, 0.8, 0],

    overview:
      "Drishti is an AI-powered real-time surveillance and object detection system built using modern Computer Vision techniques. The platform processes live video streams, performs object detection using YOLO, and provides intelligent scene understanding for monitoring and security applications.",

    features: [
      "Real-time object detection",
      "YOLO-based inference pipeline",
      "Live video stream processing",
      "Bounding box visualization",
      "Intelligent scene understanding"
    ],

    architecture: [
      "Camera Feed",
      "Frame Processing",
      "YOLO Detection",
      "Object Classification",
      "Visualization Layer"
    ],

    techStack: [
      "Python",
      "OpenCV",
      "YOLO",
      "NumPy",
      "Computer Vision"
    ],

    github:
      "https://github.com/Shubhampandey1git/Drishti_Computer_Vision.git",

    video:
      "https://youtu.be/9KMAdDJsxkU",
  },

  {
    label: "Agentic Cortex • Agentic AI",
    color: "#00e5ff",
    position: [1.2, 0.7, 0],

    overview:
      "A local AI assistant implementing Retrieval-Augmented Generation (RAG), semantic search, conversational memory, and LLM-powered question answering. The system enables document-aware interactions while running entirely on local hardware.",

    features: [
      "Local LLM execution",
      "PDF document ingestion",
      "Semantic retrieval",
      "Conversational memory",
      "Context-aware responses"
    ],

    architecture: [
      "User Query",
      "Embedding Generation",
      "Vector Search",
      "Context Retrieval",
      "LLM Response"
    ],

    techStack: [
      "Python",
      "LangChain",
      "Ollama",
      "Llama",
      "ChromaDB",
      "Embeddings"
    ],

    github:
      "https://github.com/Shubhampandey1git/Local-AI-Assistant-.git",

    video: "#",
  },

  {
    label: "Language Cortex • NLP",
    color: "#ffcc00",
    position: [-0.9, -0.8, 0],

    overview:
      "An end-to-end Speech-to-Text and Summarization system that converts spoken language into structured text and automatically generates concise summaries using NLP techniques.",

    features: [
      "Speech recognition",
      "Automatic transcription",
      "Text summarization",
      "Language processing",
      "Information extraction"
    ],

    architecture: [
      "Audio Input",
      "Speech Recognition",
      "Text Processing",
      "Summarization",
      "Output Generation"
    ],

    techStack: [
      "Python",
      "NLP",
      "Speech Recognition",
      "Transformers",
      "Text Processing"
    ],

    github:
      "https://github.com/Shubhampandey1git/Speech-to-Text-Summarization-app.git",

    video: "#",
  },

  {
    label: "Predictive Cortex • Recommender Systems",
    color: "#ff66ff",
    position: [1.0, -0.9, 0],

    overview:
      "A movie recommendation platform built using multiple recommendation strategies including collaborative filtering, content-based filtering, matrix factorization, and neural recommendation models.",

    features: [
      "Collaborative filtering",
      "Content-based filtering",
      "Matrix factorization",
      "Neural recommendations",
      "Personalized ranking"
    ],

    architecture: [
      "MovieLens Dataset",
      "Data Processing",
      "Feature Engineering",
      "Recommendation Engine",
      "Ranking Pipeline"
    ],

    techStack: [
      "Python",
      "Pandas",
      "Scikit-Learn",
      "TensorFlow",
      "Keras",
      "Gradio"
    ],

    github:
      "https://github.com/Shubhampandey1git/Movie-Recommendation-System.git",

    video: "#",
  },
];

export function tickClusters(nodeRefs) {
  nodeRefs.forEach(
    ({ hovered, outer, mid, core, ring, cardGroup }) => {
      const h = hovered.current;

      if (outer.current) {
        outer.current.scale.setScalar(
          THREE.MathUtils.lerp(
            outer.current.scale.x,
            h ? 1.5 : 1,
            0.1
          )
        );

        outer.current.material.opacity =
          THREE.MathUtils.lerp(
            outer.current.material.opacity,
            h ? 0.25 : 0.08,
            0.1
          );
      }

      if (mid.current) {
        mid.current.scale.setScalar(
          THREE.MathUtils.lerp(
            mid.current.scale.x,
            h ? 1.5 : 1,
            0.1
          )
        );

        mid.current.material.opacity =
          THREE.MathUtils.lerp(
            mid.current.material.opacity,
            h ? 0.4 : 0.18,
            0.1
          );
      }

      if (core.current) {
        core.current.scale.setScalar(
          THREE.MathUtils.lerp(
            core.current.scale.x,
            h ? 1.8 : 1,
            0.1
          )
        );
      }

      if (ring.current) {
        ring.current.scale.setScalar(
          THREE.MathUtils.lerp(
            ring.current.scale.x,
            h ? 1 : 0.001,
            0.1
          )
        );
      }

      if (cardGroup.current) {
        cardGroup.current.visible = h;
      }
    }
  );
}

function ClusterNode({ project, nodeRef, setSelectedProject }) {
  return (
    <group position={project.position}>

      {/* Invisible hit area */}
      <mesh
        onClick={() => setSelectedProject(project)}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
          nodeRef.hovered.current = true;
        }}
        onPointerLeave={() => {
          document.body.style.cursor = "default";
          nodeRef.hovered.current = false;
        }}
      >
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Far outer bloom */}
      <Sphere ref={nodeRef.outer} args={[0.45, 32, 32]}>
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[0.32, 32, 32]}>
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Mid glow */}
      <Sphere ref={nodeRef.mid} args={[0.22, 32, 32]}>
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.20}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Inner glow */}
      <Sphere args={[0.16, 32, 32]}>
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.45}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Core — solid */}
      <Sphere ref={nodeRef.core} args={[0.10, 32, 32]}>
        <meshBasicMaterial color={project.color} />
      </Sphere>

      {/* Ring */}
      <mesh
        ref={nodeRef.ring}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.001}
      >
        <ringGeometry args={[0.22, 0.28, 64]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Label */}
      <Text
        position={[0, -0.45, 0]}
        fontSize={0.09}
        color={project.color}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {project.label}
      </Text>

      {/* Card */}
      <group ref={nodeRef.cardGroup} position={[0.9, 0.1, 0]} visible={false}>
        <mesh>
          <planeGeometry args={[1.7, 0.9]} />
          <meshBasicMaterial color="#050505" transparent opacity={0.9} />
        </mesh>
        <Text position={[0, 0.22, 0.01]} fontSize={0.10} color={project.color} anchorX="center" fontWeight="bold">
          {project.label}
        </Text>
        <Text position={[0, -0.02, 0.01]} fontSize={0.052} maxWidth={1.5} color="#cccccc" anchorX="center" textAlign="center">
          Explore projects, research{"\n"}and implementations
        </Text>
        <Text position={[0, -0.28, 0.01]} fontSize={0.06} color={project.color} anchorX="center">
          Click To Enter →
        </Text>
      </group>

    </group>
  );
}

export default function ProjectClusters({
  visible,
  nodeRefs,
  setSelectedProject,
}) {
  if (!visible) return null;

  return (
    <>
      {PROJECTS.map((project, i) => (
        <ClusterNode
          key={i}
          project={project}
          nodeRef={nodeRefs[i]}
          setSelectedProject={setSelectedProject}
        />
      ))}
    </>
  );
}