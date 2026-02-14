import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// In a real app, you might dynamically load these
const IMAGES = [
    '/images/IMG_20231214_154821.jpg',
    '/images/IMG_20231214_154827.jpg',
    '/images/IMG_20231214_154844.jpg',
    '/images/IMG_20231214_193817.jpg',
    '/images/IMG_20231214_193854.jpg',
];

export function Gallery() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % IMAGES.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden my-8">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    className="absolute bg-white p-3 pb-12 shadow-2xl transform origin-bottom w-full max-w-[260px] sm:max-w-[300px]"
                    initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5, x: 100 }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: Math.random() * 6 - 3,
                        x: 0,
                        filter: ["grayscale(0%) sepia(0%)", "grayscale(30%) sepia(20%)"] // Subtle vintage flicker
                    }}
                    exit={{ opacity: 0, scale: 1.1, rotate: Math.random() * 10 - 5, x: -100 }}
                    transition={{
                        duration: 1.5,
                        ease: "easeInOut"
                    }}
                >
                    {/* Inner content with slow zoom */}
                    <motion.div
                        className="overflow-hidden bg-gray-100 aspect-[3/4]"
                        animate={{ scale: [1, 1.1] }}
                        transition={{ duration: 6, ease: "linear" }}
                    >
                        <img
                            src={IMAGES[index]}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/80 backdrop-blur-sm shadow-sm rotate-2 z-10" />

                    <div className="absolute bottom-4 left-0 right-0 text-center font-['Courier_Prime'] text-gray-600 text-base tracking-widest font-bold">
                        {`MEMORY 0${index + 1}`}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Background stack effect hint */}
            <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-30 pointer-events-none">
                <div className="w-full max-w-[260px] sm:max-w-[300px] aspect-[3/4.5] bg-white transform rotate-6 border border-gray-200 shadow-xl"></div>
                <div className="absolute w-full max-w-[260px] sm:max-w-[300px] aspect-[3/4.5] bg-white transform -rotate-3 border border-gray-200 shadow-xl"></div>
            </div>
        </div>
    );
}
