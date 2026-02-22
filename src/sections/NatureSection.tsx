import { useInView } from '@/hooks/useInView';
import { Leaf } from 'lucide-react';

export function NatureSection() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F0F9F0 0%, #E8F5E8 50%, #F0F9F0 100%)',
      }}
    >
      {/* Floating leaves background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <FloatingLeaf key={i} index={i} />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Image */}
          <div
            className={`w-full md:w-3/5 transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <div className="relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl glow-border-hover">
                <img
                  src="images/photo8.jpg"
                  alt="Shravani in nature"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Misty overlay effect */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 30%, transparent 70%, rgba(240,249,240,0.3) 100%)'
                }}
              />
            </div>
          </div>

          {/* Content */}
          <div
            className={`w-full md:w-2/5 text-center md:text-left transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{ transitionDelay: '0.3s', transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <Leaf className="w-6 h-6 text-green-600" />
              <Leaf className="w-5 h-5 text-green-500" />
              <Leaf className="w-4 h-4 text-green-400" />
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-green-800 mb-6">
              You look like a dream...
            </h2>

            <p className="font-body text-xl md:text-2xl text-green-700 leading-relaxed">
              Walking through fields of beauty, surrounded by nature's embrace.
            </p>

            <div className="mt-8 flex items-center justify-center md:justify-start gap-3">
              <span className="text-4xl">🌿</span>
              <span className="text-4xl">🌸</span>
              <span className="text-4xl">🍃</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatingLeaf({ index }: { index: number }) {
  const positions = [
    { left: '5%', top: '10%' },
    { left: '90%', top: '20%' },
    { left: '15%', top: '60%' },
    { left: '80%', top: '70%' },
    { left: '50%', top: '5%' },
    { left: '70%', top: '40%' },
    { left: '25%', top: '85%' },
    { left: '95%', top: '50%' },
  ];

  const delays = [0, 0.7, 1.2, 0.3, 1.5, 0.9, 1.8, 0.5];
  const durations = [4, 5, 4.5, 6, 3.5, 5.5, 4, 6];

  return (
    <div
      className="absolute text-green-400 opacity-30"
      style={{
        left: positions[index].left,
        top: positions[index].top,
        animation: `float ${durations[index]}s ease-in-out infinite`,
        animationDelay: `${delays[index]}s`,
      }}
    >
      <Leaf 
        className="w-6 h-6" 
        style={{ transform: `rotate(${index * 45}deg)` }}
      />
    </div>
  );
}
