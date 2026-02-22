import { useState, useRef, useEffect } from 'react';
import { IntroSection } from '@/sections/IntroSection';
import { HeroSection } from '@/sections/HeroSection';
import { GallerySection } from '@/sections/GallerySection';
import { HighlightSection } from '@/sections/HighlightSection';
import { PlayfulSection } from '@/sections/PlayfulSection';
import { NatureSection } from '@/sections/NatureSection';
import { TimelineSection } from '@/sections/TimelineSection';
import { VideoSection } from '@/sections/VideoSection';
import { SuspenseSection } from '@/sections/SuspenseSection';
import { FinalSection } from '@/sections/FinalSection';
import { ScrollProgress } from '@/components/ScrollProgress';
import { FloatingHearts } from '@/components/FloatingHearts';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showMainContent, setShowMainContent] = useState(false);
  const [showSuspense, setShowSuspense] = useState(true);
  const [showFinal, setShowFinal] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth scroll to top when intro is hidden
    if (!showIntro) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [showIntro]);

  const handleEnter = () => {
    setShowIntro(false);
    setShowMainContent(true);
  };

  const handleReveal = () => {
    setShowSuspense(false);
    setShowFinal(true);
    // Scroll to final section
    setTimeout(() => {
      const finalSection = document.getElementById('final-section');
      if (finalSection) {
        finalSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleReplay = () => {
    // Reset all states
    setShowFinal(false);
    setShowSuspense(true);
    setShowIntro(true);
    setShowMainContent(false);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Floating Hearts - Visible on all pages */}
      <FloatingHearts />

      {/* Scroll Progress Bar */}
      {!showIntro && <ScrollProgress />}

      {/* Intro Section */}
      {showIntro && <IntroSection onEnter={handleEnter} />}

      {/* Main Content */}
      {showMainContent && (
        <main ref={mainRef} className="relative">
          {/* Hero Section */}
          <HeroSection />

          {/* Photo Gallery */}
          <GallerySection />

          {/* Special Highlight */}
          <HighlightSection />

          {/* Playful Section */}
          <PlayfulSection />

          {/* Nature Section */}
          <NatureSection />

          {/* Memory Timeline */}
          <TimelineSection />

          {/* Video Section */}
          <VideoSection />

          {/* Suspense Section */}
          {showSuspense && (
            <SuspenseSection onReveal={handleReveal} />
          )}

          {/* Final Section */}
          {showFinal && (
            <div id="final-section">
              <FinalSection onReplay={handleReplay} />
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
