import { useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';

export function HighlightSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsRevealed(true), 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-[#0F0A1A]"
    >
      {/* Background Image with blur reveal */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-4xl mx-auto">
          <img
            src="images/photo6.jpg"
            alt="Shravani"
            className={`w-full h-full object-cover transition-all duration-[2000ms] ease-out ${
              isRevealed ? 'blur-0 scale-100' : 'blur-[10px] scale-105'
            }`}
          />
          {/* Golden light overlay */}
          <div 
            className={`absolute inset-0 bg-gradient-radial from-[#FEF3C7]/20 via-transparent to-transparent transition-opacity duration-1500 ${
              isRevealed ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {/* Vignette */}
          <div className="absolute inset-0 bg-radial-vignette pointer-events-none" 
            style={{
              background: 'radial-gradient(ellipse at center, transparent 40%, rgba(15, 10, 26, 0.8) 100%)'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          {/* Line 1 */}
          <p
            className={`font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4 transition-all duration-1000 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '1s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              textShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
            }}
          >
            I could look at you forever
          </p>

          {/* Line 2 */}
          <p
            className={`font-heading text-2xl md:text-3xl lg:text-4xl text-[#D4AF37] transition-all duration-1000 ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '1.8s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              textShadow: '0 0 40px rgba(212, 175, 55, 0.6)',
            }}
          >
            And still find something new to admire.
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF5F7] to-transparent" />
    </section>
  );
}
