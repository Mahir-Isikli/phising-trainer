import { HighlightedText } from '../shared/HighlightedText';
import { HighlightElement } from '../../data/sampleEmails';

interface EmailContentProps {
  content: string;
  contentHighlights?: HighlightElement[];
  showHighlights: boolean;
}

export const EmailContent = ({
  content,
  contentHighlights,
  showHighlights,
}: EmailContentProps) => {
  return (
    <div className="flex-1 p-3 sm:p-4 overflow-y-auto bg-white">
      <div className="prose max-w-none">
        <div className="text-[clamp(0.875rem,1.25vw+0.25rem,1rem)] leading-relaxed text-gray-800">
          <HighlightedText 
            text={content}
            highlights={contentHighlights}
            showHighlights={showHighlights}
          />
        </div>
      </div>
    </div>
  );
}; 