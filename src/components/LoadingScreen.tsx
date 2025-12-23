import { useEffect, useState } from "react";
import finonestIcon from "@/assets/finonest-icon.jpg";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setFadeOut(true);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 3;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-gradient-to-br from-primary via-primary/95 to-secondary flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Logo Animation */}
      <div className="relative mb-8">
        <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden shadow-2xl animate-pulse-logo bg-white p-3">
          <img
            src={finonestIcon}
            alt="Finonest"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 -z-10 blur-3xl opacity-50">
          <div className="w-full h-full bg-white rounded-full" />
        </div>
      </div>

      {/* Brand name */}
      <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-6 animate-fade-in">
        Finonest
      </h1>

      {/* Progress bar */}
      <div className="w-48 md:w-64 h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur">
        <div
          className="h-full bg-white rounded-full transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <p className="mt-4 text-sm text-white/80 animate-pulse">
        Loading your financial partner...
      </p>

      <style>{`
        @keyframes pulse-logo {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(255,255,255,0.3); }
          50% { transform: scale(1.05); box-shadow: 0 0 50px rgba(255,255,255,0.5); }
        }
        .animate-pulse-logo {
          animation: pulse-logo 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
