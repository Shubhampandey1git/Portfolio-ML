import { AnimatePresence, motion } from "framer-motion";
import Contact from "./Contact";

export default function ContactModal({
  isOpen,
  onClose,
}) {
  return (
    <AnimatePresence>

      {isOpen && (

        <motion.div
          className="
            fixed
            inset-0
            bg-black/80
            backdrop-blur-sm
            z-[999]
            flex
            items-center
            justify-center
          "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            initial={{
              scale: 0.85,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.85,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              relative
              w-[1000px]
              max-w-[90vw]
              h-[700px]
              max-h-[90vh]
              bg-black
              border
              border-green-500
              rounded-[60px]
              p-10
              overflow-auto
            "
          >

            <button
              onClick={onClose}
              className="
                absolute
                top-6
                right-8
                text-green-400
                text-3xl
                hover:text-white
                cursor-pointer
              "
            >
              ×
            </button>

            <div className="text-center mb-10">

              <p className="text-cyan-400 tracking-[0.4em] text-sm">
                CONTACT
              </p>

              <h2 className="text-green-400 text-5xl font-bold mt-4">
                LET'S BUILD SOMETHING
              </h2>

            </div>

            <Contact />

          </motion.div>

        </motion.div>

      )}

    </AnimatePresence>
  );
}