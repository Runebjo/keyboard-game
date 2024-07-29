import React, { useState, useEffect } from 'react';
import GameBoard from './GameBoard';
import GameOver from './GameOver';
import StatsPage from './StatsPage';
import useGameLogic from './../hooks/useGameLogic';

export const KeyboardGame = () => {
  const [showStats, setShowStats] = useState(false);
  const {
    currentKey,
    score,
    gameOver,
    timeLeft,
    userInput,
    errorCount,
    correctCount,
    allScores,
    gameStarted,
    startGame,
    handleKeyPress,
  } = useGameLogic();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 's' && gameOver) {
        setShowStats(true);
      } else if (event.key === 'r' && gameOver) {
        setShowStats(false);
        startGame();
      } else {
        handleKeyPress(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress, gameOver, startGame]);

  if (showStats) {
    return (
      <StatsPage allScores={allScores} onBack={() => setShowStats(false)} />
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        US Keyboard Layout Practice for Coding
      </h1>
      <div
        className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4"
        role="alert"
      >
        <p className="font-bold">How to Play</p>
        <p>Type the US key shown. Pay attention to which finger to use!</p>
        <p>The timer will start when you press the first key.</p>
        <p>After a game, press 'r' to restart or 's' to view stats.</p>
      </div>
      {gameOver ? (
        <GameOver
          score={score}
          correctCount={correctCount}
          errorCount={errorCount}
          onStart={startGame}
          onShowStats={() => setShowStats(true)}
          isNewGame={!gameStarted && timeLeft === 60}
        />
      ) : (
        <GameBoard
          currentKey={currentKey}
          score={score}
          correctCount={correctCount}
          errorCount={errorCount}
          timeLeft={timeLeft}
          userInput={userInput}
          gameStarted={gameStarted}
        />
      )}
    </div>
  );
};

export default KeyboardGame;
