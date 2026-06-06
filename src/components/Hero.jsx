import { motion } from "framer-motion";
import { useState, useEffect } from "react";  // ← add useState, useEffect
import NeuralSphere from "./NeuralSphere";
import StatsBar from "./StatsBar";
import useResponsive from "../hooks/useResponsive";

// Add this component above the Hero function
function TypewriterText({ text, delay = 0 }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, 80);
    return () => clearTimeout(timer);
  }, [displayed, started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-pulse">_</span>
      )}
    </span>
  );
}

export default function Hero({
  morph,
  expand,
  onProjectsClick,
  showBrainConnections,
  hideEdges,
  showProjectClusters,
  setSelectedProject,
  showSkillClusters,
  showExplosion,
  controlsRef,
}) {
  const isMobile = useResponsive();
  return (
    <section
      className={
        showSkillClusters && isMobile
          ? "relative min-h-screen overflow-y-auto"
          : "relative min-h-screen overflow-hidden"
      }
    >

      {showSkillClusters && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="
            fixed
            top-24
            left-1/2
            -translate-x-1/2
            z-50
            text-center
            pointer-events-none
          "
        >
          <p className="text-cyan-400 text-sm tracking-[0.4em]">
            AI PORTFOLIO
          </p>
          <h2 className="text-green-400 text-4xl font-bold mt-2">
            ◢ SKILL NETWORK ◣
          </h2>
        </motion.div>
      )}

      {showProjectClusters && (
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-50 text-center pointer-events-none"
        >
          <p className="text-cyan-400 text-sm tracking-[0.4em]">
            AI PORTFOLIO
          </p>
          <h2 className="text-green-400 text-4xl font-bold mt-2">
            ◢ TOP PROJECTS ◣
          </h2>
        </motion.div>
      )}

      {/* Typewriter text at bottom — add this AFTER the showProjectClusters top overlay */}
      {showProjectClusters && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 text-center flex flex-col items-center gap-4 pointer-events-none"
        >
          <p className="text-cyan-400 text-xs tracking-[0.6em]">
            <TypewriterText text="NEURAL INTERFACE ACTIVE" delay={300} />
          </p>

          <p className="text-green-400 text-lg font-bold tracking-[0.4em]">
            <TypewriterText text="WELCOME TO THE MIND" delay={1200} />
          </p>

          <p className="text-gray-500 text-xs tracking-[0.3em]">
            <TypewriterText text="CLICK A CORTEX TO EXPLORE MY BEST PROJECT IN THAT DOMAIN" delay={2800} />
          </p>

          <motion.a
            href="https://github.com/Shubhampandey1git"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.5, duration: 0.8 }}
            className="pointer-events-auto flex items-center gap-3 border border-green-500 text-green-400 px-6 py-3 rounded-full hover:bg-green-500 hover:text-black transition-all duration-300 text-sm tracking-widest mt-2"
          >
            <img src="/git.svg" alt="GitHub" className="w-5 h-5" />
            VIEW ALL PROJECTS ON GITHUB
          </motion.a>
        </motion.div>
      )}

      {/* Brain Background */}
      <div
        className={
          showSkillClusters && isMobile
            ? "absolute inset-0"
            : "fixed inset-0"
        }
      >
        <NeuralSphere
          morph={morph}
          expand={expand}
          showBrainConnections={showBrainConnections}
          hideEdges={hideEdges}
          showProjectClusters={showProjectClusters}
          setSelectedProject={setSelectedProject}
          showSkillClusters={showSkillClusters}
          showExplosion={showExplosion}
          controlsRef={controlsRef}
        />
      </div>

      {/* Main Content */}
      <div
        className="
          max-w-7xl
          mx-auto
          px-8
          pt-24
          relative
          z-10
        "
        style={{ pointerEvents: "none" }}
      >
        <motion.div
          animate={{
            opacity: expand ? 0 : 1,
            x: expand ? -100 : 0,
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
          }}
          className="max-w-2xl"
        >
          <p className="text-green-400 text-xl mb-6">
            AI/ML ENGINEER<span className="cursor">_</span>
          </p>

          <h1
            className="
              text-[3rem]
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              xl:text-8xl
              leading-none
              font-bold
            "
          >
                      Hi, I'm
            <br />

            <motion.span
              className="text-green-400"
              animate={{
                textShadow: [
                  "0 0 10px rgba(0,255,102,0.3)",
                  "0 0 30px rgba(0,255,102,0.9)",
                  "0 0 10px rgba(0,255,102,0.3)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              Shubham Pandey<span className="cursor">_</span>
            </motion.span>
          </h1>

          <p
            className="
              text-gray-300
              text-base
              md:text-xl
              leading-relaxed
              mb-8
            "
          >
            Building AI systems that see,
            understand and solve
            real-world problems.
            I ship systems, not notebooks.
          </p>

          <div
            className="
              space-y-3
              text-base
              md:text-lg
              text-gray-300
              mb-10
            "
          >
            <p>{">"} Computer Vision [ OK ]</p>
            <p>{">"} NLP [ OK ]</p>
            <p>{">"} Edge AI [ OK ]</p>
            <p>{">"} RAG Systems [ OK ]</p>
          </div>

          <div
            className="flex gap-4"
            style={{ pointerEvents: "auto" }}
          >
            <button
              className="
                bg-green-500
                text-black
                px-8
                py-4
                rounded
                font-bold
                border
                border-green-500
                transition-all
                duration-300
                hover:bg-transparent
                hover:text-green-400
                cursor-pointer
              "
              onClick={onProjectsClick}
            >
              VIEW PROJECTS
            </button>

            <a
            href="https://drive.google.com/file/d/1xapKn69j1FtPp9rd5WyxoWgSuAFNxt71/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="
              border
              border-green-500
              text-green-400
              px-8
              py-4
              rounded
              transition-all
              duration-300
              hover:bg-green-500
              hover:text-black
              cursor-pointer
            "
          >
            DOWNLOAD RESUME
          </a>
          </div>
        </motion.div>
        
        {!showSkillClusters && !showProjectClusters && (
        <motion.div
        animate={{
            opacity: showProjectClusters ? 0 : 1,
            y: showProjectClusters ? -20 : 0
          }}
          transition={{
            duration: 0.8
          }}
          className="flex gap-6 mt-8"
          style={{ pointerEvents: "auto" }}
        >
          <a
            href="https://github.com/Shubhampandey1git"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/git.svg"
              alt="GitHub"
              className="
                w-8
                h-8
                opacity-80
                hover:opacity-100
                hover:scale-110
                transition-all
                duration-300
                cursor-pointer
              "
            />
          </a>

          <a
            href="https://www.linkedin.com/in/shubham-pandey-6a65a524a/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/linkedin.svg"
              alt="LinkedIn"
              className="
                w-8
                h-8
                opacity-80
                hover:opacity-100
                hover:scale-110
                transition-all
                duration-300
                cursor-pointer
              "
            />
          </a>

          <a
            href="https://www.hackerrank.com/profile/shubhamppandey11"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/hackerrank.svg"
              alt="HackerRank"
              className="
                w-8
                h-8
                opacity-80
                hover:opacity-100
                hover:scale-110
                transition-all
                duration-300
                cursor-pointer
              "
            />
          </a>

          <a
            href="https://leetcode.com/u/shubhamppandey1084/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="/leetcode.svg"
              alt="LeetCode"
              className="
                w-8
                h-8
                text-green-400
                opacity-80
                hover:opacity-100
                hover:scale-110
                transition-all
                duration-300
                cursor-pointer
              "
            />
          </a>
        </motion.div>
        )}

        {/* Stats Bar */}
        {!isMobile && !showSkillClusters && !showProjectClusters && (
          <div className="mt-24 mb-8">
            <StatsBar />
          </div>
        )}
      </div>
    </section>
  );
}