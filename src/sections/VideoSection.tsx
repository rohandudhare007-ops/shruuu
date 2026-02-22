import { useState, useRef, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function VideoSection() {
  const [sectionRef, isSectionInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#0F0A1A] to-[#1A0F2E]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top text */}
        <div className="text-center mb-12">
          <p
            className={`font-heading text-2xl md:text-3xl lg:text-4xl text-white mb-4 transition-all duration-800 ${
              isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            Some moments are too beautiful for photos...
          </p>
          <p
            className={`font-body text-xl md:text-2xl text-[#FBCFE8] transition-all duration-800 ${
              isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: '0.3s', transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
          >
            They need motion.
          </p>
        </div>

        {/* Video Container */}
        <div style={{ width: '100%', maxWidth: '420px', margin: '0 auto' }}>
          <div style={{ position: 'relative', paddingBottom: '177.78%' }}>
            <div
              className={`relative transition-all duration-1000 ${
                isSectionInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: '0.5s',
                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%'
              }}
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
            >
              {/* Glowing border frame */}
              <div className="relative rounded-3xl overflow-hidden glow-border"
                style={{
                  boxShadow: '0 0 40px rgba(157, 23, 77, 0.4), 0 20px 60px rgba(0, 0, 0, 0.5)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%'
                }}
              >
                <video
                  ref={videoRef}
                  src="videos/shravani-special.mp4"
                  className="w-full h-full object-cover"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  loop
                  playsInline
                  muted={isMuted}
                  autoPlay
                />

                {/* Controls overlay */}
                <div 
                  className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${
                    showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                >
                  {/* Play/Pause button */}
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/30 hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white ml-1" />
                    )}
                  </button>
                </div>

                {/* Mute button */}
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-white/30"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#9D174D]/30 via-[#FBCFE8]/20 to-[#9D174D]/30 rounded-[2rem] blur-2xl -z-10 opacity-60" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            </div>
          </div>
        </div>

        {/* Bottom text */}
        <p
          className={`text-center mt-12 font-body text-xl md:text-2xl text-[#D4AF37] transition-all duration-800 ${
            isSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: '0.8s', transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
        >
          I saved this because it means everything.
        </p>
      </div>
    </section>
    
  );
}
