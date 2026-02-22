import { Heart } from 'lucide-react';

export function FloatingHearts() {
  const hearts = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 12 + Math.random() * 8,
    opacity: 0.4 + Math.random() * 0.4,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            bottom: `-30px`,
            animation: `floatingHeartRise ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
            width: '8px',
            height: '8px',
          }}
        >
          <Heart
            className="w-2 h-2 text-[#FBCFE8]"
            fill="currentColor"
            style={{
              filter: 'drop-shadow(0 0 3px rgba(251, 207, 232, 0.8))',
            }}
          />
        </div>
      ))}
    </div>
  );
}

