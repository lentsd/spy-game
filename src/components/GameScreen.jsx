import { useState } from 'react';

export default function GameScreen({ word, spyIndices, onNewGame }) {
  const [showSpy, setShowSpy] = useState(false);

  const spyLabels = spyIndices.map((i) => `Игрок ${i + 1}`).join(', ');
  const spyWord = spyIndices.length === 1 ? 'Шпион' : 'Шпионы';

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
          <li>
            {spyIndices.length === 1
              ? 'Шпион может попытаться угадать слово — будьте осторожны!'
              : `В игре ${spyIndices.length} шпиона — будьте особенно внимательны!`}
          </li>
        </ul>
      </div>

      <div className="game-actions">
        {!showSpy ? (
          <button className="btn-danger" onClick={() => setShowSpy(true)}>
            🔍 Раскрыть {spyIndices.length === 1 ? 'шпиона' : 'шпионов'}
          </button>
        ) : (
          <div className="spy-reveal">
            <div className="spy-reveal-card">
              <div className="card-icon">🕵️</div>
              <h2>
                {spyWord} — {spyLabels}
              </h2>
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
