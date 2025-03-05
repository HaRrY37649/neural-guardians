
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight, ShieldCheck, Code, AlertTriangle, Database } from 'lucide-react';
import FadeIn from '../animations/FadeIn';
import { cn } from '@/lib/utils';

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className }) => {
  return (
    <section className={cn('relative py-20 overflow-hidden', className)}>
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.08]" />
      
      {/* Content container */}
      <div className="container relative z-10 pt-20 pb-16 md:pt-24 md:pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center">
            {/* Eyebrow tag */}
            <FadeIn duration={0.6}>
              <div className="inline-flex items-center px-3 py-1 text-sm font-medium text-neural-primary bg-neural-primary/10 rounded-full mb-8">
                <ShieldCheck className="w-4 h-4 mr-2" />
                <span>AI-Powered Smart Contract Security</span>
              </div>
            </FadeIn>

            {/* Headline */}
            <FadeIn duration={0.7} delay={0.1}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                <span className="text-gradient">Neural</span>Guard: Secure Your <br className="hidden md:block" />
                <span className="text-gradient">Smart Contracts</span> with AI
              </h1>
            </FadeIn>

            {/* Description */}
            <FadeIn duration={0.7} delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
                Powerful AI security analysis that detects vulnerabilities in smart contracts across multiple blockchains,
                providing real-time risk assessment and detailed remediation guidance.
              </p>
            </FadeIn>

            {/* CTA buttons */}
            <FadeIn duration={0.7} delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Demo
                </Button>
              </div>
            </FadeIn>

            {/* Stats section */}
            <FadeIn duration={0.7} delay={0.4}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-border">
                <div>
                  <p className="text-3xl font-bold text-gradient">1.2M+</p>
                  <p className="text-sm text-muted-foreground">Contracts Analyzed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gradient">97%</p>
                  <p className="text-sm text-muted-foreground">Detection Accuracy</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gradient">$540M+</p>
                  <p className="text-sm text-muted-foreground">Assets Protected</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-gradient">24/7</p>
                  <p className="text-sm text-muted-foreground">Real-time Monitoring</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-1/3 left-12 w-64 h-64 bg-neural-primary/20 rounded-full blur-3xl opacity-30 animate-float" />
      <div className="absolute bottom-1/4 right-12 w-72 h-72 bg-neural-accent/20 rounded-full blur-3xl opacity-30 animate-float" style={{ animationDelay: "1.5s" }} />
    </section>
  );
};

export default Hero;
