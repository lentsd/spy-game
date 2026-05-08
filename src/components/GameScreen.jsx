import { useState } from 'react';

export default function GameScreen({ word, spyIndex, onNewGame }) {
  const [showSpy, setShowSpy] = useState(false);

  return (
    <div className="game-screen">
      <div className="game-header">
        <div className="game-icon">🎯</div>
        <h1>Обсуждение</h1>
        <p className="subtitle">Задавайте друг другу вопросы и голосуйте, кто шпион!</p>
      </div>

      <div className="game-tips">
        <h3>💡 Советы</h3>
        <ul>
          <li>Задавайте вопросы, связанные со словом, но не слишком очевидные</li>
          <li>Следите за реакцией других игроков</li>
          <li>Шпион может попытаться угадать слово — будьте осторожны!</li>
        </ul>
      </div>

      <div className="game-actions">
        {!showSpy ? (
          <button className="btn-danger" onClick={() => setShowSpy(true)}>
            🔍 Раскрыть шпиона
          </button>
        ) : (
          <div className="spy-reveal">
            <div className="spy-reveal-card">
              <div className="card-icon">🕵️</div>
              <h2>Шпион — Игрок {spyIndex + 1}</h2>
              <p>
                Загаданное слово: <strong>{word}</strong>
              </p>
            </div>
          </div>
        )}

        <button className="btn-primary" onClick={onNewGame}>
          🔄 Новая игра
        </button>
      </div>
    </div>
  );
}
