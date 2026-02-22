import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { ParticleBackground } from '@/components/ParticleBackground';
import { GlowingButton } from '@/components/GlowingButton';

interface SuspenseSectionProps {
  onReveal: () => void;
}

export function SuspenseSection({ onReveal }: SuspenseSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer1 = setTimeout(() => setShowLine1(true), 500);
      const timer2 = setTimeout(() => setShowLine2(true), 1800);
      const timer3 = setTimeout(() => setShowButton(true), 3200);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isInView]);

  const handleReveal = () => {
    setIsExiting(true);
    setTimeout(onReveal, 1000);
  };

  return (
    <section
      ref={ref}
      className={`relative h-screen w-full overflow-hidden gradient-romantic transition-all duration-1000 ${
        isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
    >
      <ParticleBackground />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          {/* Line 1 */}
          <h2
            className={`font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-8 transition-all duration-1000 ${
              showLine1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              textShadow: '0 0 40px rgba(251, 207, 232, 0.5), 0 0 80px rgba(157, 23, 77, 0.3)',
            }}
          >
            Shravani...
          </h2>

          {/* Line 2 */}
          <p
            className={`font-body text-2xl md:text-3xl lg:text-4xl text-[#FBCFE8] mb-16 transition-all duration-1000 ${
              showLine2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            There's something I've been wanting to tell you.
          </p>

          {/* Reveal Button */}
          <div
            className={`transition-all duration-800 ${
              showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <GlowingButton size="lg" onClick={handleReveal} className="pulse-glow text-xl">
              Reveal
            </GlowingButton>
          </div>
        </div>
      </div>

      {/* Decorative stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `sparkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
