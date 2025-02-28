import { useCallback, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { sampleEmails } from '../data/sampleEmails';

interface GameStats {
  timeElapsed: number;
  correctAnswers: number;
  totalAnswers: number;
  averageResponseTime: number;
}

// Fisher-Yates shuffle algorithm for randomizing the emails array
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useGameLogic = () => {
  const {
    currentIndex,
    decisions,
    startTime,
    setGameState,
    setCurrentIndex,
    addDecision,
    setStartTime,
    setLastEmailTime,
    setShowFeedback,
    setShowHighlights,
    setShowDetailedExplanation,
    resetGame,
  } = useGameStore();

  // Shuffle emails once when the hook is initialized
  const shuffledEmails = useMemo(() => shuffleArray(sampleEmails), []);

  const startGame = useCallback(() => {
    setGameState('playing');
    setStartTime(Date.now());
    setLastEmailTime(Date.now());
  }, [setGameState, setStartTime, setLastEmailTime]);

  const handleDecision = useCallback((isPhishing: boolean) => {
    const currentEmail = shuffledEmails[currentIndex];
    const correct = isPhishing === currentEmail.isPhishing;

    addDecision({
      emailId: currentEmail.id,
      isPhishing,
      correct,
    });

    setShowFeedback(true);
    setShowHighlights(true);
  }, [currentIndex, addDecision, setShowFeedback, setShowHighlights, shuffledEmails]);

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    setShowHighlights(false);
    setShowDetailedExplanation(false);

    if (currentIndex < shuffledEmails.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setLastEmailTime(Date.now());
    } else {
      setGameState('finished');
    }
  }, [
    currentIndex,
    setCurrentIndex,
    setGameState,
    setLastEmailTime,
    setShowFeedback,
    setShowHighlights,
    setShowDetailedExplanation,
    shuffledEmails,
  ]);

  const calculateStats = useCallback((): GameStats => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
    const correctAnswers = decisions.filter(d => d.correct).length;
    const averageResponseTime = decisions.reduce((acc, d) => acc + d.timeToDecide, 0) / decisions.length / 1000;

    return {
      timeElapsed,
      correctAnswers,
      totalAnswers: decisions.length,
      averageResponseTime,
    };
  }, [decisions, startTime]);

  const restartGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return {
    startGame,
    handleDecision,
    handleNext,
    calculateStats,
    restartGame,
    currentEmail: shuffledEmails[currentIndex],
    totalEmails: shuffledEmails.length,
  };
}; 