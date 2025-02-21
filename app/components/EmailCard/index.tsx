import { EmailHeader } from './EmailHeader';
import { EmailContent } from './EmailContent';
import { EmailData } from '../../data/sampleEmails';

interface EmailCardProps {
  email: EmailData;
  showHighlights: boolean;
  progress: number;
}

export const EmailCard = ({
  email,
  showHighlights,
  progress,
}: EmailCardProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Email Container */}
      <div className="flex-1 flex items-stretch">
        <div className="w-full max-w-5xl mx-auto flex flex-col bg-white shadow-[0_1px_3px_0_rgb(0,0,0,0.05)]">
          <EmailHeader
            from={email.from}
            subject={email.subject}
            senderHighlights={email.highlights.sender}
            subjectHighlights={email.highlights.subject}
            showHighlights={showHighlights}
          />
          <EmailContent
            content={email.content}
            contentHighlights={email.highlights.content}
            showHighlights={showHighlights}
          />
        </div>
      </div>
    </div>
  );
}; 