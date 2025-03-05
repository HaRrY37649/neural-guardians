
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

const Dashboard = () => {
  const [score, setScore] = useState(65);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(sampleVulnerabilities);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [contractAddress, setContractAddress] = useState('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
  const [activeTab, setActiveTab] = useState('analysis');
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleAnalysisSubmit = (data: any) => {
    // Simulate API response
    setContractAddress(data.type === 'address' ? data.address : '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D');
    setScore(Math.floor(Math.random() * 30) + 60); // Random score between 60-90
    setIsAnalyzed(true);
    setActiveTab('results');
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
                            <button className="text-muted-foreground hover:text-foreground">
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
                        <Button variant="outline" size="sm" className="flex gap-2">
                          <RefreshCw className="h-4 w-4" />
                          Re-analyze
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
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
                                <li>Contract contains critical reentrancy vulnerability</li>
                                <li>Two high-risk issues related to access control</li>
                                <li>Several medium and low risk items requiring attention</li>
                                <li>Overall code quality is moderate, needs improvements</li>
                              </ul>
                            </div>
                          </div>
                        </GlassCard>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-4">Identified Vulnerabilities</h3>
                      
                      <div className="space-y-4">
                        {vulnerabilities.map((vulnerability) => (
                          <VulnerabilityCard key={vulnerability.id} vulnerability={vulnerability} />
                        ))}
                      </div>
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
