import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LandingProps {
    onEnter: () => void;
}

export function Landing({ onEnter }: LandingProps) {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-pink-50 text-pink-600">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
            >
                <div
                    className="cursor-pointer relative group"
                    onClick={onEnter}
                >
                    <Heart
                        className="w-32 h-32 text-red-500 fill-red-500 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-bold text-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        Open Me
                    </motion.div>
                </div>
            </motion.div>
            <motion.h1
                className="mt-8 text-4xl font-['Cinzel'] text-pink-800 tracking-widest"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
            >
                FOR YOU AAKO
            </motion.h1>
            <p className="mt-4 text-pink-400">Click the heart to begin</p>
        </div>
    );
}
