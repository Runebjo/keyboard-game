import React from 'react';
import FingerDisplay from './FingerDisplay';

const GameBoard = ({
  currentKey,
  score,
  correctCount,
  errorCount,
  timeLeft,
  userInput,
  gameStarted,
}) => {
  return (
    <div className="text-center">
      <p className="text-4xl font-bold mb-2 pb-2 bg-gray-300">
        {currentKey.key}
      </p>
      <FingerDisplay currentKey={currentKey} />
      <div className="mb-4 text-center w-full p-2 border border-gray-300 rounded h-12 overflow-hidden">
        {userInput.map((char, index) => (
          <span
            key={index}
            className={char.isCorrect ? 'text-black' : 'text-red-500'}
          >
            {char.key}
          </span>
        ))}
      </div>
      <p className="mb-2">Score: {score}</p>
      <p className="mb-2 text-green-500">Correct hits: {correctCount}</p>
      {errorCount > 0 && (
        <p className="mb-2 text-red-500">Errors: {errorCount}</p>
      )}
      <p>Time left: {gameStarted ? timeLeft : 60} seconds</p>
      {!gameStarted && <p>Press any key to start the game!</p>}
    </div>
  );
};

export default GameBoard;
