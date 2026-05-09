import { useState, useCallback } from 'react';
import SetupScreen from './components/SetupScreen';
import WordProposal from './components/WordProposal';
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

/** Pick `count` unique random indices from 0..total-1, excluding any in `excludeSet` */
function getRandomSpyIndices(total, count, excludeSet = new Set()) {
  const available = [];
  for (let i = 0; i < total; i++) {
    if (!excludeSet.has(i)) available.push(i);
  }
  // Shuffle available and pick first `count`
  for (let i = available.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [available[i], available[j]] = [available[j], available[i]];
  }
  return available.slice(0, count).sort((a, b) => a - b);
}

export default function App() {
  // phases: setup | propose | reveal | game
  const [phase, setPhase] = useState('setup');
  const [playerCount, setPlayerCount] = useState(0);
  const [spyCount, setSpyCount] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [word, setWord] = useState('');
  const [spyIndices, setSpyIndices] = useState([]);
  const [proposedWords, setProposedWords] = useState([]); // { playerIndex, word }[]

  const handleStart = useCallback((count, spies, db, customWords) => {
    setPlayerCount(count);
    setSpyCount(spies);
    setCurrentPlayer(0);
    setProposedWords([]);

    if (customWords) {
      // Go to word proposal phase
      setPhase('propose');
    } else {
      // Classic mode: pick word from database, pick spies
      const chosenWord = getRandomWord(db);
      setWord(chosenWord);
      setSpyIndices(getRandomSpyIndices(count, spies));
      setPhase('reveal');
    }
  }, []);

  const handleWordProposed = useCallback(
    (proposedWord) => {
      const newProposedWords = [
        ...proposedWords,
        { playerIndex: currentPlayer, word: proposedWord },
      ];
      setProposedWords(newProposedWords);

      if (newProposedWords.length >= playerCount) {
        // All words collected — pick a random one
        const chosen = newProposedWords[Math.floor(Math.random() * newProposedWords.length)];
        const chosenWord = chosen.word;
        const wordAuthorIndex = chosen.playerIndex;

        setWord(chosenWord);

        // The author of the chosen word is NOT a spy
        const excludeSet = new Set([wordAuthorIndex]);
        const indices = getRandomSpyIndices(playerCount, spyCount, excludeSet);
        setSpyIndices(indices);

        // Reset to first player for reveal phase
        setCurrentPlayer(0);
        setPhase('reveal');
      } else {
        setCurrentPlayer(currentPlayer + 1);
      }
    },
    [currentPlayer, playerCount, spyCount, proposedWords],
  );

  const handleNextPlayer = useCallback(() => {
    if (currentPlayer + 1 >= playerCount) {
      setPhase('game');
    } else {
      setCurrentPlayer(currentPlayer + 1);
    }
  }, [currentPlayer, playerCount]);

  const handleNewGame = useCallback(() => {
    setPhase('setup');
    setPlayerCount(0);
    setSpyCount(1);
    setCurrentPlayer(0);
    setWord('');
    setSpyIndices([]);
    setProposedWords([]);
  }, []);

  const spySet = new Set(spyIndices);

  return (
    <div className="app">
      <FloatingEmojis />
      <div className="container">
        {phase === 'setup' && <SetupScreen onStart={handleStart} />}

        {phase === 'propose' && (
          <WordProposal
            key={`propose-${currentPlayer}`}
            playerNumber={currentPlayer + 1}
            totalPlayers={playerCount}
            onSubmitWord={handleWordProposed}
          />
        )}

        {phase === 'reveal' && (
          <PlayerReveal
            key={`reveal-${currentPlayer}`}
            playerNumber={currentPlayer + 1}
            totalPlayers={playerCount}
            isSpy={spySet.has(currentPlayer)}
            word={word}
            onNext={handleNextPlayer}
          />
        )}

        {phase === 'game' && (
          <GameScreen word={word} spyIndices={spyIndices} onNewGame={handleNewGame} />
        )}
      </div>
    </div>
  );
}
