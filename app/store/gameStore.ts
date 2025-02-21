import { create } from 'zustand';

export type GameState = 'welcome' | 'playing' | 'finished';

interface Decision {
  emailId: number;
  isPhishing: boolean;
  correct: boolean;
  timeToDecide: number;
}

interface GameStore {
  // Game state
  gameState: GameState;
  playerName: string;
  currentIndex: number;
  decisions: Decision[];
  
  // Timing
  startTime: number | null;
  lastEmailTime: number | null;
  
  // UI states
  showFeedback: boolean;
  showHighlights: boolean;
  showDetailedExplanation: boolean;
  isEditingName: boolean;
  
  // Actions
  setGameState: (state: GameState) => void;
  setPlayerName: (name: string) => void;
  setCurrentIndex: (index: number) => void;
  addDecision: (decision: Omit<Decision, 'timeToDecide'>) => void;
  setStartTime: (time: number | null) => void;
  setLastEmailTime: (time: number | null) => void;
  setShowFeedback: (show: boolean) => void;
  setShowHighlights: (show: boolean) => void;
  setShowDetailedExplanation: (show: boolean) => void;
  setIsEditingName: (isEditing: boolean) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  // Initial state
  gameState: 'welcome',
  playerName: '',
  currentIndex: 0,
  decisions: [],
  startTime: null,
  lastEmailTime: null,
  showFeedback: false,
  showHighlights: false,
  showDetailedExplanation: false,
  isEditingName: true,

  // Actions
  setGameState: (state) => set({ gameState: state }),
  setPlayerName: (name) => set({ playerName: name }),
  setCurrentIndex: (index) => set({ currentIndex: index }),
  addDecision: (decision) => set((state) => ({
    decisions: [...state.decisions, {
      ...decision,
      timeToDecide: state.lastEmailTime ? Date.now() - state.lastEmailTime : 0
    }]
  })),
  setStartTime: (time) => set({ startTime: time }),
  setLastEmailTime: (time) => set({ lastEmailTime: time }),
  setShowFeedback: (show) => set({ showFeedback: show }),
  setShowHighlights: (show) => set({ showHighlights: show }),
  setShowDetailedExplanation: (show) => set({ showDetailedExplanation: show }),
  setIsEditingName: (isEditing) => set({ isEditingName: isEditing }),
  resetGame: () => set({
    gameState: 'welcome',
    currentIndex: 0,
    decisions: [],
    startTime: null,
    lastEmailTime: null,
    showFeedback: false,
    showHighlights: false,
    showDetailedExplanation: false,
    isEditingName: false,
  }),
})); 