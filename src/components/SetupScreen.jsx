import { useState } from 'react';

const DB_OPTIONS = [
  { id: 'russian', label: '🇷🇺 Русские' },
  { id: 'foreign', label: '🌍 Зарубежные' },
  { id: 'all', label: '🎲 Все' },
];

export default function SetupScreen({ onStart }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [spyCount, setSpyCount] = useState(1);
  const [database, setDatabase] = useState('all');
  const [useCustomWords, setUseCustomWords] = useState(false);

  const maxSpies = Math.max(1, playerCount - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerCount >= 3 && playerCount <= 20 && spyCount >= 1 && spyCount <= maxSpies) {
      onStart(playerCount, spyCount, database, useCustomWords);
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
            onClick={() => {
              const newCount = Math.max(3, playerCount - 1);
              setPlayerCount(newCount);
              const newMaxSpies = Math.max(1, newCount - 1);
              if (spyCount > newMaxSpies) setSpyCount(newMaxSpies);
            }}
          >
            −
          </button>
          <input
            id="players"
            type="number"
            min={3}
            max={20}
            value={playerCount}
            onChange={(e) => {
              const newCount = Number(e.target.value);
              setPlayerCount(newCount);
              const newMaxSpies = Math.max(1, newCount - 1);
              if (spyCount > newMaxSpies) setSpyCount(newMaxSpies);
            }}
          />
          <button
            type="button"
            className="counter-btn"
            onClick={() => {
              setPlayerCount(Math.min(20, playerCount + 1));
            }}
          >
            +
          </button>
        </div>
        <span className="hint">от 3 до 20 игроков</span>

        <label htmlFor="spies">Количество шпионов</label>
        <div className="player-counter">
          <button
            type="button"
            className="counter-btn"
            onClick={() => setSpyCount(Math.max(1, spyCount - 1))}
          >
            −
          </button>
          <input
            id="spies"
            type="number"
            min={1}
            max={maxSpies}
            value={spyCount}
            onChange={(e) => {
              const val = Number(e.target.value);
              setSpyCount(Math.min(maxSpies, Math.max(1, val)));
            }}
          />
          <button
            type="button"
            className="counter-btn"
            onClick={() => setSpyCount(Math.min(maxSpies, spyCount + 1))}
          >
            +
          </button>
        </div>
        <span className="hint">от 1 до {maxSpies} шпионов</span>

        <label>Режим слов</label>
        <div className="db-selector">
          <button
            type="button"
            className={`db-option ${!useCustomWords ? 'db-option--active' : ''}`}
            onClick={() => setUseCustomWords(false)}
          >
            📚 Из базы
          </button>
          <button
            type="button"
            className={`db-option ${useCustomWords ? 'db-option--active' : ''}`}
            onClick={() => setUseCustomWords(true)}
          >
            ✏️ Свои слова
          </button>
        </div>

        {!useCustomWords && (
          <>
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
          </>
        )}

        {useCustomWords && (
          <div className="custom-words-info">
            <p>
              Каждый игрок предложит своё слово. Одно из них будет выбрано случайно — и тот, кто его
              предложил, точно не шпион!
            </p>
          </div>
        )}

        <button type="submit" className="btn-primary">
          Начать игру
        </button>
      </form>

      <div className="rules">
        <h3>Как играть?</h3>
        <ol>
          <li>Выберите количество игроков и шпионов</li>
          <li>Передавайте телефон по кругу — каждый смотрит свою роль</li>
          <li>
            Шпионы не знают загаданного слова — <strong>вычислите их!</strong>
          </li>
          <li>Задавайте друг другу вопросы и голосуйте!</li>
        </ol>
      </div>
    </div>
  );
}
