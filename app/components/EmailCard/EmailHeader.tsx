import { HighlightedText } from '../shared/HighlightedText';
import { HighlightElement } from '../../data/sampleEmails';

interface EmailHeaderProps {
  from: {
    name: string;
    email: string;
  };
  subject: string;
  senderHighlights?: HighlightElement[];
  subjectHighlights?: HighlightElement[];
  showHighlights: boolean;
}

export const EmailHeader = ({
  from,
  subject,
  senderHighlights,
  subjectHighlights,
  showHighlights,
}: EmailHeaderProps) => {
  return (
    <div className="relative bg-slate-50/95">
      {/* Content Container */}
      <div className="relative px-3 sm:px-4 py-3.5">
        {/* Subject Line */}
        <h2 className="text-[clamp(1rem,1.5vw+0.5rem,1.25rem)] font-semibold text-slate-800 leading-snug mb-2.5 tracking-[-0.01em]">
          <HighlightedText 
            text={subject}
            highlights={subjectHighlights}
            showHighlights={showHighlights}
          />
        </h2>

        {/* Sender Info - Modern layout */}
        <div className="flex flex-col sm:flex-row items-baseline gap-1.5 sm:gap-2">
          <div className="font-medium text-[clamp(0.813rem,1.25vw+0.25rem,0.938rem)] text-indigo-950/80">
            <HighlightedText 
              text={from.name}
              highlights={senderHighlights}
              showHighlights={showHighlights}
            />
          </div>
          <div className="text-[clamp(0.813rem,1.25vw+0.25rem,0.938rem)] text-slate-500/90 break-all sm:break-normal">
            <HighlightedText 
              text={from.email}
              highlights={senderHighlights}
              showHighlights={showHighlights}
            />
          </div>
        </div>

        {/* Subtle Bottom Border */}
        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-slate-200/60" />
      </div>
    </div>
  );
}; 