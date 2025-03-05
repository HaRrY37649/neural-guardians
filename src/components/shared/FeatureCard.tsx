
import React from 'react';
import { LucideIcon } from 'lucide-react';
import GlassCard from './GlassCard';
import { cn } from '@/lib/utils';
import FadeIn from '../animations/FadeIn';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  variant = 'default',
  className
}) => {
  const variantStyles = {
    default: 'border-gray-200 dark:border-gray-800',
    primary: 'border-neural-primary/20 dark:border-neural-primary/30',
    secondary: 'border-neural-secondary/20 dark:border-neural-secondary/30',
    accent: 'border-neural-accent/20 dark:border-neural-accent/30'
  };

  const iconStyles = {
    default: 'text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800',
    primary: 'text-neural-primary bg-neural-primary/10',
    secondary: 'text-neural-secondary bg-neural-secondary/10',
    accent: 'text-neural-accent bg-neural-accent/10'
  };

  return (
    <FadeIn delay={delay} duration={0.6}>
      <GlassCard 
        className={cn('p-6 h-full flex flex-col', variantStyles[variant], className)}
        hoverEffect={true}
      >
        <div className={cn('rounded-full w-12 h-12 flex items-center justify-center mb-4', iconStyles[variant])}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-medium mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </GlassCard>
    </FadeIn>
  );
};

export default FeatureCard;
