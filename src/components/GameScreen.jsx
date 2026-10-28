import { useState } from 'react';
import ghost from '../assets/halloween/friendly-ghost.png';
import WordArtwork from './WordArtwork';

export default function GameScreen({ word, cursedIndices, onNewGame }) {
  const [showCursed, setShowCursed] = useState(false);
  const cursedLabels = cursedIndices.map((index) => `Игрок ${index + 1}`).join(', ');
  const singleCursed = cursedIndices.length === 1;

  return (
    <div className="game-screen">
      <header className="game-header">
        <img className="role-ghost" src={ghost} alt="" aria-hidden="true" />
        <p className="eyebrow">Все роли розданы</p>
        <h1>Кто из вас<br />проклятый?</h1>
        <p className="subtitle">Задавайте вопросы. Слушайте ответы. Голосуйте.</p>
      </header>

      <section className="game-tips" aria-labelledby="tips-heading">
        <h2 id="tips-heading">Не выдайте секрет</h2>
        <ul>
          <li>Спрашивайте о загаданном слове, но не слишком очевидно.</li>
          <li>Замечайте уклончивые ответы и реакцию других игроков.</li>
          <li>{singleCursed ? 'Проклятый может попытаться угадать слово — будьте осторожны.' : `Проклятых в этой игре: ${cursedIndices.length}. Будьте внимательны.`}</li>
        </ul>
      </section>

      <div className="game-actions">
        {!showCursed ? (
          <button type="button" className="btn-secondary" onClick={() => setShowCursed(true)}>Раскрыть {singleCursed ? 'проклятого' : 'проклятых'}</button>
        ) : (
          <div className="cursed-reveal" aria-live="polite">
            <p className="eyebrow">{singleCursed ? 'Проклятый' : 'Проклятые'}</p>
            <h2>{cursedLabels}</h2>
            <WordArtwork key={word} word={word} />
            <p>Загаданное слово:<strong>{word}</strong></p>
          </div>
        )}
        <button type="button" className="btn-primary" onClick={onNewGame}>Новая игра <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  );
}
