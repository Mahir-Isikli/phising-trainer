import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import { sampleEmails } from '../data/sampleEmails';

interface GameStats {
  timeElapsed: number;
  correctAnswers: number;
  totalAnswers: number;
  averageResponseTime: number;
}

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

  const startGame = useCallback(() => {
    setGameState('playing');
    setStartTime(Date.now());
    setLastEmailTime(Date.now());
  }, [setGameState, setStartTime, setLastEmailTime]);

  const handleDecision = useCallback((isPhishing: boolean) => {
    const currentEmail = sampleEmails[currentIndex];
    const correct = isPhishing === currentEmail.isPhishing;

    addDecision({
      emailId: currentEmail.id,
      isPhishing,
      correct,
    });

    setShowFeedback(true);
    setShowHighlights(true);
  }, [currentIndex, addDecision, setShowFeedback, setShowHighlights]);

  const handleNext = useCallback(() => {
    setShowFeedback(false);
    setShowHighlights(false);
    setShowDetailedExplanation(false);

    if (currentIndex < sampleEmails.length - 1) {
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
  };
}; 