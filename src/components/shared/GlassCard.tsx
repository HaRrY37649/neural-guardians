
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'bordered' | 'minimal';
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({
  children,
  variant = 'default',
  intensity = 'medium',
  className,
  hoverEffect = true,
  ...props
}) => {
  const baseStyles = 'relative overflow-hidden rounded-2xl transition-all duration-300';
  
  const intensityMap = {
    light: 'backdrop-blur-sm bg-white/40 dark:bg-neural-dark/40 shadow-sm',
    medium: 'backdrop-blur-md bg-white/60 dark:bg-neural-dark/60 shadow-md',
    heavy: 'backdrop-blur-lg bg-white/80 dark:bg-neural-dark/80 shadow-lg'
  };
  
  const variantMap = {
    default: `${intensityMap[intensity]} border border-white/20 dark:border-white/10`,
    elevated: `${intensityMap[intensity]} border border-white/30 dark:border-white/10 shadow-xl`,
    bordered: `${intensityMap[intensity]} border-2 border-neural-primary/20 dark:border-neural-primary/30`,
    minimal: 'backdrop-blur-sm bg-white/20 dark:bg-neural-dark/20 shadow-sm border border-transparent'
  };

  const hoverStyles = hoverEffect 
    ? 'hover:shadow-xl hover:scale-[1.01] hover:bg-white/70 dark:hover:bg-neural-dark/70 hover:border-white/30 dark:hover:border-white/20' 
    : '';

  return (
    <div 
      className={cn(baseStyles, variantMap[variant], hoverStyles, className)}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
