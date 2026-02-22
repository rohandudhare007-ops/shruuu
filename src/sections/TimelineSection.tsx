import { useInView } from '@/hooks/useInView';

const memories = [
  {
    image: 'images/memory1.jpg',
    title: '"ufffff" i melt when i saw you',
    description: 'That moment when your smile lit up everything around you.'
  },
  {
    image: 'images/memory2.jpg',
    title: 'najar nahi hatati tumse',
    description: 'A memory so beautiful, it became permanently etched in my heart.'
  },
  {
    image: 'images/memory3.jpg',
    title: 'i really fall for you when i saw you',
    description: 'Perfection in every expression, beauty in every glance.',
  },
];

export function TimelineSection() {
  const [sectionRef, isSectionInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-[#0F0A1A]"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF5F7] via-[#0F0A1A] to-[#0F0A1A] h-32" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2
            className={`font-heading text-4xl md:text-5xl text-white mb-4 transition-all duration-800 ${
              isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            Pookie Timeline...
          </h2>
          <p
            className={`font-body text-lg md:text-xl text-[#FBCFE8] transition-all duration-800 ${
              isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s', transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            cutiee 💖
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full">
            <div 
              className="w-full h-full"
              style={{
                background: 'linear-gradient(to bottom, transparent, #9D174D, #FBCFE8, #9D174D, transparent)',
              }}
            />
          </div>

          {/* Timeline items */}
          <div className="space-y-16 md:space-y-24">
            {memories.map((memory, index) => (
              <TimelineItem
                key={index}
                {...memory}
                isLeft={index % 2 === 0}
                delay={0.3 + index * 0.3}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  image: string;
  title: string;
  description: string;
  isLeft: boolean;
  delay: number;
}

function TimelineItem({ image, title, description, isLeft, delay }: TimelineItemProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-col gap-8 md:gap-0`}
    >
      {/* Content side */}
      <div
        className={`w-full md:w-1/2 ${isLeft ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'} text-center transition-all duration-800 ${
          isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? '-translate-x-10' : 'translate-x-10'}`
        }`}
        style={{ transitionDelay: `${delay}s`, transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <h3 className="font-heading text-2xl md:text-3xl text-[#FBCFE8] mb-3">
          {title}
        </h3>
        <p className="font-body text-lg text-gray-300">
          {description}
        </p>
      </div>

      {/* Center dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
        <div 
          className={`w-4 h-4 rounded-full bg-[#9D174D] border-2 border-[#FBCFE8] transition-all duration-500 ${
            isInView ? 'scale-100' : 'scale-0'
          }`}
          style={{ transitionDelay: `${delay + 0.2}s` }}
        />
      </div>

      {/* Image side */}
      <div
        className={`w-full md:w-1/2 ${isLeft ? 'md:pl-16' : 'md:pr-16'} transition-all duration-800 ${
          isInView ? 'opacity-100 translate-x-0' : `opacity-0 ${isLeft ? 'translate-x-10' : '-translate-x-10'}`
        }`}
        style={{ transitionDelay: `${delay + 0.15}s`, transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <div className="relative group">
          <div className="aspect-[4/5] max-w-sm mx-auto rounded-2xl overflow-hidden glow-border-hover">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          {/* Glow effect */}
          <div className="absolute -inset-2 bg-gradient-to-r from-[#9D174D]/20 to-[#FBCFE8]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </div>
      </div>
    </div>
  );
}
