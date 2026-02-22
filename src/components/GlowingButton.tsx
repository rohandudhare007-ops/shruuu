import type { ButtonHTMLAttributes } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlowingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const GlowingButton = forwardRef<HTMLButtonElement, GlowingButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = 'font-accent font-semibold rounded-full transition-all duration-300 ease-out';
    
    const variants = {
      primary: cn(
        'bg-gradient-to-r from-[#9D174D] to-[#BE185D] text-white',
        'btn-glow hover:scale-105',
        'border-0'
      ),
      secondary: cn(
        'bg-transparent border-2 border-[#9D174D] text-[#9D174D]',
        'hover:bg-gradient-to-r hover:from-[#9D174D] hover:to-[#BE185D]',
        'hover:text-white hover:border-transparent',
        'transition-all duration-300'
      ),
    };

    const sizes = {
      sm: 'px-6 py-2 text-sm',
      md: 'px-10 py-3 text-base',
      lg: 'px-12 py-4 text-lg',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

GlowingButton.displayName = 'GlowingButton';
