import { StatsDisplay } from './StatsDisplay';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Crown, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface EndScreenProps {
  playerName: string;
}

export const EndScreen = ({ playerName }: EndScreenProps) => {
  const { restartGame } = useGameLogic();
  const stats = useGameLogic().calculateStats();

  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Launch from the left side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      // Launch from the right side
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once when component mounts

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-white p-4">
      <div className="w-full max-w-screen-sm mx-auto opacity-0 translate-y-4 animate-[fadeIn_0.6s_ease-out_forwards]">
        <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-white/90 border border-blue-50">
          <div className="text-center mb-8 relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 scale-0 animate-[scaleIn_0.5s_ease-out_0.2s_forwards]">
              <div className="relative">
                <Crown className="w-16 h-16 text-yellow-400 drop-shadow-lg" strokeWidth={1.5} />
                <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-yellow-300 animate-pulse" strokeWidth={1.5} />
                <Sparkles className="absolute -top-1 -left-2 w-6 h-6 text-yellow-300 animate-pulse delay-100" strokeWidth={1.5} />
              </div>
            </div>
            
            <div className="opacity-0 translate-y-2 animate-[fadeSlideUp_0.5s_ease-out_0.4s_forwards]">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-900 mb-3 mt-8">
                Fantastisch, {playerName}! 🎉
              </h2>
              <p className="text-lg sm:text-xl text-blue-700 font-medium">
                Du hast das Training mit Bravour gemeistert
              </p>
            </div>
          </div>

          <div className="opacity-0 translate-y-4 animate-[fadeSlideUp_0.5s_ease-out_0.6s_forwards]">
            <StatsDisplay
              timeElapsed={stats.timeElapsed}
              correctAnswers={stats.correctAnswers}
              totalAnswers={stats.totalAnswers}
              averageResponseTime={stats.averageResponseTime}
            />
          </div>

          <div className="mt-8 space-y-4">
            <button
              onClick={restartGame}
              className="w-full py-4 px-6 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
            >
              <span>Nochmal trainieren</span>
              <Sparkles className="w-5 h-5" strokeWidth={1.5} />
            </button>
            
            <p className="text-center text-sm text-blue-600/70">
              Jede Übung bringt dich näher zur Perfektion! 💪
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add these keyframes to your global CSS file (e.g., globals.css)
/*
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: translate(-50%, 0) scale(0);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}

@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
*/ 