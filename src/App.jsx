import { useState, useCallback } from 'react';
import SetupScreen from './components/SetupScreen';
import PlayerReveal from './components/PlayerReveal';
import GameScreen from './components/GameScreen';
import FloatingEmojis from './components/FloatingEmojis';
import russianCelebs from './data/russian.json';
import foreignCelebs from './data/foreign.json';
import './App.css';

const DATABASES = {
  russian: russianCelebs,
  foreign: foreignCelebs,
  all: [...russianCelebs, ...foreignCelebs],
};

function getRandomWord(db) {
  const list = DATABASES[db] || DATABASES.all;
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomSpyIndex(playerCount) {
  return Math.floor(Math.random() * playerCount);
}

export default function App() {
  const [phase, setPhase] = useState('setup'); // setup | reveal | game
  const [playerCount, setPlayerCount] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [word, setWord] = useState('');
  const [spyIndex, setSpyIndex] = useState(0);

  const handleStart = useCallback((count, db) => {
    setPlayerCount(count);
    setWord(getRandomWord(db));
    setSpyIndex(getRandomSpyIndex(count));
    setCurrentPlayer(0);
    setPhase('reveal');
  }, []);

  const handleNextPlayer = useCallback(() => {
    if (currentPlayer + 1 >= playerCount) {
      setPhase('game');
    } else {
      setCurrentPlayer((prev) => prev + 1);
    }
  }, [currentPlayer, playerCount]);

  const handleNewGame = useCallback(() => {
    setPhase('setup');
    setPlayerCount(0);
    setCurrentPlayer(0);
    setWord('');
    setSpyIndex(0);
  }, []);

  return (
    <div className="app">
      <FloatingEmojis />
      <div className="container">
        {phase === 'setup' && <SetupScreen onStart={handleStart} />}

        {phase === 'reveal' && (
          <PlayerReveal
            key={currentPlayer}
            playerNumber={currentPlayer + 1}
            totalPlayers={playerCount}
            isSpy={currentPlayer === spyIndex}
            word={word}
            onNext={handleNextPlayer}
          />
        )}

        {phase === 'game' && (
          <GameScreen word={word} spyIndex={spyIndex} onNewGame={handleNewGame} />
        )}
      </div>
    </div>
  );
}
