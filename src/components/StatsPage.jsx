import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StatsPage = ({ allScores }) => {
  const chartData = allScores.map((score, index) => ({
    game: index + 1,
    score: score.score,
    errors: score.errorCount,
    correctHits: score.correctCount,
    date: new Date(score.date).toLocaleDateString(),
  }));

  const totalGames = allScores.length;
  const averageScore = (
    allScores.reduce((sum, game) => sum + game.score, 0) / totalGames
  ).toFixed(2);
  const highestScore = Math.max(...allScores.map((game) => game.score));
  const totalErrors = allScores.reduce((sum, game) => sum + game.errorCount, 0);
  const totalCorrectHits = allScores.reduce(
    (sum, game) => sum + game.correctCount,
    0
  );

  return (
    <div className="text-center max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Game Stats</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" name="Score" />
          <Line
            type="monotone"
            dataKey="errors"
            stroke="#ff0000"
            name="Errors"
          />
          <Line
            type="monotone"
            dataKey="correctHits"
            stroke="#00ff00"
            name="Correct Hits"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-4 text-left">
        <div>
          <p>Total games played: {totalGames}</p>
          <p>Average score: {averageScore}</p>
          <p>Highest score: {highestScore}</p>
        </div>
        <div>
          <p>Total errors: {totalErrors}</p>
          <p>Total correct hits: {totalCorrectHits}</p>
          <p>
            Accuracy:{' '}
            {(
              (totalCorrectHits / (totalCorrectHits + totalErrors)) *
              100
            ).toFixed(2)}
            %
          </p>
        </div>
      </div>
      <p className="mt-4 text-blue-600 font-bold">
        Press 'b' to return to the game
      </p>
    </div>
  );
};

export default StatsPage;
