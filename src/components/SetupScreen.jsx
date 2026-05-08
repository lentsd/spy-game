import { useState } from 'react';

const DB_OPTIONS = [
  { id: 'russian', label: '🇷🇺 Русские' },
  { id: 'foreign', label: '🌍 Зарубежные' },
  { id: 'all', label: '🎲 Все' },
];

export default function SetupScreen({ onStart }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [database, setDatabase] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerCount >= 3 && playerCount <= 20) {
      onStart(playerCount, database);
    }
  };

  return (
    <div className="setup-screen">
      <div className="logo">
        <div className="logo-icon">🕵️</div>
        <h1>ШПИОН</h1>
        <p className="subtitle">Найди шпиона среди своих</p>
      </div>

      <form onSubmit={handleSubmit} className="setup-form">
        <label htmlFor="players">Количество игроков</label>
        <div className="player-counter">
          <button
            type="button"
            className="counter-btn"
            onClick={() => setPlayerCount(Math.max(3, playerCount - 1))}
          >
            −
          </button>
          <input
            id="players"
            type="number"
            min={3}
            max={20}
            value={playerCount}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
          />
          <button
            type="button"
            className="counter-btn"
            onClick={() => setPlayerCount(Math.min(20, playerCount + 1))}
          >
            +
          </button>
        </div>
        <span className="hint">от 3 до 20 игроков</span>

        <label>База знаменитостей</label>
        <div className="db-selector">
          {DB_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              className={`db-option ${database === opt.id ? 'db-option--active' : ''}`}
              onClick={() => setDatabase(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <button type="submit" className="btn-primary">
          Начать игру
        </button>
      </form>

      <div className="rules">
        <h3>Как играть?</h3>
        <ol>
          <li>Выберите количество игроков</li>
          <li>Передавайте телефон по кругу — каждый смотрит свою роль</li>
          <li>
            Один из вас — <strong>шпион</strong>, он не знает загаданного слова
          </li>
          <li>Задавайте друг другу вопросы и вычисляйте шпиона!</li>
        </ol>
      </div>
    </div>
  );
}
