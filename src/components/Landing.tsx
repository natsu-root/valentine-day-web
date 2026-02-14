import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LandingProps {
    onEnter: () => void;
}

export function Landing({ onEnter }: LandingProps) {
    const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const moveNoButton = () => {
        const x = Math.random() * (window.innerWidth - 100) - (window.innerWidth / 2 - 50);
        const y = Math.random() * (window.innerHeight - 100) - (window.innerHeight / 2 - 50);
        setNoBtnPos({ x, y });
        setIsHovered(true);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center relative z-20">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="mb-8"
            >
                <Heart className="w-24 h-24 text-[#b8860b] fill-red-500 drop-shadow-md animate-pulse" />
            </motion.div>

            <motion.h1
                className="text-3xl md:text-5xl font-['Cinzel'] text-[#4a3728] font-bold mb-12 drop-shadow-sm px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                Will You Be My Valentine?
            </motion.h1>

            <div className="flex flex-col md:flex-row items-center gap-8 relative">
                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-[#b8860b] text-white font-['Playfair_Display'] text-xl rounded-full shadow-lg hover:bg-[#8b6508] transition-colors border-2 border-[#f0ece1]"
                >
                    Yes, Absolutely! 💖
                </motion.button>

                <motion.button
                    onHoverStart={moveNoButton}
                    onClick={moveNoButton}
                    animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`px-8 py-3 bg-[#f0ece1] text-[#4a3728] font-['Playfair_Display'] text-xl rounded-full shadow-md border-2 border-[#b8860b] ${isHovered ? 'absolute' : 'relative'}`}
                >
                    No 😢
                </motion.button>
            </div>
        </div>
    );
}
