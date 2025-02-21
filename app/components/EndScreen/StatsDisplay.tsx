interface StatsDisplayProps {
  timeElapsed: number;
  correctAnswers: number;
  totalAnswers: number;
  averageResponseTime: number;
}

export const StatsDisplay = ({
  timeElapsed,
  correctAnswers,
  totalAnswers,
  averageResponseTime,
}: StatsDisplayProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
          {correctAnswers}
        </div>
        <div className="text-sm text-blue-700">
          Korrekte Antworten
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
          {((correctAnswers / totalAnswers) * 100).toFixed(0)}%
        </div>
        <div className="text-sm text-blue-700">
          Genauigkeit
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
          {timeElapsed.toFixed(0)}s
        </div>
        <div className="text-sm text-blue-700">
          Gesamtzeit
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 text-center">
        <div className="text-2xl sm:text-3xl font-bold text-blue-900 mb-1">
          {averageResponseTime.toFixed(1)}s
        </div>
        <div className="text-sm text-blue-700">
          Durchschnittliche Zeit
        </div>
      </div>
    </div>
  );
}; 