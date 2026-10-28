import { useState } from 'react';
import Moon from './Moon';
import locations from '../data/locations.json';
import characters from '../data/characters.json';
import ghost from '../assets/halloween/friendly-ghost.png';

const PRESETS = [
  { id: 'locations', label: 'Локации', count: locations.length, description: 'мест из хорроров' },
  { id: 'characters', label: 'Персонажи', count: characters.length, description: 'героев и злодеев' },
];

export default function SetupScreen({ onStart }) {
  const [playerCount, setPlayerCount] = useState(4);
  const [cursedCount, setCursedCount] = useState(1);
  const [database, setDatabase] = useState('locations');
  const [useCustomWords, setUseCustomWords] = useState(false);
  const maxCursed = Math.max(1, playerCount - 1);

  function changePlayers(count) {
    setPlayerCount(count);
    setCursedCount((current) => Math.min(current, Math.max(1, count - 1)));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (playerCount >= 3 && playerCount <= 20 && cursedCount >= 1 && cursedCount <= maxCursed) {
      onStart(playerCount, cursedCount, database, useCustomWords);
    }
  }

  return (
    <div className="setup-screen">
      <div className="intro">
        <header className="logo">
          <div className="edition"><Moon /> <span>Хэллоуинская версия</span></div>
          <h1>Проклятый</h1>
          <p className="tagline">Среди вас есть тот, <br />кто ничего не знает.</p>
          <p className="intro-note">Одно секретное слово. Несколько вопросов.<br />И кто-то обязательно выдаст себя.</p>
        </header>

        <details className="rules">
          <summary>Как играть</summary>
          <ol>
            <li>Выберите число игроков, проклятых и набор слов.</li>
            <li>Передавайте телефон по кругу. Каждый смотрит только свою роль.</li>
            <li>Слово знают все, кроме проклятых.</li>
            <li>Задавайте вопросы и голосуйте — вычислите проклятых.</li>
          </ol>
        </details>
        <p className="edition-footer">3–20 игроков <span aria-hidden="true">/</span> Один телефон <span aria-hidden="true">/</span> Без ведущего</p>
      </div>

      <form onSubmit={handleSubmit} className="setup-form">
        <img className="form-ghost" src={ghost} alt="" aria-hidden="true" />
        <div className="form-heading"><span className="eyebrow">Перед началом</span><span className="form-number" aria-hidden="true">31 / 10</span></div>
        <h2>Соберите компанию.</h2>
        <p className="form-description">Роли распределит случай.</p>

        <div className="counters">
          <div className="counter-group">
            <label htmlFor="players">Игроки</label>
            <div className="player-counter">
              <button type="button" className="counter-btn" aria-label="Уменьшить количество игроков" disabled={playerCount <= 3} onClick={() => changePlayers(Math.max(3, playerCount - 1))}>−</button>
              <input id="players" aria-label="Количество игроков" type="number" min={3} max={20} required value={playerCount} onChange={(event) => changePlayers(Number(event.target.value))} />
              <button type="button" className="counter-btn" aria-label="Увеличить количество игроков" disabled={playerCount >= 20} onClick={() => changePlayers(Math.min(20, playerCount + 1))}>+</button>
            </div>
            <span className="hint">от 3 до 20</span>
          </div>
          <div className="counter-group">
            <label htmlFor="cursed">Проклятые</label>
            <div className="player-counter">
              <button type="button" className="counter-btn" aria-label="Уменьшить количество проклятых" disabled={cursedCount <= 1} onClick={() => setCursedCount(Math.max(1, cursedCount - 1))}>−</button>
              <input id="cursed" aria-label="Количество проклятых" type="number" min={1} max={maxCursed} required value={cursedCount} onChange={(event) => setCursedCount(Math.min(maxCursed, Math.max(1, Number(event.target.value))))} />
              <button type="button" className="counter-btn" aria-label="Увеличить количество проклятых" disabled={cursedCount >= maxCursed} onClick={() => setCursedCount(Math.min(maxCursed, cursedCount + 1))}>+</button>
            </div>
            <span className="hint">от 1 до {maxCursed}</span>
          </div>
        </div>

        <fieldset className="word-mode">
          <legend>Откуда берём слова</legend>
          <div className="mode-selector">
            <button type="button" className={!useCustomWords ? 'mode-option is-active' : 'mode-option'} aria-pressed={!useCustomWords} onClick={() => setUseCustomWords(false)}>Готовые наборы</button>
            <button type="button" className={useCustomWords ? 'mode-option is-active' : 'mode-option'} aria-pressed={useCustomWords} onClick={() => setUseCustomWords(true)}>Свои слова</button>
          </div>
        </fieldset>

        {!useCustomWords ? (
          <fieldset className="preset-selector">
            <legend className="sr-only">Выберите набор слов</legend>
            {PRESETS.map((preset, index) => (
              <label key={preset.id} className={database === preset.id ? 'preset-card is-selected' : 'preset-card'}>
                <input type="radio" name="preset" value={preset.id} checked={database === preset.id} onChange={() => setDatabase(preset.id)} />
                <span className="preset-number" aria-hidden="true">0{index + 1}</span>
                <span className="preset-copy"><strong>{preset.label}</strong><small>{preset.count} {preset.description}</small></span>
                <span className="radio-mark" aria-hidden="true" />
              </label>
            ))}
            <p className="preset-note">{database === 'locations' ? 'Отель «Оверлук», Сайлент Хилл, хижина в лесу…' : 'Фредди Крюгер, Пеннивайз, Дракула и другие.'}</p>
          </fieldset>
        ) : (
          <p className="custom-words-info">Каждый предложит локацию или персонажа. Одно слово выберется случайно. Его автор точно не будет проклятым.</p>
        )}

        <button type="submit" className="btn-primary start-button">Раздать роли <span aria-hidden="true">↗</span></button>
        <p className="privacy-note">Смотрите карточки по очереди. Не подглядывайте.</p>
      </form>
    </div>
  );
}
