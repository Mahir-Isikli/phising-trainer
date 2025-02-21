'use client';

import { useGameStore } from './store/gameStore';
import { useGameLogic } from './hooks/useGameLogic';
import { sampleEmails } from './data/sampleEmails';

import { WelcomeScreen } from './components/WelcomeScreen';
import { EmailCard } from './components/EmailCard';
import { ActionButtons } from './components/ActionButtons';
import { FeedbackBanner } from './components/FeedbackBanner';
import { EndScreen } from './components/EndScreen';

export default function Home() {
  const {
    gameState,
    playerName,
    currentIndex,
    showFeedback,
    showDetailedExplanation,
    showHighlights,
    decisions,
    setShowDetailedExplanation,
  } = useGameStore();

  const {
    handleDecision,
    handleNext,
  } = useGameLogic();

  if (gameState === 'welcome') {
    return <WelcomeScreen />;
  }

  if (gameState === 'finished') {
    return <EndScreen playerName={playerName} />;
  }

  const currentEmail = sampleEmails[currentIndex];
  const isLastEmail = currentIndex === sampleEmails.length - 1;
  const isCorrect = decisions.length > 0 && decisions[decisions.length - 1]?.correct;

  return (
    <>
      <EmailCard
        email={currentEmail}
        showHighlights={showHighlights}
        progress={currentIndex / sampleEmails.length}
      />

      <ActionButtons
        showFeedback={showFeedback}
        isCorrect={isCorrect}
        isLastEmail={isLastEmail}
        onPhishingClick={() => handleDecision(true)}
        onNormalClick={() => handleDecision(false)}
        onNext={handleNext}
      />

      <FeedbackBanner
        show={showFeedback}
        email={currentEmail}
        isCorrect={isCorrect}
        showDetailedExplanation={showDetailedExplanation}
        onToggleDetails={() => setShowDetailedExplanation(!showDetailedExplanation)}
      />
    </>
  );
}
