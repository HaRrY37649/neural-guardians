
import React from 'react';
import GlassCard from '../shared/GlassCard';
import { BrainCircuit, AlertTriangle, ShieldCheck, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  type: 'improvement' | 'warning' | 'info';
}

interface AIRecommendationsProps {
  recommendations: Recommendation[];
  isLoading?: boolean;
  onRefresh?: () => void;
  className?: string;
}

const AIRecommendations: React.FC<AIRecommendationsProps> = ({
  recommendations,
  isLoading = false,
  onRefresh,
  className
}) => {
  // Helper function to get appropriate icon based on recommendation type
  const getIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-neural-danger" />;
      case 'improvement':
        return <ShieldCheck className="h-4 w-4 text-neural-success" />;
      case 'info':
      default:
        return <BrainCircuit className="h-4 w-4 text-neural-primary" />;
    }
  };

  // Helper function to get appropriate styling based on impact
  const getImpactStyles = (impact: Recommendation['impact']) => {
    switch (impact) {
      case 'high':
        return 'bg-neural-danger/10 text-neural-danger border-neural-danger/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low':
      default:
        return 'bg-neural-success/10 text-neural-success border-neural-success/20';
    }
  };

  return (
    <GlassCard className={cn('p-6', className)}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-neural-primary" />
          <h3 className="text-lg font-medium">AI Recommendations</h3>
        </div>
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="h-8 px-2"
          >
            <RotateCw className={cn("h-3.5 w-3.5 mr-1", isLoading && "animate-spin")} />
            <span className="text-xs">Refresh</span>
          </Button>
        )}
      </div>

      {recommendations.length === 0 ? (
        <div className="text-center py-8">
          <BrainCircuit className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">
            No AI recommendations available yet.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div 
              key={rec.id} 
              className="p-3 rounded-lg border border-border bg-background/50 hover:bg-background transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getIcon(rec.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-medium">{rec.title}</h4>
                    <span className={cn(
                      "text-xs px-2 py-0.5 rounded-full",
                      getImpactStyles(rec.impact)
                    )}>
                      {rec.impact.charAt(0).toUpperCase() + rec.impact.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default AIRecommendations;
