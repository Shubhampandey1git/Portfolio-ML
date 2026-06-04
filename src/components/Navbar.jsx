import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({
  onProjectsClick,
  onHomeClick,
  onContactClick,
  onSkillsClick,
  onAboutClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (fn) => {
    fn();
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] border-b border-green-900 bg-black/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <h1 className="text-green-400 font-bold text-lg">
          SHUBHAM PANDEY
        </h1>

        <ul className="hidden md:flex gap-10 text-green-400">
          <li>
            <button onClick={onHomeClick} className="hover:text-green-300 transition cursor-pointer">
              HOME
            </button>
          </li>
          <li><button onClick={onAboutClick} className="hover:text-green-300 transition cursor-pointer">
              ABOUT
            </button>
          </li>
          <li>
            <button onClick={onProjectsClick} className="hover:text-green-300 transition cursor-pointer">
              PROJECTS
            </button>
          </li>
          <li>
            <button onClick={onSkillsClick} className="hover:text-green-300 transition cursor-pointer">
              SKILLS
            </button>
          </li>
          <li>
            <button onClick={onContactClick} className="hover:text-green-300 transition cursor-pointer">
              CONTACT
            </button>
          </li>
        </ul>

        
          <a href="https://drive.google.com/file/d/1xapKn69j1FtPp9rd5WyxoWgSuAFNxt71/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block border border-green-500 px-5 py-2 rounded text-green-400 hover:bg-green-500 hover:text-black transition-all duration-300 cursor-pointer"
        >
          RESUME
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-green-400"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-0.5 bg-green-400"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 bg-green-400"
          />
        </button>

      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/95 border-t border-green-900 overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              <button
                onClick={() => handleNav(onHomeClick)}
                className="text-green-400 text-left py-2 border-b border-green-900 hover:text-green-300 transition cursor-pointer"
              >
                HOME
              </button>
              <span className="text-green-400 py-2 border-b border-green-900 opacity-50">
                ABOUT
              </span>
              <button
                onClick={() => handleNav(onProjectsClick)}
                className="text-green-400 text-left py-2 border-b border-green-900 hover:text-green-300 transition cursor-pointer"
              >
                PROJECTS
              </button>
              <button
                onClick={() => handleNav(onSkillsClick)}
                className="text-green-400 text-left py-2 border-b border-green-900 hover:text-green-300 transition cursor-pointer"
              >
                SKILLS
              </button>
              <button
                onClick={() => handleNav(onContactClick)}
                className="text-green-400 text-left py-2 border-b border-green-900 hover:text-green-300 transition cursor-pointer"
              >
                CONTACT
              </button>
              
                < a href="https://drive.google.com/file/d/1xapKn69j1FtPp9rd5WyxoWgSuAFNxt71/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-green-500 px-5 py-2 rounded text-green-400 text-center hover:bg-green-500 hover:text-black transition-all duration-300"
              >
                RESUME
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}