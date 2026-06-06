import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StatsBar from "./StatsBar";
import useResponsive from "../hooks/useResponsive";

export default function StatsDrawer() {
    const isMobile = useResponsive();
    const [open, setOpen] = useState(false);
    
    if (isMobile) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center">
        
        <AnimatePresence>
            {open && (
            <motion.div
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 300, opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="
                w-[900px]
                max-w-[90vw]
                mb-2
                rounded-t-2xl
                border
                border-green-500/30
                bg-black/95
                backdrop-blur-md
                p-4
                shadow-[0_0_30px_rgba(0,255,100,0.2)]
                "
            >
                <StatsBar />
            </motion.div>
            )}
        </AnimatePresence>

        <button
            onClick={() => setOpen(!open)}
            className="
            px-6
            py-2
            rounded-t-xl
            border
            border-green-500
            bg-black
            text-green-400
            hover:bg-green-500/10
            transition-all
            tracking-widest
            cursor-pointer
            "
        >
            {open
            ? "▼ NEURAL STATS"
            : "▲ NEURAL STATS"}
        </button>
        </div>
    );
}