interface ActionButtonsProps {
  showFeedback: boolean;
  isCorrect: boolean;
  isLastEmail: boolean;
  onPhishingClick: () => void;
  onNormalClick: () => void;
  onNext: () => void;
}

export const ActionButtons = ({
  showFeedback,
  isCorrect,
  isLastEmail,
  onPhishingClick,
  onNormalClick,
  onNext,
}: ActionButtonsProps) => {
  if (!showFeedback) {
    return (
      <div className="sticky bottom-0 p-4 sm:p-6 bg-white border-t shadow-xl z-50">
        <div className="flex w-full gap-4 max-w-5xl mx-auto">
          <button
            onClick={onPhishingClick}
            className="flex-1 py-4 px-6 bg-red-100 hover:bg-red-200 active:bg-red-300 transition-all rounded-xl font-semibold text-red-700 text-base sm:text-lg hover:shadow-lg transform hover:translate-y-[-2px]"
            aria-label="Als Phishing markieren"
          >
            Phishing Email
          </button>
          <button
            onClick={onNormalClick}
            className="flex-1 py-4 px-6 bg-green-100 hover:bg-green-200 active:bg-green-300 transition-all rounded-xl font-semibold text-green-700 text-base sm:text-lg hover:shadow-lg transform hover:translate-y-[-2px]"
            aria-label="Als normal markieren"
          >
            Normale Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky bottom-0 p-4 sm:p-6 bg-white border-t shadow-xl z-50">
      <div className="flex w-full gap-4 max-w-5xl mx-auto">
        <button
          onClick={onNext}
          className={`w-full py-4 px-6 font-semibold text-base sm:text-lg rounded-xl transition-all hover:shadow-lg transform hover:translate-y-[-2px] ${
            isCorrect
              ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white'
              : 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
          }`}
        >
          {isLastEmail ? 'Ergebnis anzeigen' : 'Nächste E-Mail'}
        </button>
      </div>
    </div>
  );
}; 