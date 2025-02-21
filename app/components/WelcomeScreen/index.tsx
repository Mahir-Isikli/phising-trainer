import { useGameStore } from '../../store/gameStore';
import { useGameLogic } from '../../hooks/useGameLogic';
import { Search, ShieldCheck, Zap, MessageSquare } from 'lucide-react';

export const WelcomeScreen = () => {
  const {
    playerName,
    setPlayerName,
  } = useGameStore();
  
  const { startGame } = useGameLogic();

  const handleStartGame = () => {
    if (playerName.trim()) {
      startGame();
    }
  };

  const instructions = [
    { icon: Search, text: "Prüfe E-Mails" },
    { icon: ShieldCheck, text: "Erkenne Phishing" },
    { icon: Zap, text: "Sei schnell" },
    { icon: MessageSquare, text: "Lerne dazu" },
  ];

  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr,auto] gap-8 md:gap-12 p-4 sm:p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-[clamp(2rem,5vw+1rem,4rem)] font-bold text-blue-900 leading-tight mb-2">
          Phishing-Mail Challenge
        </h1>
        <p className="text-[clamp(1rem,2vw+0.5rem,1.5rem)] text-blue-700 max-w-2xl mx-auto">
          Teste deine Fähigkeiten im Erkennen von Phishing
        </p>
      </header>

      {/* Instructions Section */}
      <div className="flex items-center justify-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl w-full">
          {instructions.map(({ icon: Icon, text }) => (
            <div 
              key={text} 
              className="flex flex-col items-center text-center gap-2 p-3 rounded-lg transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <Icon size={24} />
              </div>
              <span className="text-[clamp(0.875rem,1.5vw+0.5rem,1.25rem)] text-blue-800 font-medium">
                {text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <div className="flex flex-col gap-4 max-w-md w-full mx-auto">
        <input
          type="text"
          placeholder="Dein Name"
          className="w-full px-6 py-4 text-lg bg-white/50 backdrop-blur border-2 border-blue-200 rounded-xl 
                   focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 outline-none 
                   transition-all duration-200 text-gray-900 placeholder-gray-500"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button
          onClick={handleStartGame}
          className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-300 transform
            ${playerName.trim() 
              ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:translate-y-[-2px] hover:shadow-lg' 
              : 'bg-blue-300 text-white cursor-not-allowed'}`}
          disabled={!playerName.trim()}
        >
          Spiel starten
        </button>
      </div>
    </div>
  );
}; 