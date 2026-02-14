import { useState } from 'react';
import { Landing } from './components/Landing';
import { Gallery } from './components/Gallery';
import { MusicPlayer } from './components/MusicPlayer';
import confetti from 'canvas-confetti';

function App() {
  const [entered, setEntered] = useState(false);

  const handleEnter = () => {
    setEntered(true);
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-gray-800 font-sans relative overflow-hidden">

      {/* Global Vintage Frame Overlay */}
      {/* Global Vintage Frame Overlay */}
      <div className="absolute inset-0 pointer-events-none z-50 h-full min-h-screen">
        {/* Outer Wood Frame */}
        <div className="absolute inset-0 border-[8px] sm:border-[25px] border-[#5c4033] shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"
          style={{ borderImage: 'url("https://www.transparenttextures.com/patterns/wood-pattern.png") 30 stretch' }}>
        </div>

        {/* Inner Gold Bevel */}
        <div className="absolute inset-[8px] sm:inset-[25px] border-[2px] sm:border-[5px] border-[#b8860b] shadow-[0_0_15px_rgba(0,0,0,0.5)]"></div>

        {/* Inner Matting (Cream) */}
        <div className="absolute inset-[10px] sm:inset-[30px] border-[5px] sm:border-[20px] border-[#f0ece1]"></div>

        {/* Shadow inside the frame */}
        <div className="absolute inset-[15px] sm:inset-[50px] shadow-[inset_0_0_50px_rgba(0,0,0,0.3)]"></div>

        {/* Glass Reflection (Global) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/5 opacity-40 mix-blend-overlay"></div>
        <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-gradient-to-bl from-white/20 to-transparent blur-3xl opacity-30"></div>
      </div>

      <div className="relative z-10 h-full overflow-y-auto pt-12 pb-28 sm:pt-24 sm:pb-24 px-4 sm:px-12">
        {!entered ? (
          <Landing onEnter={handleEnter} />
        ) : (
          <div className="container mx-auto max-w-4xl">
            <header className="text-center mb-12 animate-fade-in-down">
              <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8b4513] to-[#cd853f] font-['Cinzel'] mb-4 tracking-wider drop-shadow-sm">
                Happy Valentine's Day, Aako
              </h1>
              <p className="text-xl text-[#8b5a2b] font-['Playfair_Display'] italic">My love, my memories, my everything.</p>
            </header>

            <Gallery />
            <MusicPlayer />

            <footer className="text-center mt-20 pb-8 text-[#a07c5e] text-sm font-['Courier_Prime']">
              Made with ❤️ for You
            </footer>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
