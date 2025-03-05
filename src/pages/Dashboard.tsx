
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import AnalysisForm from '@/components/dashboard/AnalysisForm';
import SecurityScore from '@/components/dashboard/SecurityScore';
import VulnerabilityCard, { Vulnerability } from '@/components/dashboard/VulnerabilityCard';
import UserProfile from '@/components/dashboard/UserProfile';
import GlassCard from '@/components/shared/GlassCard';
import FadeIn from '@/components/animations/FadeIn';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Clock, FileText, Shield, RefreshCw, Copy, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import AIRecommendations from '@/components/dashboard/AIRecommendations';
import AIAuditReport from '@/components/dashboard/AIAuditReport';
import { useToast } from '@/hooks/use-toast';

// Sample data for demonstration
const sampleVulnerabilities: Vulnerability[] = [
  {
    id: 'v1',
    title: 'Reentrancy Vulnerability',
    description: 'The contract is vulnerable to reentrancy attacks due to state changes after external calls.',
    severity: 'critical',
    lineNumber: 42,
    codeSnippet: 'function withdraw(uint amount) external {\n  require(balances[msg.sender] >= amount);\n  (bool success, ) = msg.sender.call{value: amount}("");\n  require(success);\n  balances[msg.sender] -= amount;\n}',
    recommendation: 'Update state variables before making external calls. Consider using the checks-effects-interactions pattern or a reentrancy guard.'
  },
  {
    id: 'v2',
    title: 'Unchecked External Call',
    description: 'External call does not check the return value, which could lead to silent failures.',
    severity: 'high',
    lineNumber: 78,
    codeSnippet: 'function distributeFees() external {\n  feeReceiver.call{value: address(this).balance}("");\n}',
    recommendation: 'Check the return value of the external call and handle any failures appropriately.'
  },
  {
    id: 'v3',
    title: 'Integer Overflow',
    description: 'Potential integer overflow in arithmetic operation that could lead to unexpected behavior.',
    severity: 'medium',
    lineNumber: 103,
    codeSnippet: 'function addReward(uint amount) external {\n  totalRewards += amount;\n}',
    recommendation: 'Use SafeMath library or Solidity 0.8.x built-in overflow checks for arithmetic operations.'
  },
  {
    id: 'v4',
    title: 'Unprotected Function',
    description: 'Critical function lacks proper access control, allowing unauthorized calls.',
    severity: 'high',
    lineNumber: 125,
    codeSnippet: 'function setFeeReceiver(address newReceiver) external {\n  feeReceiver = newReceiver;\n}',
    recommendation: 'Add appropriate access control modifiers like onlyOwner or onlyRole to restrict function access.'
  },
  {
    id: 'v5',
    title: 'Gas Optimization',
    description: 'Storage variable could be changed to memory for gas optimization.',
    severity: 'low',
    lineNumber: 167,
    codeSnippet: 'function getAddresses() external view returns (address[] storage) {\n  return userAddresses;\n}',
    recommendation: 'Consider using memory instead of storage when returning arrays to save gas.'
  }
];

// Sample AI recommendations
const sampleRecommendations = [
  {
    id: 'rec1',
    title: 'Add reentrancy guard to withdraw function',
    description: 'Implement a nonReentrant modifier to prevent reentrancy attacks in the withdraw function.',
    impact: 'high' as const,
    type: 'improvement' as const
  },
  {
    id: 'rec2',
    title: 'Improve access control',
    description: 'Add role-based access control for administrative functions.',
    impact: 'medium' as const,
    type: 'warning' as const
  },
  {
    id: 'rec3',
    title: 'Use SafeMath for arithmetic operations',
    description: 'Consider using SafeMath library or Solidity 0.8.x to prevent overflow/underflow.',
    impact: 'medium' as const,
    type: 'info' as const
  },
  {
    id: 'rec4',
    title: 'Optimize gas usage',
    description: 'Use memory instead of storage when returning arrays to save gas.',
    impact: 'low' as const,
    type: 'improvement' as const
  }
];

const Dashboard = () => {
  const [score, setScore] = useState(65);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(sampleVulnerabilities);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [contractAddress, setContractAddress] = useState('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
  const [contractName, setContractName] = useState('TokenSale');
  const [activeTab, setActiveTab] = useState('analysis');
  const [recommendations, setRecommendations] = useState(sampleRecommendations);
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleAnalysisSubmit = (data: any) => {
    // Simulate AI processing
    toast({
      title: "AI Analysis Started",
      description: "Our neural networks are analyzing your contract...",
    });
    
    // Simulate API response
    setContractAddress(data.type === 'address' ? data.address : '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
    setContractName(data.fileName || 'TokenSale');
    
    // Generate a dynamic score based on random factors
    const dynamicScore = Math.floor(Math.random() * 30) + 60; // Random score between 60-90
    setScore(dynamicScore);
    
    // Adjust vulnerabilities based on score
    const criticalCount = dynamicScore < 70 ? 1 : 0;
    const highCount = dynamicScore < 80 ? 2 : 1;
    
    // Filter vulnerabilities based on the random score
    const filteredVulnerabilities = sampleVulnerabilities.filter((v, index) => {
      if (v.severity === 'critical' && index >= criticalCount) return false;
      if (v.severity === 'high' && index >= highCount + criticalCount) return false;
      return true;
    });
    
    setVulnerabilities(filteredVulnerabilities);
    
    // Generate AI recommendations based on the analysis
    const aiRecsCount = Math.max(2, Math.floor((100 - dynamicScore) / 10));
    setRecommendations(sampleRecommendations.slice(0, aiRecsCount));
    
    setIsAnalyzed(true);
    setActiveTab('results');
  };

  const refreshRecommendations = () => {
    setIsLoadingRecommendations(true);
    
    // Simulate API call for new recommendations
    setTimeout(() => {
      // Add a new recommendation
      const newRec = {
        id: `rec${Date.now()}`,
        title: 'Update to latest compiler version',
        description: 'Consider updating to Solidity 0.8.x to benefit from built-in overflow checks.',
        impact: 'low' as const,
        type: 'info' as const
      };
      
      setRecommendations(prev => [newRec, ...prev.slice(0, 3)]);
      setIsLoadingRecommendations(false);
      
      toast({
        title: "Recommendations Updated",
        description: "AI has generated fresh recommendations for your contract.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container">
          <div className="mb-8">
            <FadeIn>
              <h1 className="text-3xl font-bold mb-2">Security Dashboard</h1>
              <p className="text-muted-foreground">
                Analyze and monitor your smart contracts for vulnerabilities
              </p>
            </FadeIn>
          </div>
          
          <Tabs defaultValue="analysis" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-md mb-6">
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="analysis">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <FadeIn>
                    <AnalysisForm onSubmit={handleAnalysisSubmit} />
                  </FadeIn>
                </div>
                
                <div>
                  <FadeIn delay={0.1}>
                    <GlassCard className="p-6">
                      <h2 className="text-lg font-medium mb-4">Recent Analyses</h2>
                      
                      <div className="space-y-4">
                        <div className="p-3 rounded-lg border border-border flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-neural-primary/10 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-neural-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">0x7a25...2488D</p>
                              <p className="text-xs text-muted-foreground">3 hours ago</p>
                            </div>
                          </div>
                          <div className="bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full text-xs">
                            73/100
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg border border-border flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-neural-primary/10 flex items-center justify-center">
                              <FileText className="w-4 h-4 text-neural-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">TokenSale.sol</p>
                              <p className="text-xs text-muted-foreground">Yesterday</p>
                            </div>
                          </div>
                          <div className="bg-neural-success/10 text-neural-success px-2 py-1 rounded-full text-xs">
                            92/100
                          </div>
                        </div>
                        
                        <div className="p-3 rounded-lg border border-border flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-neural-primary/10 flex items-center justify-center">
                              <Clock className="w-4 h-4 text-neural-primary" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">0x8b3f...9a23B</p>
                              <p className="text-xs text-muted-foreground">2 days ago</p>
                            </div>
                          </div>
                          <div className="bg-neural-danger/10 text-neural-danger px-2 py-1 rounded-full text-xs">
                            45/100
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="ghost" className="w-full mt-4 text-sm">
                        View All History
                      </Button>
                    </GlassCard>
                  </FadeIn>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="results">
              {isAnalyzed ? (
                <FadeIn>
                  <GlassCard className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-xl font-medium mb-1">Analysis Results</h2>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">Contract:</p>
                          <div className="flex items-center gap-1.5">
                            <code className="text-sm bg-muted/50 px-2 py-0.5 rounded">{contractAddress}</code>
                            <button className="text-muted-foreground hover:text-foreground" onClick={() => {
                              navigator.clipboard.writeText(contractAddress);
                              toast({ title: "Address copied to clipboard" });
                            }}>
                              <Copy className="h-3.5 w-3.5" />
                            </button>
                            <a href="#" className="text-muted-foreground hover:text-foreground">
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <Button variant="outline" size="sm" className="flex gap-2">
                          <Download className="h-4 w-4" />
                          Export Report
                        </Button>
                        <Button variant="outline" size="sm" className="flex gap-2" onClick={() => setActiveTab('analysis')}>
                          <RefreshCw className="h-4 w-4" />
                          Re-analyze
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-1">
                          <SecurityScore score={score} />
                        </div>
                        
                        <div className="md:col-span-3">
                          <GlassCard className="h-full p-6">
                            <h3 className="text-lg font-medium mb-4">Security Summary</h3>
                            
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="p-4 rounded-lg bg-neural-danger/10 text-center">
                                  <p className="text-2xl font-bold text-neural-danger">{vulnerabilities.filter(v => v.severity === 'critical').length}</p>
                                  <p className="text-sm">Critical</p>
                                </div>
                                
                                <div className="p-4 rounded-lg bg-orange-500/10 text-center">
                                  <p className="text-2xl font-bold text-orange-500">{vulnerabilities.filter(v => v.severity === 'high').length}</p>
                                  <p className="text-sm">High</p>
                                </div>
                                
                                <div className="p-4 rounded-lg bg-yellow-500/10 text-center">
                                  <p className="text-2xl font-bold text-yellow-500">{vulnerabilities.filter(v => v.severity === 'medium').length}</p>
                                  <p className="text-sm">Medium</p>
                                </div>
                                
                                <div className="p-4 rounded-lg bg-neural-success/10 text-center">
                                  <p className="text-2xl font-bold text-neural-success">{vulnerabilities.filter(v => v.severity === 'low').length}</p>
                                  <p className="text-sm">Low</p>
                                </div>
                              </div>
                              
                              <div className="p-4 border border-border rounded-lg">
                                <h4 className="font-medium mb-2">Key Findings</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                  {vulnerabilities.some(v => v.severity === 'critical') && (
                                    <li>Contract contains critical reentrancy vulnerability</li>
                                  )}
                                  {vulnerabilities.filter(v => v.severity === 'high').length > 0 && (
                                    <li>{vulnerabilities.filter(v => v.severity === 'high').length} high-risk issues related to access control</li>
                                  )}
                                  {(vulnerabilities.filter(v => v.severity === 'medium').length > 0 || 
                                    vulnerabilities.filter(v => v.severity === 'low').length > 0) && (
                                    <li>Several medium and low risk items requiring attention</li>
                                  )}
                                  <li>Overall code quality is {score > 80 ? 'good' : score > 60 ? 'moderate' : 'poor'}, {score > 80 ? 'minimal improvements needed' : 'needs improvements'}</li>
                                </ul>
                              </div>
                            </div>
                          </GlassCard>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium mb-4">Identified Vulnerabilities</h3>
                        <div className="space-y-4">
                          {vulnerabilities.map((vulnerability) => (
                            <VulnerabilityCard key={vulnerability.id} vulnerability={vulnerability} />
                          ))}
                        </div>
                      </div>
                      
                      <div className="md:col-span-1">
                        <AIRecommendations 
                          recommendations={recommendations}
                          isLoading={isLoadingRecommendations}
                          onRefresh={refreshRecommendations}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <AIAuditReport 
                        contractAddress={contractAddress}
                        contractName={contractName}
                        findings={{
                          critical: vulnerabilities.filter(v => v.severity === 'critical').length,
                          high: vulnerabilities.filter(v => v.severity === 'high').length,
                          medium: vulnerabilities.filter(v => v.severity === 'medium').length,
                          low: vulnerabilities.filter(v => v.severity === 'low').length,
                          informational: vulnerabilities.filter(v => v.severity === 'low').length > 0 ? 2 : 0
                        }}
                      />
                    </div>
                  </GlassCard>
                </FadeIn>
              ) : (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Analysis Results Yet</h3>
                  <p className="text-muted-foreground mb-6">Submit a contract for analysis to see results</p>
                  <Button onClick={() => setActiveTab('analysis')}>Go to Analysis</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 gap-6">
                <UserProfile />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
