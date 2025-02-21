import { EmailData } from '../../data/sampleEmails';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FeedbackBannerProps {
  show: boolean;
  email: EmailData;
  isCorrect: boolean;
  showDetailedExplanation: boolean;
  onToggleDetails: () => void;
}

export const FeedbackBanner = ({
  show,
  email,
  isCorrect,
  showDetailedExplanation,
  onToggleDetails,
}: FeedbackBannerProps) => {
  return (
    <div 
      className={`fixed inset-x-0 bottom-[4.5rem] w-full transition-all duration-500 ease-in-out ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ 
        zIndex: 40,
        opacity: show ? 1 : 0,
      }}
    >
      <div className="mx-auto max-w-5xl px-3 sm:px-6">
        <div className={`${
          isCorrect ? 'bg-green-500/95' : 'bg-red-500/95'
        } rounded-xl sm:rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm border border-white/10`}>
          <div className="text-white">
            {/* Header Section */}
            <div className="p-3 sm:p-5 border-b border-white/10">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full ${
                    isCorrect ? 'bg-green-300' : 'bg-red-300'
                  }`} />
                  <p className="font-bold text-base sm:text-xl">
                    {isCorrect ? 'Richtig!' : 'Falsch!'}
                  </p>
                </div>
                <button
                  onClick={onToggleDetails}
                  className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 
                           rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 
                           text-xs sm:text-sm font-medium group whitespace-nowrap"
                >
                  {showDetailedExplanation ? (
                    <>
                      Details ausblenden
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-y-0.5" />
                    </>
                  ) : (
                    <>
                      Details anzeigen
                      <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base leading-normal sm:leading-relaxed text-white/90 break-words">
                {email.explanation}
              </p>
            </div>

            {/* Details Section */}
            <div 
              className={`transition-all duration-500 ease-in-out ${
                showDetailedExplanation ? 'max-h-[60vh] opacity-100' : 'max-h-0 opacity-0'
              } overflow-y-auto`}
            >
              <div className="p-3 sm:p-5 bg-white/10">
                <h3 className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 text-white/90">
                  Wichtige Merkmale:
                </h3>
                <ul className="space-y-3 sm:space-y-4">
                  {Object.entries(email.highlights).map(([section, highlights]) => 
                    highlights && highlights.map((highlight, index) => (
                      <li key={`${section}-${index}`} className="flex items-start gap-2 sm:gap-3">
                        <span className={`mt-1 sm:mt-1.5 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${
                          highlight.type === 'suspicious' ? 'bg-red-300' : 'bg-green-300'
                        }`} />
                        <div className="space-y-0.5 sm:space-y-1">
                          <strong className="font-medium block text-white text-sm sm:text-base break-words">
                            {highlight.text}
                          </strong>
                          <span className="text-xs sm:text-sm leading-normal sm:leading-relaxed text-white/80 break-words">
                            {highlight.explanation}
                          </span>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 