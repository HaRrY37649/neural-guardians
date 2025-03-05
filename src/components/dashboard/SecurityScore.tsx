
import React from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '../shared/GlassCard';
import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';

interface SecurityScoreProps {
  score: number;
  className?: string;
}

const SecurityScore: React.FC<SecurityScoreProps> = ({ score, className }) => {
  const getColorByScore = (score: number) => {
    if (score >= 80) return 'text-neural-success';
    if (score >= 60) return 'text-yellow-500';
    return 'text-neural-danger';
  };

  const getBackgroundByScore = (score: number) => {
    if (score >= 80) return 'bg-neural-success/10';
    if (score >= 60) return 'bg-yellow-500/10';
    return 'bg-neural-danger/10';
  };

  const getIconByScore = (score: number) => {
    if (score >= 80) return <ShieldCheck className="w-6 h-6" />;
    if (score >= 60) return <Shield className="w-6 h-6" />;
    return <ShieldAlert className="w-6 h-6" />;
  };

  const getSeverityText = (score: number) => {
    if (score >= 80) return 'Low Risk';
    if (score >= 60) return 'Medium Risk';
    return 'High Risk';
  };

  return (
    <GlassCard className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium">Security Score</h3>
        <div className={cn('flex items-center gap-2 px-3 py-1 rounded-full text-sm', getBackgroundByScore(score), getColorByScore(score))}>
          {getIconByScore(score)}
          <span>{getSeverityText(score)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-center my-4">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Progress ring */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-muted/20"
            />
            {/* Score ring */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * score) / 100}
              className={getColorByScore(score)}
              strokeLinecap="round"
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-4xl font-bold', getColorByScore(score))}>{score}</span>
            <span className="text-sm text-muted-foreground">out of 100</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mt-6">
        <div className="flex items-center justify-between">
          <span className="text-sm">Reentrancy</span>
          <span className={cn('text-sm font-medium', score >= 90 ? 'text-neural-success' : 'text-yellow-500')}>
            {score >= 90 ? 'Secure' : 'Potential Risk'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Access Control</span>
          <span className={cn('text-sm font-medium', score >= 80 ? 'text-neural-success' : 'text-neural-danger')}>
            {score >= 80 ? 'Secure' : 'Vulnerable'}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm">Oracle Manipulation</span>
          <span className={cn('text-sm font-medium', score >= 75 ? 'text-neural-success' : 'text-yellow-500')}>
            {score >= 75 ? 'Secure' : 'Potential Risk'}
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default SecurityScore;
