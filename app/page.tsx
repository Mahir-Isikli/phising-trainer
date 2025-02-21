'use client';

import React, { useState } from 'react';
import { Mail, Trash2, Check } from 'lucide-react';
import { sampleEmails, EmailData } from './data/sampleEmails';

interface GameStats {
  timeElapsed: number;
  correctAnswers: number;
  totalAnswers: number;
  averageResponseTime: number;
}

interface Decision {
  emailId: number;
  isPhishing: boolean;
  correct: boolean;
  timeToDecide: number;
}

type GameState = 'welcome' | 'playing' | 'finished';

interface HighlightElement {
  text: string;
  type: string;
  explanation: string;
}

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [isEditingName, setIsEditingName] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [lastEmailTime, setLastEmailTime] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeClass, setSwipeClass] = useState('');
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showHighlights, setShowHighlights] = useState(false);
  const [showDetailedExplanation, setShowDetailedExplanation] = useState(false);

  const HighlightedText = ({ text, highlights }: { text: string, highlights?: HighlightElement[] }) => {
    // Function to parse and render markdown-style links
    const renderTextWithLinks = (text: string) => {
      const parts = text.split(/(\[(?:[^\]]+)\]\([^)]+\))/g);
      
      return parts.map((part, index) => {
        const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [_, linkText, url] = linkMatch;
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

  const calculateStats = (): GameStats => {
    const timeElapsed = startTime ? (Date.now() - startTime) / 1000 : 0;
    const correctAnswers = decisions.filter(d => d.correct).length;
    const averageResponseTime = decisions.reduce((acc, d) => acc + d.timeToDecide, 0) / decisions.length / 1000;

    return {
      timeElapsed,
      correctAnswers,
      totalAnswers: decisions.length,
      averageResponseTime
    };
  };

  const handleSwipe = (isPhishing: boolean) => {
    const timeToDecide = lastEmailTime ? Date.now() - lastEmailTime : 0;
    const correct = isPhishing === sampleEmails[currentIndex].isPhishing;
    
    Promise.resolve().then(() => {
      setDecisions(prev => [...prev, { 
        emailId: sampleEmails[currentIndex].id, 
        isPhishing,
        correct,
        timeToDecide
      }]);
      setShowFeedback(true);
      setShowHighlights(true);
      setShowDetailedExplanation(false);
    });
  };

  const handleNext = () => {
    setShowFeedback(false);
    setShowHighlights(false);
    setShowDetailedExplanation(false);

    setTimeout(() => {
      if (currentIndex < sampleEmails.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setLastEmailTime(Date.now());
      } else {
        setGameState('finished');
      }
    }, 50);
  };

  if (gameState === 'welcome') {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 sm:px-6 md:px-8 lg:px-12 py-12">
        <div className="w-full max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-900 mb-4 md:mb-6">
              Phishing-Mail Challenge
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-blue-700 max-w-lg md:max-w-2xl mx-auto">
              Teste deine Fähigkeiten! Wer in unserem Unternehmen erkennt Phishing-Mails am schnellsten?
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-sm bg-white/90">
            <div className="space-y-8">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-900 mb-6">Spielanleitung</h2>
                <ul className="space-y-4 text-blue-800">
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 text-blue-800 font-semibold">1</div>
                    <span className="text-base sm:text-lg">Prüfe jede E-Mail sorgfältig</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 text-blue-800 font-semibold">2</div>
                    <span className="text-base sm:text-lg">Entscheide: Phishing oder normale E-Mail?</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 text-blue-800 font-semibold">3</div>
                    <span className="text-base sm:text-lg">Je schneller und genauer, desto besser!</span>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0 text-blue-800 font-semibold">4</div>
                    <span className="text-base sm:text-lg">Erhalte Feedback zu deinen Entscheidungen</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                {isEditingName ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Dein Name"
                      className="w-full p-4 text-lg border-2 border-blue-200 rounded-xl focus:border-blue-400 focus:ring focus:ring-blue-100 focus:ring-opacity-50 outline-none transition-all duration-200 bg-white"
                      value={playerName}
                      onChange={(e) => {
                        console.log('Name input change:', e.target.value);
                        setPlayerName(e.target.value);
                      }}
                    />
                    {playerName.trim() && (
                      <button
                        onClick={() => {
                          console.log('Confirming name:', playerName);
                          setIsEditingName(false);
                        }}
                        className="w-full py-3 px-4 text-base font-semibold text-blue-700 bg-blue-100 rounded-xl hover:bg-blue-200 active:bg-blue-300 transition-all duration-200 transform hover:translate-y-[-1px] hover:shadow-md"
                      >
                        Bestätigen
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between gap-4 bg-white rounded-xl shadow-sm">
                    <div className="flex-1 p-4 text-lg font-medium text-gray-800 bg-blue-50 rounded-l-xl border-2 border-blue-200">
                      {playerName}
                    </div>
                    <button
                      onClick={() => {
                        console.log('Editing name:', playerName);
                        setIsEditingName(true);
                      }}
                      className="px-6 py-4 text-blue-600 hover:text-blue-700 active:text-blue-800 font-medium transition-colors duration-200"
                    >
                      Ändern
                    </button>
                  </div>
                )}
                <button
                  onClick={() => {
                    if (playerName.trim()) {
                      console.log('Starting game with name:', playerName);
                      setGameState('playing');
                      setStartTime(Date.now());
                      setLastEmailTime(Date.now());
                      setIsEditingName(false);
                    }
                  }}
                  className={`w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200 transform 
                    ${playerName.trim() 
                      ? 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 hover:translate-y-[-2px] hover:shadow-lg' 
                      : 'bg-blue-300 text-white cursor-not-allowed'}`}
                  disabled={!playerName.trim()}
                >
                  Spiel starten
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'finished') {
    const stats = calculateStats();
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
        <div className="w-full max-w-screen-sm mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 backdrop-blur-sm bg-white/80">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">
                Glückwunsch, {playerName}!
              </h2>
              <p className="text-base sm:text-lg text-blue-700">
                Du hast das Training erfolgreich abgeschlossen
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
                  {stats.correctAnswers}
                </div>
                <div className="text-sm text-blue-700">
                  Korrekte Antworten
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
                  {((stats.correctAnswers / stats.totalAnswers) * 100).toFixed(0)}%
                </div>
                <div className="text-sm text-blue-700">
                  Genauigkeit
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
                  {stats.timeElapsed.toFixed(0)}s
                </div>
                <div className="text-sm text-blue-700">
                  Gesamtzeit
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
                  {stats.averageResponseTime.toFixed(1)}s
                </div>
                <div className="text-sm text-blue-700">
                  Durchschnittliche Zeit
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setGameState('welcome');
                setCurrentIndex(0);
                setDecisions([]);
                setStartTime(null);
                setLastEmailTime(null);
                setShowFeedback(false);
                setShowHighlights(false);
                setShowDetailedExplanation(false);
                setIsEditingName(false);
              }}
              className="w-full py-3 px-4 text-base font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Nochmal spielen
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentEmail = sampleEmails[currentIndex];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-600 transition-all duration-500 ease-in-out"
          style={{ width: `${(currentIndex / sampleEmails.length) * 100}%` }}
        />
      </div>

      {/* Email Container */}
      <div className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
        <div className="h-full bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
          {/* Email Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 sm:p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Mail size={20} className="flex-shrink-0 md:w-6 md:h-6" />
              <div className="overflow-hidden min-w-0">
                <div className="font-semibold truncate text-lg sm:text-xl">
                  <HighlightedText 
                    text={currentEmail.from.name}
                    highlights={currentEmail.highlights.sender}
                  />
                </div>
                <div className="text-sm md:text-base text-blue-100 truncate">
                  <HighlightedText 
                    text={currentEmail.from.email}
                    highlights={currentEmail.highlights.sender}
                  />
                </div>
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold leading-snug">
              <HighlightedText 
                text={currentEmail.subject}
                highlights={currentEmail.highlights.subject || []}
              />
            </h2>
          </div>
          
          {/* Email Content */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            <div className="prose prose-lg max-w-none text-gray-700">
              <HighlightedText 
                text={currentEmail.content}
                highlights={currentEmail.highlights.content}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 p-4 sm:p-6 bg-white border-t shadow-xl z-50">
        <div className="flex w-full gap-4 max-w-2xl mx-auto">
          {!showFeedback ? (
            <>
              <button
                onClick={() => handleSwipe(true)}
                className="flex-1 py-4 px-6 bg-red-100 hover:bg-red-200 active:bg-red-300 transition-all rounded-xl font-semibold text-red-700 text-base sm:text-lg hover:shadow-lg transform hover:translate-y-[-2px]"
                aria-label="Als Phishing markieren"
              >
                Phishing Email
              </button>
              <button
                onClick={() => handleSwipe(false)}
                className="flex-1 py-4 px-6 bg-green-100 hover:bg-green-200 active:bg-green-300 transition-all rounded-xl font-semibold text-green-700 text-base sm:text-lg hover:shadow-lg transform hover:translate-y-[-2px]"
                aria-label="Als normal markieren"
              >
                Normale Email
              </button>
            </>
          ) : (
            <button
              onClick={handleNext}
              className={`w-full py-4 px-6 font-semibold text-base sm:text-lg rounded-xl transition-all hover:shadow-lg transform hover:translate-y-[-2px] ${
                decisions.length > 0 && currentEmail.isPhishing === decisions[decisions.length-1]?.isPhishing
                  ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white'
                  : 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white'
              }`}
            >
              {currentIndex < sampleEmails.length - 1 ? 'Nächste E-Mail' : 'Ergebnis anzeigen'}
            </button>
          )}
        </div>
      </div>

      {/* Enhanced Feedback Banner */}
      <div 
        className={`fixed inset-x-0 bottom-0 w-full transition-transform duration-300 ${
          showFeedback ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ 
          zIndex: 40,
          transitionProperty: 'transform, opacity',
          opacity: showFeedback ? 1 : 0,
        }}
      >
        <div className="mx-auto max-w-lg md:max-w-2xl lg:max-w-3xl">
          <div className={`mx-2 sm:mx-4 mb-[4.5rem] ${
            decisions.length > 0 && currentEmail.isPhishing === decisions[decisions.length-1]?.isPhishing 
              ? 'bg-green-500' 
              : 'bg-red-500'
          } rounded-lg shadow-lg overflow-hidden`}>
            <div className="text-white">
              {/* Header Section */}
              <div className="p-3 sm:p-4 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-base sm:text-lg">
                    {decisions.length > 0 && currentEmail.isPhishing === decisions[decisions.length-1]?.isPhishing ? 'Richtig!' : 'Falsch!'}
                  </p>
                  <button
                    onClick={() => {
                      console.log('Toggling detailed explanation');
                      setShowDetailedExplanation(!showDetailedExplanation);
                    }}
                    className="text-white/80 hover:text-white text-sm font-medium underline underline-offset-2 hover:opacity-90 transition-opacity"
                  >
                    {showDetailedExplanation ? 'Details ausblenden' : 'Details anzeigen'}
                  </button>
                </div>
                <p className="mt-2 text-sm sm:text-base leading-relaxed">{currentEmail.explanation}</p>
              </div>

              {/* Details Section */}
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  showDetailedExplanation ? 'max-h-[70vh] opacity-100' : 'max-h-0 opacity-0'
                } overflow-y-auto`}
              >
                <div className="p-3 sm:p-4 bg-white/10">
                  <h3 className="font-semibold text-sm sm:text-base mb-3">Wichtige Merkmale:</h3>
                  <ul className="space-y-3">
                    {Object.entries(currentEmail.highlights).map(([section, highlights]) => 
                      highlights && highlights.map((highlight, index) => (
                        <li key={`${section}-${index}`} className="flex items-start gap-2">
                          <span className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                            highlight.type === 'suspicious' ? 'bg-red-300' : 'bg-green-300'
                          }`} />
                          <span className="text-sm sm:text-base leading-relaxed">
                            <strong className="font-medium">{highlight.text}</strong>: {highlight.explanation}
                          </span>
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
    </div>
  );
}
