import React from 'react';
import { HighlightElement } from '../../data/sampleEmails';

interface HighlightedTextProps {
  text: string;
  highlights?: HighlightElement[];
  showHighlights?: boolean;
}

export const HighlightedText = ({ text, highlights, showHighlights = true }: HighlightedTextProps) => {
  // Function to parse and render markdown-style links
  const renderTextWithLinks = (text: string) => {
    const parts = text.split(/(\[(?:[^\]]+)\]\([^)]+\))/g);
    
    return parts.map((part, index) => {
      const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const [, linkText, url] = linkMatch;
        return (
          <span 
            key={`link-${index}-${linkText}`}
            className="text-blue-600 underline hover:text-blue-800 cursor-pointer transition-colors inline-block"
            title={`Dies ist nur eine Demonstration - Links sind deaktiviert (${url})`}
          >
            {linkText}
          </span>
        );
      }
      // Split the text by newlines and join with br elements
      return part.split('\n').map((line, i) => (
        <React.Fragment key={`line-${index}-${i}`}>
          {line}
          {i < part.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));
    });
  };

  if (!highlights || highlights.length === 0 || !showHighlights) {
    return <>{renderTextWithLinks(text)}</>;
  }

  let lastIndex = 0;
  const elements = [];
  
  highlights.forEach((highlight, i) => {
    const startIndex = text.indexOf(highlight.text, lastIndex);
    if (startIndex === -1) return;

    // Add text before highlight
    if (startIndex > lastIndex) {
      const beforeText = text.slice(lastIndex, startIndex);
      elements.push(
        <span key={`text-${i}`}>
          {renderTextWithLinks(beforeText)}
        </span>
      );
    }

    // Add highlighted text
    elements.push(
      <span
        key={`highlight-${i}`}
        className={`cursor-help ${highlight.type === 'suspicious' ? 'bg-red-200 text-red-900' : 'bg-green-200 text-green-900'}`}
        title={highlight.explanation}
      >
        {renderTextWithLinks(highlight.text)}
      </span>
    );

    lastIndex = startIndex + highlight.text.length;
  });

  // Add remaining text
  if (lastIndex < text.length) {
    elements.push(
      <span key="text-end">
        {renderTextWithLinks(text.slice(lastIndex))}
      </span>
    );
  }

  return <>{elements}</>;
}; 