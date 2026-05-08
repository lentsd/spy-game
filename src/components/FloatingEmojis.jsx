import { useMemo } from 'react';

const EMOJIS = ['🕵️', '🔍', '🗝️', '🎭', '👁️', '🤫', '🔒', '💣', '🎯', '📡', '🕶️', '🗂️'];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function FloatingEmojis() {
  const emojis = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        left: randomBetween(2, 95),
        delay: randomBetween(0, 20),
        duration: randomBetween(18, 35),
        size: randomBetween(18, 32),
        startY: randomBetween(0, 100),
      })),
    [],
  );

  return (
    <div className="floating-emojis" aria-hidden="true">
      {emojis.map((item) => (
        <span
          key={item.id}
          className="floating-emoji"
          style={{
            left: `${item.left}%`,
            top: `${item.startY}%`,
            fontSize: `${item.size}px`,
            animationDelay: `${item.delay}s`,
            animationDuration: `${item.duration}s`,
          }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
