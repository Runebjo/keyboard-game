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
    date: new Date(score.date).toLocaleDateString(),
  }));

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
          <Line type="monotone" dataKey="score" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4">
        <p>Total games played: {allScores.length}</p>
        <p>
          Average score:{' '}
          {(
            allScores.reduce((sum, game) => sum + game.score, 0) /
            allScores.length
          ).toFixed(2)}
        </p>
        <p>Highest score: {Math.max(...allScores.map((game) => game.score))}</p>
      </div>
      <p className="mt-4 text-blue-600 font-bold">
        Press 'b' to return to the game
      </p>
    </div>
  );
};

export default StatsPage;
