
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/layout/Hero';
import FadeIn from '@/components/animations/FadeIn';
import FeatureCard from '@/components/shared/FeatureCard';
import GlassCard from '@/components/shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Shield, Code, AlertTriangle, Database, Search, ArrowRight, Check, Lock, Eye, TerminalSquare, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Shield,
    title: 'AI-Powered Security',
    description: 'Advanced neural networks detect vulnerabilities that traditional scanners miss.'
  },
  {
    icon: Code,
    title: 'Smart Contract Analysis',
    description: 'Deep inspection of contract code to identify potential attack vectors.'
  },
  {
    icon: AlertTriangle,
    title: 'Risk Assessment',
    description: 'Detailed security scoring and prioritized vulnerability reports.'
  },
  {
    icon: Database,
    title: 'Multi-Chain Support',
    description: 'Support for Ethereum, Polygon, Binance Smart Chain, and more.'
  },
  {
    icon: Lock,
    title: 'Reentrancy Detection',
    description: 'Identify reentrancy vulnerabilities before they can be exploited.'
  },
  {
    icon: Eye,
    title: 'Real-time Monitoring',
    description: '24/7 surveillance of deployed contracts for new threats.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Features section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-radial from-neural-primary/5 to-transparent opacity-50" />
          
          <div className="container relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <FadeIn>
                <h2 className="text-3xl font-bold mb-4">
                  Comprehensive Smart Contract <span className="text-gradient">Protection</span>
                </h2>
                <p className="text-muted-foreground">
                  NeuralGuard combines AI technology with blockchain expertise to provide unmatched security analysis for your smart contracts.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                  variant={index % 3 === 0 ? 'primary' : index % 3 === 1 ? 'secondary' : 'accent'}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <FadeIn>
                <h2 className="text-3xl font-bold mb-4">
                  How <span className="text-gradient">NeuralGuard</span> Works
                </h2>
                <p className="text-muted-foreground">
                  Our platform uses advanced AI algorithms to analyze smart contracts and identify security vulnerabilities.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <FadeIn delay={0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-neural-primary/10 flex items-center justify-center mx-auto mb-6">
                    <Code className="h-8 w-8 text-neural-primary" />
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-neural-primary text-white rounded-full -right-1 -top-1">
                      <span className="text-xs font-bold">1</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Submit Contract</h3>
                  <p className="text-sm text-muted-foreground">
                    Upload your smart contract code or provide a deployed contract address.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-neural-secondary/10 flex items-center justify-center mx-auto mb-6">
                    <Search className="h-8 w-8 text-neural-secondary" />
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-neural-secondary text-white rounded-full -right-1 -top-1">
                      <span className="text-xs font-bold">2</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Our neural network scans the contract for vulnerabilities and security patterns.
                  </p>
                </div>
              </FadeIn>
              
              <FadeIn delay={0.3}>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-neural-accent/10 flex items-center justify-center mx-auto mb-6">
                    <Shield className="h-8 w-8 text-neural-accent" />
                    <div className="absolute flex items-center justify-center w-6 h-6 bg-neural-accent text-white rounded-full -right-1 -top-1">
                      <span className="text-xs font-bold">3</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Security Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Receive a detailed security report with actionable recommendations.
                  </p>
                </div>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.4}>
              <div className="text-center">
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Try It Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Benefits section */}
        <section className="py-20">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn direction="left">
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold">
                    Why Choose <span className="text-gradient">NeuralGuard</span>?
                  </h2>
                  <p className="text-muted-foreground">
                    NeuralGuard offers unmatched protection for your smart contracts and blockchain applications.
                  </p>
                  
                  <ul className="space-y-4">
                    {[
                      'Advanced AI vulnerability detection',
                      'Multi-blockchain compatibility',
                      'Real-time threat monitoring',
                      'Detailed remediation guidance',
                      'Competitive pricing plans',
                      '24/7 expert support'
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="mt-1 mr-3 flex-shrink-0 w-5 h-5 rounded-full bg-neural-primary/10 flex items-center justify-center">
                          <Check className="h-3 w-3 text-neural-primary" />
                        </div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button size="lg" asChild>
                    <Link to="/dashboard">
                      Get Started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </FadeIn>
              
              <FadeIn direction="right" delay={0.2}>
                <GlassCard className="p-8 rounded-2xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-neural-primary/20 rounded-full blur-2xl opacity-70" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-neural-accent/20 rounded-full blur-2xl opacity-70" />
                  
                  <div className="relative">
                    <div className="mb-6 pb-6 border-b border-border">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium">Security Score</h3>
                          <p className="text-sm text-muted-foreground">Sample Contract</p>
                        </div>
                        <div className="bg-neural-success/10 text-neural-success px-3 py-1 rounded-full text-sm font-medium flex items-center">
                          <ShieldCheck className="h-4 w-4 mr-1" />
                          Safe
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="p-4 bg-neural-primary/5 rounded-lg border border-neural-primary/10">
                        <div className="flex items-center">
                          <TrendingUp className="h-5 w-5 text-neural-primary mr-3" />
                          <div>
                            <h4 className="font-medium">Optimization Suggestion</h4>
                            <p className="text-sm text-muted-foreground">Gas optimization opportunities found</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-neural-secondary/5 rounded-lg border border-neural-secondary/10">
                        <div className="flex items-center">
                          <TerminalSquare className="h-5 w-5 text-neural-secondary mr-3" />
                          <div>
                            <h4 className="font-medium">Code Quality</h4>
                            <p className="text-sm text-muted-foreground">92% - Excellent code standards</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-neural-accent/5 rounded-lg border border-neural-accent/10">
                        <div className="flex items-center">
                          <Zap className="h-5 w-5 text-neural-accent mr-3" />
                          <div>
                            <h4 className="font-medium">Performance Impact</h4>
                            <p className="text-sm text-muted-foreground">Minimal - Contract is optimized</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 bg-neural-primary/5">
          <div className="container">
            <FadeIn>
              <GlassCard className="p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-neural-primary/10 to-neural-accent/10" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">
                    Ready to Secure Your Smart Contracts?
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
                    Join thousands of developers and companies who trust NeuralGuard to protect their blockchain applications.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="lg" asChild>
                      <Link to="/dashboard">
                        Start Free Analysis
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg">
                      View Pricing
                    </Button>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <footer className="bg-muted/30 py-12 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center gap-2">
                <div className="relative flex items-center justify-center w-8 h-8 rounded-xl bg-neural-primary text-white overflow-hidden">
                  <Shield className="w-4 h-4" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-neural-primary via-neural-secondary to-neural-accent opacity-70" />
                </div>
                <span className="text-lg font-semibold tracking-tight text-foreground">
                  Neural<span className="text-neural-primary">Guard</span>
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                AI-Powered Smart Contract Security
              </p>
            </div>
            
            <div className="flex flex-wrap gap-8 justify-center md:justify-end">
              <div>
                <h3 className="font-medium mb-2">Product</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-neural-primary transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-neural-primary transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-neural-primary transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-neural-primary transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-neural-primary transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-neural-primary transition-colors">Community</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Company</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-neural-primary transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-neural-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-neural-primary transition-colors">Careers</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2023 NeuralGuard. All rights reserved.
            </p>
            
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-neural-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-neural-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
