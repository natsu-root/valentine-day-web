import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function MusicPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            // Try to play automatically when component mounts (after user interaction)
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("Autoplay blocked", e));
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            audioRef.current.volume = value;
            setIsMuted(value === 0);
        }
    };

    return (
        <div className="absolute bottom-12 right-12 z-[60] flex items-center gap-4">
            {/* Player Container */}
            <div className="bg-[#f0ece1]/90 backdrop-blur-sm p-3 rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.5)] border border-[#d6cfc2] flex items-center gap-3 transition-all hover:scale-105 duration-300">
                <audio ref={audioRef} src="./music/bgm.mp3" loop />

                <button
                    onClick={togglePlay}
                    className="p-3 bg-[#b8860b] rounded-full text-white hover:bg-[#8b6508] transition-colors shadow-sm"
                >
                    {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
                </button>

                <div className="flex items-center gap-2 pr-2 group">
                    <button
                        onClick={toggleMute}
                        className="p-2 text-[#5c4033] hover:bg-[#e6dfd1] rounded-full transition-colors"
                    >
                        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>

                    {/* Volume Slider - always visible or reveal on hover? Keeping it visible for usability as requested */}
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        defaultValue="1"
                        onChange={handleVolumeChange}
                        className="w-20 h-1.5 bg-[#d6cfc2] rounded-lg appearance-none cursor-pointer accent-[#b8860b] hover:accent-[#8b6508]"
                    />
                </div>
            </div>
        </div>
    );
}
