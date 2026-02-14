import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const imagesGlob = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' });
const IMAGES = Object.values(imagesGlob) as string[];

export function Gallery() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (IMAGES.length === 0) return;
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden my-8">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    className="absolute z-10 w-full max-w-[280px] sm:max-w-[400px]"
                    initial={{ opacity: 0, scale: 0.9, rotate: Math.random() * 6 - 3 }}
                    animate={{ opacity: 1, scale: 1, rotate: Math.random() * 4 - 2 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    {/* Tape effect (Optional - keeps it looking like it's stuck on the wall) */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/60 backdrop-blur-[1px] shadow-sm rotate-1 z-20" />

                    <div className="relative shadow-xl">
                        {/* Simple borderless photo */}
                        <motion.img
                            src={IMAGES[index]}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-auto aspect-[3/4] object-cover"
                            initial={{ filter: "sepia(0%)" }}
                            animate={{ filter: "sepia(20%) contrast(105%)" }} // Slight vintage touch
                        />

                        {/* Subtle dust overlay for the photo itself */}
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Wall Shadow / Ambience */}
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/10 pointer-events-none" />
        </div>
    );
}
