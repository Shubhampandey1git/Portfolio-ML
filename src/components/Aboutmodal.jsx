import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// ── Mini Neural Sphere Avatar ──────────────────────────────────────────────
function AvatarParticles() {
  const groupRef = useRef();
  const particles = useRef(
    Array.from({ length: 180 }, () => {
      const radius = 1.2 + Math.random() * 0.4;
      const theta  = Math.random() * Math.PI * 2;
      const phi    = Math.acos(2 * Math.random() - 1);
      return {
        origin: new THREE.Vector3(
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta),
          radius * Math.cos(phi)
        ),
        color: ["#00ff66","#00ff66","#00e5ff"][Math.floor(Math.random()*3)],
        size:  0.03 + Math.random() * 0.025,
        phase: Math.random() * Math.PI * 2,
      };
    })
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.4;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.15;
  });

  return (
    <group ref={groupRef}>
      {particles.current.map((p, i) => (
        <mesh key={i} position={p.origin}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial
            color={p.color}
            transparent
            opacity={0.85}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      {/* Core glow */}
      <mesh>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color="#00ff66" transparent opacity={0.06}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshBasicMaterial color="#00ff66" transparent opacity={0.14}
          blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.10, 16, 16]} />
        <meshBasicMaterial color="#00ff66" />
      </mesh>
    </group>
  );
}

function NeuralAvatar() {
  return (
    <div className="relative w-48 h-48 mx-auto">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={2} />
        <AvatarParticles />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
      </Canvas>
      {/* Glow ring */}
      <div className="absolute inset-0 rounded-full"
        style={{ boxShadow: "0 0 40px rgba(0,255,102,0.15)", pointerEvents: "none" }} />
      <p className="text-center text-green-400 text-sm tracking-[0.4em] mt-1 font-bold">SHUBHAM_</p>
    </div>
  );
}

// ── Typewriter ─────────────────────────────────────────────────────────────
function Typewriter({ lines, startDelay = 0 }) {
  const [lineIndex, setLineIndex]   = useState(0);
  const [charIndex, setCharIndex]   = useState(0);
  const [done, setDone]             = useState(false);
  const [started, setStarted]       = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started || done) return;
    if (lineIndex >= lines.length) { setDone(true); return; }
    const line = lines[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex(c => c + 1), 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => { setLineIndex(l => l + 1); setCharIndex(0); }, 120);
      return () => clearTimeout(t);
    }
  }, [started, done, lineIndex, charIndex, lines]);

  return (
    <div className="font-mono text-xs leading-6">
      {lines.map((line, i) => (
        <div key={i} className="flex items-start gap-2">
          {i < lineIndex
            ? <span className="text-green-300 whitespace-pre">{line}</span>
            : i === lineIndex
              ? <span className="text-green-300 whitespace-pre">
                  {line.slice(0, charIndex)}
                  {!done && <span className="animate-pulse text-green-400">▋</span>}
                </span>
              : null
          }
        </div>
      ))}
    </div>
  );
}

// ── Timeline ───────────────────────────────────────────────────────────────
const TIMELINE = [
  {
    year: "2022",
    label: "B.Tech Starts",
    color: "#00ff66",
    detail: "Joined Bharati Vidyapeeth College of Engineering, Pune. Computer Engineering. The neural network begins training.",
  },
  {
    year: "2023",
    label: "ML Training Starts",
    color: "#00e5ff",
    detail: "Built foundational ML projects. Discovered passion for Computer Vision and NLP. Started exploring PyTorch and real-world datasets.",
  },
  {
    year: "2024",
    label: "First Projects",
    color: "#7b61ff",
    detail: "Built foundational ML projects. Discovered passion for Computer Vision and NLP. Started exploring PyTorch and real-world datasets.",
  },
  {
    year: "2025",
    label: "Labmentix Intern",
    color: "#ffcc00",
    detail: "AI/ML Intern at Labmentix (Jul–Nov 2025). Built NLP models, end-to-end pipelines, domain-specific models 15–20% better than baselines.",
  },
  {
    year: "2025",
    label: "Research Paper",
    color: "#ff66ff",
    detail: "Published research on Speech-to-Text Summarization System for Smart Note-Taking. Accepted under Integrated Research Advances 2026, pending Google Scholar indexing.",
  },
  {
    year: "2026",
    label: "DRISHTI",
    color: "#ff0000",
    detail: "Built real-time Edge AI threat detection system. YOLOv8 → TFLite → Android. 30K+ image dataset. 20-30 FPS on-device.",
  },
  {
    year: "2026",
    label: "Final Epoch",
    color: "#00ff66",
    detail: "Last 10 days of B.Tech. Final exams. 4 years of training complete. CGPA: 7.5. Ready to deploy into the real world.",
  },
];

function TimelineNode({ node, index, active, onClick }) {
  const isActive = active === index;
  return (
    <div className="flex flex-col items-center cursor-pointer group" onClick={() => onClick(index)}>
      {/* Connector line (left side) */}
      <div className="flex items-center w-full">
        {index > 0 && (
          <div className="flex-1 h-px"
            style={{ background: `linear-gradient(to right, ${TIMELINE[index-1].color}44, ${node.color}44)` }} />
        )}
        {/* Node */}
        <div className="relative flex-shrink-0">
          {/* Outer glow */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-300"
            style={{
              boxShadow: isActive
                ? `0 0 24px ${node.color}, 0 0 48px ${node.color}44`
                : `0 0 8px ${node.color}66`,
              background: `${node.color}11`,
              transform: isActive ? "scale(1.8)" : "scale(1)",
            }}
          />
          <div
            className="relative w-4 h-4 rounded-full border-2 transition-all duration-300"
            style={{
              borderColor: node.color,
              background: isActive ? node.color : "transparent",
              boxShadow: isActive ? `0 0 12px ${node.color}` : "none",
            }}
          />
        </div>
        {index < TIMELINE.length - 1 && (
          <div className="flex-1 h-px"
            style={{ background: `linear-gradient(to right, ${node.color}44, ${TIMELINE[index+1].color}44)` }} />
        )}
      </div>

      {/* Year + label */}
      <div className="mt-3 text-center">
        <p className="text-xs font-bold" style={{ color: node.color }}>{node.year}</p>
        <p className="text-gray-400 text-xs mt-0.5 group-hover:text-gray-200 transition-colors w-16 text-center leading-tight">
          {node.label}
        </p>
      </div>
    </div>
  );
}

// ── Main Modal ─────────────────────────────────────────────────────────────
export default function AboutModal({ isOpen, onClose }) {
  const [activeNode, setActiveNode] = useState(null);

  const SPEC_LINES = [
    "> MODEL        : Shubham Pandey v1.0",
    "> ARCHITECTURE : Human Neural Network",
    "> INSTITUTION  : BVCOE Pune",
    "> DEGREE       : B.Tech Computer Engg.",
    "> TRAINING     : Final Epoch (Last 10 days!)",
    "> CGPA         : 7.5 / 10.0",
    "> EXPERIENCE   : Labmentix AI/ML Intern",
    "> RESEARCH     : IRA 2026 (Google Scholar)",
    "> DOMAINS      : CV · NLP · RAG · Edge AI",
    "> LOCATION     : Pune, Maharashtra, IN",
    "> STATUS       : ● Available for opportunities",
  ];

  const BIO_LINES = [
    "> whoami",
    "// An AI/ML Engineer who builds systems",
    "// that see, think, and solve.",
    "// From 30K-image datasets to on-device",
    "// inference — I close the gap between",
    "// research and real-world deployment.",
    "// Currently: surviving finals. Next: the world.",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/85 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-black border border-green-500/40 rounded-3xl p-8"
            style={{ boxShadow: "0 0 60px rgba(0,255,102,0.1)" }}
          >
            {/* Close */}
            <button onClick={onClose}
              className="absolute top-6 right-8 text-green-400 text-3xl hover:text-white cursor-pointer z-10">
              ×
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-cyan-400 tracking-[0.4em] text-xs">SYSTEM PROFILE</p>
              <h2 className="text-green-400 text-4xl font-bold mt-2 tracking-wider">
                ABOUT THE ENGINEER
              </h2>
            </div>

            {/* Top split */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">

              {/* Left — Avatar + Bio */}
              <div className="flex flex-col items-center gap-6">
                <NeuralAvatar />

                <div className="w-full border border-green-900 rounded-xl p-4 bg-green-950/10">
                  <p className="text-cyan-400 text-xs tracking-widest mb-3">// BIO.exe</p>
                  <Typewriter lines={BIO_LINES} startDelay={600} />
                </div>

                {/* Social links */}
                <div className="flex gap-4">
                  <a href="https://github.com/Shubhampandey1git" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 border border-green-800 text-green-400 px-3 py-2 rounded-lg text-xs hover:border-green-500 hover:bg-green-500/10 transition-all">
                    <img src="/git.svg" className="w-4 h-4" alt="GitHub" />
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/shubham-pandey-6a65a524a/" target="_blank" rel="noreferrer"
                    className="flex items-center gap-2 border border-green-800 text-green-400 px-3 py-2 rounded-lg text-xs hover:border-green-500 hover:bg-green-500/10 transition-all">
                    <img src="/linkedin.svg" className="w-4 h-4" alt="LinkedIn" />
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Right — Spec sheet */}
              <div className="border border-green-900 rounded-xl p-4 bg-green-950/10">
                <p className="text-cyan-400 text-xs tracking-widest mb-4">// SPEC_SHEET.json</p>
                <Typewriter lines={SPEC_LINES} startDelay={200} />

                {/* Skills tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Python","PyTorch","TF Lite","LangChain","YOLO","RAG","LLMs","React","Node.js","CameraX","MongoDB"].map(s => (
                    <span key={s}
                      className="text-xs px-2 py-1 rounded border border-green-800 text-green-400 bg-green-950/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="border border-green-900 rounded-xl p-6 bg-green-950/10">
              <p className="text-cyan-400 text-xs tracking-widest mb-6">// NEURAL_TIMELINE.path</p>

              <div className="grid grid-cols-6 gap-0 px-4">
                {TIMELINE.map((node, i) => (
                  <TimelineNode
                    key={i}
                    node={node}
                    index={i}
                    active={activeNode}
                    onClick={setActiveNode}
                  />
                ))}
              </div>

              {/* Detail card */}
              <AnimatePresence mode="wait">
                {activeNode !== null && (
                  <motion.div
                    key={activeNode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="mt-8 border rounded-xl p-4 relative"
                    style={{
                      borderColor: `${TIMELINE[activeNode].color}44`,
                      background: `${TIMELINE[activeNode].color}08`,
                    }}
                  >
                    <button onClick={() => setActiveNode(null)}
                      className="absolute top-3 right-4 text-gray-500 hover:text-white text-lg cursor-pointer">
                      ×
                    </button>
                    <p className="font-bold mb-2" style={{ color: TIMELINE[activeNode].color }}>
                      {TIMELINE[activeNode].year} — {TIMELINE[activeNode].label}
                    </p>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {TIMELINE[activeNode].detail}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-gray-600 text-xs text-center mt-6">
                ↑ Click any node to expand
              </p>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}