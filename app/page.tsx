'use client';

import { useGameStore } from './store/gameStore';
import { useGameLogic } from './hooks/useGameLogic';
// Remove direct import of sampleEmails since we'll get it from useGameLogic
// import { sampleEmails } from './data/sampleEmails';

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
    currentEmail, // Get the current email from useGameLogic
    totalEmails,  // Get the total number of emails from useGameLogic
  } = useGameLogic();

  if (gameState === 'welcome') {
    return <WelcomeScreen />;
  }

  if (gameState === 'finished') {
    return <EndScreen playerName={playerName} />;
  }

  // Use currentEmail from useGameLogic instead of sampleEmails[currentIndex]
  // const currentEmail = sampleEmails[currentIndex];
  // Use totalEmails from useGameLogic instead of sampleEmails.length
  const isLastEmail = currentIndex === totalEmails - 1;
  const isCorrect = decisions.length > 0 && decisions[decisions.length - 1]?.correct;

  return (
    <>
      <EmailCard
        email={currentEmail}
        showHighlights={showHighlights}
        progress={currentIndex / totalEmails}
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
