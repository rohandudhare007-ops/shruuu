import { useState, useEffect } from 'react';
import { Heart, Cat } from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { GlowingButton } from '@/components/GlowingButton';

interface IntroSectionProps {
  onEnter: () => void;
}

export function IntroSection({ onEnter }: IntroSectionProps) {
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const subtitleTimer = setTimeout(() => setShowSubtitle(true), 1500);
    const buttonTimer = setTimeout(() => setShowButton(true), 2800);
    
    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 800);
  };

  return (
    <section
      className={`fixed inset-0 z-50 flex items-center justify-center gradient-romantic transition-all duration-800 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      <ParticleBackground />

      {/* Flying Hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `heartFloat ${5 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <Heart
              className="w-4 h-4 md:w-6 md:h-6 text-[#DC2626]"
              fill="currentColor"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(220, 38, 38, 0.6))',
                opacity: 0.7 + Math.random() * 0.3,
              }}
            />
          </div>
        ))}
      </div>

      {/* Falling Cats */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={`cat-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-20px`,
              animation: `catFall ${6 + Math.random() * 3}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <Cat
              className="w-5 h-5 md:w-7 md:h-7 text-[#FBCFE8]"
              fill="currentColor"
              style={{
                filter: 'drop-shadow(0 0 6px rgba(251, 207, 232, 0.5))',
              }}
            />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 text-center px-4">
        {/* Main Title */}
        <h1
          className="font-heading text-6xl md:text-8xl lg:text-9xl text-white mb-6 opacity-0 animate-fade-in"
          style={{
            animation: 'fadeInUp 1.5s ease-out forwards',
            textShadow: '0 0 40px rgba(251, 207, 232, 0.5), 0 0 80px rgba(157, 23, 77, 0.3)',
          }}
        >
          Shravani...
        </h1>

        {/* Subtitle */}
        <p
          className={`font-body text-xl md:text-2xl lg:text-3xl text-[#FBCFE8] mb-12 transition-all duration-1000 ${
            showSubtitle ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        >
          This is something I made just for you.
        </p>

        {/* Enter Button */}
        <div
          className={`transition-all duration-800 ${
            showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        >
          <GlowingButton size="lg" onClick={handleEnter} className="pulse-glow">
            Enter
          </GlowingButton>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[#FBCFE8] opacity-50"
              style={{
                animation: `float 2s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
