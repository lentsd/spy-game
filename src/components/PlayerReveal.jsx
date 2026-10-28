import { useState } from 'react';
import ghost from '../assets/halloween/friendly-ghost.png';
import WordArtwork from './WordArtwork';
import artwork from '../data/card-art.json';

const CATEGORY_LABELS = {
  locations: { prompt: 'Узнай свою локацию', heading: 'Локация' },
  characters: { prompt: 'Узнай своего персонажа', heading: 'Персонаж' },
  custom: { prompt: 'Узнай свою роль', heading: 'Твоё слово' },
};

export default function PlayerReveal({ playerNumber, totalPlayers, isCursed, word, category = 'custom', onNext }) {
  const [revealed, setRevealed] = useState(false);
  const labels = CATEGORY_LABELS[category] || CATEGORY_LABELS.custom;

  return (
    <div className="player-reveal">
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${(playerNumber / totalPlayers) * 100}%` }} />
      </div>
      <p className="player-label">Игрок {playerNumber} <span>из {totalPlayers}</span></p>

      {!revealed ? (
        <button type="button" className="card card-hidden" onClick={() => setRevealed(true)}>
          <img className="role-ghost" src={ghost} alt="" aria-hidden="true" />
          <span className="card-title">{labels.prompt}</span>
          <span className="card-description">Нажми на карточку, когда телефон будет только у тебя.</span>
          <span className="card-footnote">Остальным — отвернуться.</span>
        </button>
      ) : (
        <div className={`card ${isCursed ? 'card-cursed' : 'card-citizen'}`}>
          {isCursed || !Object.hasOwn(artwork, word) ? (
            <img className="role-ghost" src={ghost} alt="" aria-hidden="true" />
          ) : (
            <WordArtwork key={word} word={word} />
          )}
          {isCursed ? (
            <>
              <h2 className="cursed-title">Ты Проклятый</h2>
              <p className="card-description">Ты не знаешь загаданное слово. Слушай остальных, задавай вопросы и постарайся не выдать себя.</p>
            </>
          ) : (
            <>
              <h2 className="word-heading">{labels.heading}</h2>
              <p className="word">{word}</p>
              <p className="card-description">Не называй ответ вслух. Вычисли тех, кто не знает, о чём речь.</p>
            </>
          )}
          <button type="button" className="btn-primary" onClick={onNext}>{playerNumber < totalPlayers ? 'Скрыть и передать телефон' : 'Начать обсуждение'}</button>
        </div>
      )}
      <p className="round-note">Проклятый <span aria-hidden="true">/</span> Ночь только начинается</p>
    </div>
  );
}
