import { useInView } from '@/hooks/useInView';
import { Heart } from 'lucide-react';

export function PlayfulSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF5F7 0%, #FCE7F3 50%, #FFF5F7 100%)',
      }}
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <FloatingHeart key={i} index={i} />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Image */}
          <div
            className={`w-full md:w-1/2 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <div className="relative float-animation">
              <div className="aspect-square rounded-3xl overflow-hidden glow-border-hover">
                <img
                  src="images/photo7.jpg"
                  alt="Shravani being playful"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FBCFE8] rounded-full opacity-60 blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#9D174D] rounded-full opacity-30 blur-xl" />
            </div>
          </div>

          {/* Content */}
          <div
            className={`w-full md:w-1/2 text-center md:text-left transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '0.3s', transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Heart className="w-6 h-6 text-[#9D174D] fill-[#9D174D]" />
              <Heart className="w-5 h-5 text-[#FBCFE8] fill-[#FBCFE8]" />
              <Heart className="w-4 h-4 text-[#FFB6C1] fill-[#FFB6C1]" />
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[#9D174D] mb-6">
              You love cats...
            </h2>

            <p className="font-body text-xl md:text-2xl text-gray-700 leading-relaxed">
              i just wanna say " meow moew meow  meow moew meow  meow moew meow  meow moew meow".
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-3">
              <span className="text-4xl">🐾</span>
              <span className="text-4xl">💕</span>
              <span className="text-4xl">🐾</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingHeart({ index }: { index: number }) {
  const positions = [
    { left: '10%', top: '20%' },
    { left: '85%', top: '15%' },
    { left: '70%', top: '60%' },
    { left: '15%', top: '70%' },
    { left: '50%', top: '10%' },
    { left: '90%', top: '80%' },
  ];

  const sizes = ['w-6 h-6', 'w-8 h-8', 'w-5 h-5', 'w-7 h-7', 'w-4 h-4', 'w-6 h-6'];
  const delays = [0, 0.5, 1, 1.5, 0.8, 1.2];
  const durations = [3, 4, 3.5, 4.5, 3, 5];

  return (
    <div
      className={`absolute ${sizes[index]} text-[#FFB6C1] opacity-40`}
      style={{
        left: positions[index].left,
        top: positions[index].top,
        animation: `float ${durations[index]}s ease-in-out infinite`,
        animationDelay: `${delays[index]}s`,
      }}
    >
      <Heart className="w-full h-full fill-current" />
    </div>
  );
}
