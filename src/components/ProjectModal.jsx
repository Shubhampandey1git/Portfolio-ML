import { motion, AnimatePresence } from "framer-motion";

export default function ProjectModal({
  project,
  onClose
}) {
  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            className="
              fixed inset-0 z-[100]
              backdrop-blur-md
              bg-black/60
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="
            fixed
            left-1/2
            top-[90px]
            z-[9999]
            w-[900px]
            max-w-[95vw]
            h-[calc(100vh-110px)]
            -translate-x-1/2
          "
            initial={{
              opacity: 0,
              scale: 0.8,
              y: 40
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.8
            }}
          >
            <div
              className="
                rounded-2xl
                border
                border-green-500/40
                bg-black/90
                backdrop-blur-xl
                p-4 md:p-8
                overflow-y-auto
                h-full
                shadow-[0_0_50px_rgba(0,255,100,0.2)]
              "
            >
              <h2
                className="
                  text-2xl
                  md:text-4xl
                  font-bold
                  mb-4
                "
                style={{
                  color: project.color
                }}
              >
                {project.label}
              </h2>

              <div className="flex gap-3 mb-6 flex-wrap">
              {project.techStack.slice(0, 4).map((item) => (
                <span
                  key={item}
                  className="
                    px-2
                    py-1
                    text-xs
                    rounded
                    bg-green-500/10
                    text-green-400
                  "
                >
                  {item}
                </span>
              ))}
            </div>

              <p className="p-5
                rounded-xl
                border
                border-green-500/20
                bg-green-500/[0.03]
                text-gray-300
                leading-8
                mb-8">
                {project.overview}
              </p>

              <h3 className="mt-8
                  mb-3
                  text-lg
                  font-bold
                  tracking-wider
                  uppercase
                  text-green-400
                  border-b
                  border-green-500/20
                  pb-2">
                Key Features
              </h3>

              <ul className="space-y-3 mb-6">
                {project.features.map((feature, i) => (
                  <li key={i}
                  className="
                    flex
                    items-center
                    gap-3
                    text-gray-300
                  ">
                    <span className="text-green-400">
                      ▸
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <h3 className="
                  mt-8
                  b-3
                  text-lg
                  font-bold
                  tracking-wider
                  uppercase
                  text-green-400
                  border-b
                  border-green-500/20
                  pb-2">
                Architecture
              </h3>

              <div className="flex
                flex-wrap
                items-center
                gap-3
                mb-8">
                {project.architecture.map((step, i) => (
                <div
                  key={i}
                  className="
                    flex
                    items-center
                    gap-3
                  "
                >
                  <div
                    className="
                      px-4
                      py-2
                      border
                      border-cyan-500/40
                      rounded-lg
                      text-cyan-300
                      bg-cyan-500/5
                    "
                  >
                    {step}
                  </div>

                  {i !== project.architecture.length - 1 && (
                    <span className="text-green-400">
                      →
                    </span>
                  )}
                </div>
              ))}
              </div>

              <h3 className="
                  mt-8
                  b-3
                  text-lg
                  font-bold
                  tracking-wider
                  uppercase
                  text-green-400
                  border-b
                  border-green-500/20
                  pb-2">
                Tech Stack
              </h3>

              <div className="
                flex flex-wrap gap-3 mb-8">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3
                      py-1
                      rounded-md
                      border
                      border-green-500/30
                      bg-green-500/5
                      text-green-300
                      text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    px-6
                    py-3
                    rounded-lg
                    border
                    border-green-500
                    text-green-400
                    transition-all
                    hover:scale-105
                    hover:bg-green-500/10
                  "
                >
                  GitHub
                </a>

                <a
                  href={project.video}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    px-6 py-3
                    border border-cyan-500
                    rounded-lg
                    text-cyan-400
                    hover:bg-cyan-500/10
                  "
                >
                  Demo Video
                </a>
              </div>

              <button
                onClick={onClose}
                className="
                  absolute
                  top-4
                  right-4
                  z-50
                  text-gray-400
                  hover:text-white
                "
              >
                ✕
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}