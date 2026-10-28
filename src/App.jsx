import { useState, useCallback } from 'react';
import SetupScreen from './components/SetupScreen';
import WordProposal from './components/WordProposal';
import PlayerReveal from './components/PlayerReveal';
import GameScreen from './components/GameScreen';
import locations from './data/locations.json';
import characters from './data/characters.json';
import './App.css';

const DATABASES = {
  locations,
  characters,
};

function getRandomWord(db) {
  const list = DATABASES[db] || DATABASES.locations;
  return list[Math.floor(Math.random() * list.length)];
}

/** Pick `count` unique random indices from 0..total-1, excluding any in `excludeSet` */
function getRandomCursedIndices(total, count, excludeSet = new Set()) {
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
  const [cursedCount, setCursedCount] = useState(1);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [word, setWord] = useState('');
  const [wordCategory, setWordCategory] = useState('locations');
  const [cursedIndices, setCursedIndices] = useState([]);
  const [proposedWords, setProposedWords] = useState([]); // { playerIndex, word }[]

  const handleStart = useCallback((count, cursed, db, customWords) => {
    setPlayerCount(count);
    setCursedCount(cursed);
    setCurrentPlayer(0);
    setProposedWords([]);
    setWordCategory(customWords ? 'custom' : db);

    if (customWords) {
      // Go to word proposal phase
      setPhase('propose');
    } else {
      // Preset mode: everyone except the cursed players receives the same word.
      const chosenWord = getRandomWord(db);
      setWord(chosenWord);
      setCursedIndices(getRandomCursedIndices(count, cursed));
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

        // The author of the selected word cannot be cursed.
        const excludeSet = new Set([wordAuthorIndex]);
        const indices = getRandomCursedIndices(playerCount, cursedCount, excludeSet);
        setCursedIndices(indices);

        // Reset to first player for reveal phase
        setCurrentPlayer(0);
        setPhase('reveal');
      } else {
        setCurrentPlayer(currentPlayer + 1);
      }
    },
    [currentPlayer, playerCount, cursedCount, proposedWords],
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
    setCursedCount(1);
    setCurrentPlayer(0);
    setWord('');
    setWordCategory('locations');
    setCursedIndices([]);
    setProposedWords([]);
  }, []);

  const cursedSet = new Set(cursedIndices);

  return (
    <div className="app">
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
            isCursed={cursedSet.has(currentPlayer)}
            word={word}
            category={wordCategory}
            onNext={handleNextPlayer}
          />
        )}

        {phase === 'game' && (
          <GameScreen word={word} cursedIndices={cursedIndices} onNewGame={handleNewGame} />
        )}
      </div>
    </div>
  );
}
