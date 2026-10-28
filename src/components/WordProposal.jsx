import { useState } from 'react';
import ghost from '../assets/halloween/friendly-ghost.png';

export default function WordProposal({ playerNumber, totalPlayers, onSubmitWord }) {
  const [word, setWord] = useState('');
  const [ready, setReady] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (word.trim()) onSubmitWord(word.trim());
  }

  return (
    <div className="player-reveal">
      <div className="progress-bar" aria-hidden="true">
        <div className="progress-fill" style={{ width: `${(playerNumber / totalPlayers) * 100}%` }} />
      </div>
      <p className="player-label">Игрок {playerNumber} <span>из {totalPlayers}</span></p>

      {!ready ? (
        <button type="button" className="card card-hidden" onClick={() => setReady(true)}>
          <img className="role-ghost" src={ghost} alt="" aria-hidden="true" />
          <span className="card-title">Предложи своё слово</span>
          <span className="card-description">Нажми на карточку, когда никто не подглядывает.</span>
          <span className="card-footnote">Твой маленький секрет.</span>
        </button>
      ) : (
        <div className="card card-citizen">
          <img className="role-ghost" src={ghost} alt="" aria-hidden="true" />
          <h2 className="proposal-title">Что загадаем?</h2>
          <p className="card-description">Предложи локацию или персонажа. Если выпадет твоё слово, ты точно не будешь проклятым.</p>
          <form onSubmit={handleSubmit} className="word-proposal-form">
            <label className="sr-only" htmlFor="proposed-word">Твоё слово</label>
            <input id="proposed-word" type="text" className="word-input" placeholder="Локация или персонаж" value={word} onChange={(event) => setWord(event.target.value)} autoFocus required />
            <button type="submit" className="btn-primary" disabled={!word.trim()}>{playerNumber < totalPlayers ? 'Сохранить и передать телефон' : 'Раздать роли'}</button>
          </form>
        </div>
      )}
    </div>
  );
}
