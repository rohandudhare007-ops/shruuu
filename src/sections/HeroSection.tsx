import { useInView } from '@/hooks/useInView';
import { Sparkles } from '@/components/Sparkles';

export function HeroSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0">
        <img
          src="images/photo1.jpg"
          alt="Shravani"
          className={`w-full h-full object-cover transition-transform duration-[20000ms] ease-linear ${
            isInView ? 'scale-110' : 'scale-100'
          }`}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Sparkles overlay */}
      <Sparkles />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-4xl">
          {/* Line 1 */}
          <p
            className={`font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '0.3s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              textShadow: '0 0 30px rgba(251, 207, 232, 0.5)',
            }}
          >
            You are not just beautiful...
          </p>

          {/* Line 2 */}
          <h2
            className={`font-heading text-4xl md:text-5xl lg:text-6xl text-[#FBCFE8] transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{
              transitionDelay: '1.1s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              textShadow: '0 0 40px rgba(251, 207, 232, 0.6), 0 0 80px rgba(157, 23, 77, 0.4)',
            }}
          >
            You are my favorite view.
          </h2>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FFF5F7] to-transparent" />
    </section>
  );
}
