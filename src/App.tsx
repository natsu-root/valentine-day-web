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
    <div className="min-h-screen bg-gradient-to-br from-[#fff0f3] via-[#ffe4e6] to-[#fecdd3] text-gray-800 font-sans">
      {!entered ? (
        <Landing onEnter={handleEnter} />
      ) : (
        <div className="container mx-auto px-4 py-8">
          <header className="text-center mb-12 animate-fade-in-down">
            <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-800 to-pink-700 font-['Cinzel'] mb-4 tracking-wider drop-shadow-sm">
              Happy Valentine's Day, Aako
            </h1>
            <p className="text-xl text-pink-500">My love, my memories, my everything.</p>
          </header>

          <Gallery />
          <MusicPlayer />

          <footer className="text-center mt-20 pb-8 text-pink-300 text-sm">
            Made with ❤️ for You
          </footer>
        </div>
      )}
    </div>
  );
}

export default App;
