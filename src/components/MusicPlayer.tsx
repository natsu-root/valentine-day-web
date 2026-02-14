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

    return (
        <div className="fixed bottom-4 right-4 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg flex items-center gap-3 z-50">
            <audio ref={audioRef} src="/music/bgm.mp3" loop />

            <button
                onClick={togglePlay}
                className="p-2 bg-pink-500 rounded-full text-white hover:bg-pink-600 transition-colors"
            >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>

            <button
                onClick={toggleMute}
                className="p-2 text-pink-500 hover:bg-pink-100 rounded-full transition-colors"
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </div>
    );
}
