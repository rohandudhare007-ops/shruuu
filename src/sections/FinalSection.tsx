import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { RosePetals } from '@/components/RosePetals';
import { GlowingButton } from '@/components/GlowingButton';
import { Heart, RotateCcw } from 'lucide-react';

interface FinalSectionProps {
  onReplay: () => void;
}

export function FinalSection({ onReplay }: FinalSectionProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [showWords, setShowWords] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);

  const words1 = ['Shravani...'];
  const words2 = ['You', 'are', 'the', 'most', 'beautiful', 'part', 'of', 'my', 'life.'];
  const words3 = ['I', 'made', 'this', 'just', 'to', 'see', 'your', 'smile.'];

  useEffect(() => {
    if (isInView) {
      // Animate words sequentially
      let delay = 500;
      
      // First line
      words1.forEach((_, i) => {
        setTimeout(() => {
          setShowWords(prev => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, delay);
        delay += 400;
      });

      // Second line
      words2.forEach((_, i) => {
        setTimeout(() => {
          setShowWords(prev => {
            const next = [...prev];
            next[words1.length + i] = true;
            return next;
          });
        }, delay);
        delay += 250;
      });

      // Third line
      words3.forEach((_, i) => {
        setTimeout(() => {
          setShowWords(prev => {
            const next = [...prev];
            next[words1.length + words2.length + i] = true;
            return next;
          });
        }, delay);
        delay += 250;
      });
    }
  }, [isInView]);

  const wordIndex = (line: number, index: number) => {
    if (line === 0) return index;
    if (line === 1) return words1.length + index;
    return words1.length + words2.length + index;
  };

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="images/final-photo.jpg"
          alt="Shravani"
          className="w-full h-full object-cover"
        />
        {/* Golden overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FEF3C7]/30 via-transparent to-[#FEF3C7]/40" />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Rose petals */}
      <RosePetals />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          {/* Line 1 */}
          <div className="mb-6">
            {words1.map((word, i) => (
              <span
                key={i}
                className={`font-heading text-4xl md:text-5xl lg:text-6xl text-white inline-block mr-2 transition-all duration-500 ${
                  showWords[wordIndex(0, i)] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  textShadow: '0 0 30px rgba(251, 207, 232, 0.6), 0 0 60px rgba(157, 23, 77, 0.4)',
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Line 2 */}
          <div className="mb-6">
            {words2.map((word, i) => (
              <span
                key={i}
                className={`font-heading text-3xl md:text-4xl lg:text-5xl text-[#FBCFE8] inline-block mr-2 transition-all duration-500 ${
                  showWords[wordIndex(1, i)] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  textShadow: '0 0 25px rgba(251, 207, 232, 0.5)',
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Line 3 */}
          <div className="mb-12">
            {words3.map((word, i) => (
              <span
                key={i}
                className={`font-heading text-2xl md:text-3xl lg:text-4xl text-[#D4AF37] inline-block mr-2 transition-all duration-500 ${
                  showWords[wordIndex(2, i)] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  textShadow: '0 0 25px rgba(212, 175, 55, 0.5)',
                }}
              >
                {word}
              </span>
            ))}
          </div>

          {/* Animated Heart */}
          <div
            className={`flex justify-center mb-12 transition-all duration-1000 ${
              showWords[showWords.length - 1] ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}
            style={{ transitionDelay: '0.5s' }}
          >
            <div className="relative">
              <Heart 
                className="w-20 h-20 md:w-24 md:h-24 text-[#DC2626] fill-[#DC2626] pulse-glow"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.6))',
                }}
              />
              {/* Ripple effect */}
              <div className="absolute inset-0 animate-ping">
                <Heart className="w-20 h-20 md:w-24 md:h-24 text-[#DC2626] fill-[#DC2626] opacity-30" />
              </div>
            </div>
          </div>

          {/* Replay Button */}
          <div
            className={`transition-all duration-800 ${
              showWords[showWords.length - 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1s' }}
          >
            <GlowingButton variant="secondary" size="md" onClick={onReplay}>
              <span className="flex items-center gap-2">
                <RotateCcw className="w-5 h-5" />
                Experience Again
              </span>
            </GlowingButton>
          </div>

          {/* Credit Text */}
          <div
            className={`mt-16 transition-all duration-800 ${
              showWords[showWords.length - 1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '1.5s' }}
          >
            <p className="font-heading text-base md:text-lg lg:text-xl text-[#2d2d2d] font-bold">
              All Rights Reserved | Designed & Developed By{' '}
              <span className="text-[#2d2d2d] font-bold">Rohan Dudhare</span>
            </p>
          </div>
        </div>
      </div>

      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${Math.random() * 2 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          >
            <div 
              className="w-2 h-2 bg-[#FFE4B5] rounded-full"
              style={{
                boxShadow: '0 0 10px #FFE4B5, 0 0 20px #FFE4B5',
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
