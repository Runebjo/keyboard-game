import { useState, useEffect, useCallback } from 'react';
import { codingKeys } from '../constants';

const useGameLogic = () => {
  const [currentKey, setCurrentKey] = useState({
    key: '',
    shift: false,
    finger: '',
  });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [userInput, setUserInput] = useState([]);
  const [errorCount, setErrorCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const [gameId, setGameId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    const savedScores = localStorage.getItem('keyboardGameScores');
    if (savedScores) {
      setAllScores(JSON.parse(savedScores));
    }
  }, []);

  const saveScore = useCallback(() => {
    if (gameId !== null) {
      const newScore = {
        id: gameId,
        score,
        date: new Date().toISOString(),
        errorCount,
        correctCount,
      };
      const newScores = [...allScores, newScore];
      setAllScores(newScores);
      localStorage.setItem('keyboardGameScores', JSON.stringify(newScores));
      setGameId(null);
    }
  }, [score, gameId, allScores, errorCount, correctCount]);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (gameStarted && timeLeft === 0) {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameStarted]);

  const generateNewKey = () => {
    let randomKey;
    do {
      randomKey = codingKeys[Math.floor(Math.random() * codingKeys.length)];
    } while (randomKey.key === currentKey.key);
    setCurrentKey(randomKey);
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (gameOver) {
        if (event.key === 's') {
          // Handle showing stats in parent component
        } else if (event.key === 'r') {
          startGame();
        }
        return;
      }

      if (!gameStarted) {
        setGameStarted(true);
      }

      event.preventDefault();
      const pressedKey = event.key;
      const shiftPressed = event.shiftKey;

      if (pressedKey.length === 1 || currentKey.key === pressedKey) {
        const isCorrect =
          pressedKey === currentKey.key && shiftPressed === currentKey.shift;
        setUserInput((prevInput) => [
          ...prevInput,
          { key: pressedKey, isCorrect },
        ]);

        if (isCorrect) {
          setCorrectCount((prevCount) => prevCount + 1);
          setScore((prevScore) => prevScore + 1);
          generateNewKey();
        } else {
          setErrorCount((prevCount) => prevCount + 1);
          setScore((prevScore) => Math.max(0, prevScore - 1));
        }
      }
    },
    [currentKey, gameOver, gameStarted]
  );

  const startGame = () => {
    setScore(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(false);
    setUserInput([]);
    setErrorCount(0);
    setCorrectCount(0);
    setGameId(Date.now());
    generateNewKey();
  };

  const endGame = () => {
    setGameOver(true);
    setGameStarted(false);
    saveScore();
  };

  return {
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
  };
};

export default useGameLogic;
