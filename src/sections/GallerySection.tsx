import { useInView } from '@/hooks/useInView';

const galleryImages = [
  { src: 'images/photo2.jpg', caption: 'Every picture of you feels like a masterpiece.' },
  { src: 'images/photo3.jpg', caption: 'Your smile deserves its own spotlight.' },
  { src: 'images/photo4.jpg', caption: 'In every frame, you look magical.' },
  { src: 'images/photo5.jpg', caption: 'You have a way of lighting up every moment.' },
];

export function GallerySection() {
  const [sectionRef, isSectionInView] = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 gradient-warm"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className={`font-heading text-4xl md:text-5xl text-[#9D174D] mb-4 transition-all duration-800 ${
              isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            Moments Captured
          </h2>
          <p
            className={`font-body text-lg md:text-xl text-gray-600 transition-all duration-800 ${
              isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.2s', transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            Each one tells a story of your beauty
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {galleryImages.map((image, index) => (
            <GalleryItem
              key={index}
              {...image}
              delay={0.3 + index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface GalleryItemProps {
  src: string;
  caption: string;
  delay: number;
}

function GalleryItem({ src, caption, delay }: GalleryItemProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={`group transition-all duration-800 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}s`, transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-2xl mb-6 glow-border-hover transition-all duration-500">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={src}
            alt="Shravani"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#9D174D]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Caption */}
      <p className="font-body text-center text-lg md:text-xl text-gray-700 italic">
        "{caption}"
      </p>
    </div>
  );
}
