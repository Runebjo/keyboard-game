import React from 'react';

const GameOver = ({
  score,
  correctCount,
  errorCount,
  onStart,
  onShowStats,
  isNewGame,
}) => {
  return (
    <div className="text-center">
      {isNewGame ? (
        <button
          onClick={onStart}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Start Game
        </button>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-2">Game Over!</h2>
          <p className="mb-4">Your final score is: {score}</p>
          <p className="mb-4 text-green-500">Correct hits: {correctCount}</p>
          <p className="mb-4 text-red-500">Errors: {errorCount}</p>
          <p className="mb-4">Press 'r' to restart or 's' to view stats</p>
        </>
      )}
    </div>
  );
};

export default GameOver;
