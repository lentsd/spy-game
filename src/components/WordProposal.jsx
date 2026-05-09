import { useState } from 'react';

export default function WordProposal({ playerNumber, totalPlayers, onSubmitWord }) {
  const [word, setWord] = useState('');
  const [phase, setPhase] = useState('ready'); // ready | input

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim()) {
      onSubmitWord(word.trim());
    }
  };

  if (phase === 'ready') {
    return (
      <div className="player-reveal">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(playerNumber / totalPlayers) * 100}%` }}
          />
        </div>
        <p className="player-label">
          Игрок {playerNumber} из {totalPlayers}
        </p>

        <div className="card card-hidden" onClick={() => setPhase('input')}>
          <div className="card-icon">✏️</div>
          <p>Нажми, чтобы предложить своё слово</p>
          <span className="hint">Убедись, что никто не подглядывает!</span>
        </div>
      </div>
    );
  }

  return (
    <div className="player-reveal">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(playerNumber / totalPlayers) * 100}%` }}
        />
      </div>
      <p className="player-label">
        Игрок {playerNumber} из {totalPlayers}
      </p>

      <div className="card card-citizen">
        <div className="card-icon">✏️</div>
        <h2>Предложи знаменитость</h2>
        <form onSubmit={handleSubmit} className="word-proposal-form">
          <input
            type="text"
            className="word-input"
            placeholder="Имя знаменитости..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            autoFocus
          />
          <button type="submit" className="btn-primary" disabled={!word.trim()}>
            {playerNumber < totalPlayers ? 'Передать следующему' : 'Все слова собраны!'}
          </button>
        </form>
        <p className="card-description">
          Введи имя знаменитости. Одно из предложенных слов будет выбрано случайно!
        </p>
      </div>
    </div>
  );
}
