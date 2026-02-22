import { useEffect, useState } from 'react';

interface AnimatedTextProps {
  text: string;
  delay?: number;
  wordDelay?: number;
  className?: string;
  type?: 'line' | 'word' | 'character';
}

export function AnimatedText({
  text,
  delay = 0,
  wordDelay = 0.3,
  className = '',
  type = 'word',
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  if (type === 'line') {
    return (
      <div
        className={`transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        } ${className}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        {text}
      </div>
    );
  }

  const items = type === 'word' ? text.split(' ') : text.split('');

  return (
    <span className={className}>
      {items.map((item, index) => (
        <span
          key={index}
          className={`inline-block transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{
            transitionDelay: `${index * wordDelay}s`,
            transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            marginRight: type === 'word' ? '0.25em' : '0',
          }}
        >
          {item}
        </span>
      ))}
    </span>
  );
}
