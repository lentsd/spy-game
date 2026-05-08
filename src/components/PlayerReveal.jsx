import { useState } from 'react';

export default function PlayerReveal({ playerNumber, totalPlayers, isSpy, word, onNext }) {
  const [revealed, setRevealed] = useState(false);

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

      {!revealed ? (
        <div className="card card-hidden" onClick={() => setRevealed(true)}>
          <div className="card-icon">🔒</div>
          <p>Нажми, чтобы увидеть свою роль</p>
          <span className="hint">Убедись, что никто не подглядывает!</span>
        </div>
      ) : (
        <div className={`card ${isSpy ? 'card-spy' : 'card-citizen'}`}>
          {isSpy ? (
            <>
              <div className="card-icon">🕵️</div>
              <h2>Ты — ШПИОН</h2>
              <p className="card-description">
                Ты не знаешь загаданное слово. Слушай внимательно и постарайся не выдать себя!
              </p>
            </>
          ) : (
            <>
              <div className="card-icon">👤</div>
              <h2>Твоё слово:</h2>
              <p className="word">{word}</p>
              <p className="card-description">Не называй это слово вслух! Вычисляй шпиона.</p>
            </>
          )}
          <button className="btn-primary" onClick={onNext}>
            {playerNumber < totalPlayers ? 'Передать следующему' : 'Начать обсуждение'}
          </button>
        </div>
      )}
    </div>
  );
}
