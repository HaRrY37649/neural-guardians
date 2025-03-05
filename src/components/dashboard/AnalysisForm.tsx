
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '../shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Database, Upload, Search, LoaderCircle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface AnalysisFormProps {
  onSubmit?: (data: any) => void;
  className?: string;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [contractCode, setContractCode] = useState('');
  const [fileName, setFileName] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [validationStatus, setValidationStatus] = useState<'idle' | 'validating' | 'valid' | 'invalid'>('idle');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const { toast } = useToast();
  const [selectedNetwork, setSelectedNetwork] = useState('ethereum');

  // Reset validation when input changes
  useEffect(() => {
    if (contractAddress) {
      setValidationStatus('idle');
      setValidationMessage('');
    }
  }, [contractAddress]);

  // Simulate validation of contract address
  const validateContractAddress = () => {
    if (!contractAddress) return;
    
    setValidationStatus('validating');
    setValidationMessage('Validating contract address...');
    
    // Simulate API call for validation
    setTimeout(() => {
      if (contractAddress.startsWith('0x') && contractAddress.length === 42) {
        setValidationStatus('valid');
        setValidationMessage('Valid contract address');
        
        // Generate AI suggestions for this contract
        const suggestions = [
          'This contract appears to be a DEX liquidity pool',
          'Consider checking for reentrancy vulnerabilities',
          'Analyze state variable initialization'
        ];
        setAiSuggestions(suggestions);
      } else {
        setValidationStatus('invalid');
        setValidationMessage('Invalid contract address format');
        setAiSuggestions([]);
      }
    }, 1000);
  };
  
  // Dynamic network options
  const networks = [
    { id: 'ethereum', name: 'Ethereum Mainnet', icon: '🔷' },
    { id: 'polygon', name: 'Polygon', icon: '🟣' },
    { id: 'bsc', name: 'Binance Smart Chain', icon: '🟡' },
    { id: 'optimism', name: 'Optimism', icon: '🔴' },
    { id: 'arbitrum', name: 'Arbitrum', icon: '🔵' },
    { id: 'solana', name: 'Solana', icon: '🟪' },
  ];

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validationStatus !== 'valid' && contractAddress) {
      validateContractAddress();
      return;
    }
    
    setIsLoading(true);
    
    // Show toast before starting analysis
    toast({
      title: "Analysis started",
      description: `Analyzing contract on ${networks.find(n => n.id === selectedNetwork)?.name}`,
    });
    
    // Simulate AI analysis process
    setTimeout(() => {
      setIsLoading(false);
      if (onSubmit) {
        onSubmit({ 
          type: 'address', 
          address: contractAddress,
          network: selectedNetwork,
          aiSuggestions
        });
      }
    }, 2000);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contractCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter or upload some contract code",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Show toast for code analysis
    toast({
      title: "Code analysis started",
      description: `AI analyzing ${fileName || 'your contract code'}`,
    });
    
    // Simulate AI code analysis
    setTimeout(() => {
      setIsLoading(false);
      if (onSubmit) {
        onSubmit({ 
          type: 'code', 
          code: contractCode,
          fileName: fileName || 'unnamed-contract.sol'
        });
      }
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setFileName(file.name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const content = event.target.result as string;
        setContractCode(content);
        
        // Auto-detect potential contract issues
        const aiDetectedPatterns = [];
        if (content.includes('selfdestruct')) {
          aiDetectedPatterns.push('Contains selfdestruct - high risk');
        }
        if (content.includes('delegatecall')) {
          aiDetectedPatterns.push('Uses delegatecall - review carefully');
        }
        if (content.toLowerCase().includes('owner')) {
          aiDetectedPatterns.push('Owner pattern detected - check access controls');
        }
        
        if (aiDetectedPatterns.length > 0) {
          toast({
            title: "AI Initial Detection",
            description: `Detected ${aiDetectedPatterns.length} potential points of interest`,
          });
          setAiSuggestions(aiDetectedPatterns);
        }
      }
    };
    reader.readAsText(file);
  };

  return (
    <GlassCard className={cn('overflow-hidden', className)}>
      <div className="p-6">
        <h2 className="text-lg font-medium mb-4">Analyze Smart Contract</h2>
        
        <Tabs defaultValue="address" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="address" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>Contract Address</span>
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              <span>Source Code</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="address">
            <form onSubmit={handleAddressSubmit}>
              <div className="mb-4">
                <label htmlFor="contract-address" className="block text-sm font-medium mb-2">
                  Smart Contract Address
                </label>
                <div className="relative">
                  <Input
                    id="contract-address"
                    placeholder="0x..."
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    className={cn(
                      "w-full pr-10",
                      validationStatus === 'valid' && "border-neural-success focus-visible:ring-neural-success/20",
                      validationStatus === 'invalid' && "border-neural-danger focus-visible:ring-neural-danger/20"
                    )}
                    onBlur={validateContractAddress}
                  />
                  {validationStatus === 'validating' && (
                    <LoaderCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                  {validationStatus === 'valid' && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neural-success" />
                  )}
                  {validationStatus === 'invalid' && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neural-danger" />
                  )}
                </div>
                {validationMessage && (
                  <p className={cn(
                    "text-xs mt-2",
                    validationStatus === 'valid' && "text-neural-success",
                    validationStatus === 'invalid' && "text-neural-danger",
                    validationStatus === 'validating' && "text-muted-foreground"
                  )}>
                    {validationMessage}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  Enter a deployed smart contract address to analyze its security.
                </p>
              </div>
              
              {aiSuggestions.length > 0 && (
                <div className="mb-4 p-3 bg-muted/30 rounded-md border border-border">
                  <h4 className="text-sm font-medium mb-2">AI Initial Insights:</h4>
                  <ul className="space-y-1">
                    {aiSuggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-neural-primary mt-1.5"></span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                <div>
                  <label htmlFor="network-select" className="text-xs font-medium text-muted-foreground mb-1 block">
                    Blockchain Network
                  </label>
                  <select 
                    id="network-select"
                    className="bg-background border rounded-md px-3 py-1 text-sm w-full sm:w-auto"
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                  >
                    {networks.map(network => (
                      <option key={network.id} value={network.id}>
                        {network.icon} {network.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="sm:ml-auto w-full sm:w-auto"
                  disabled={!contractAddress || isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : validationStatus !== 'valid' && contractAddress ? (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Validate Address
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Contract
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="code">
            <form onSubmit={handleCodeSubmit}>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="contract-code" className="block text-sm font-medium">
                    Smart Contract Source Code
                  </label>
                  {fileName && (
                    <Badge variant="outline" className="text-xs font-mono">
                      {fileName}
                    </Badge>
                  )}
                </div>
                <Textarea
                  id="contract-code"
                  placeholder="Paste your smart contract code here..."
                  value={contractCode}
                  onChange={(e) => setContractCode(e.target.value)}
                  className="min-h-40 font-mono"
                />
              </div>
              
              {aiSuggestions.length > 0 && (
                <div className="mb-4 p-3 bg-muted/30 rounded-md border border-border">
                  <h4 className="text-sm font-medium mb-2">AI Initial Detection:</h4>
                  <ul className="space-y-1">
                    {aiSuggestions.map((suggestion, idx) => (
                      <li key={idx} className="text-xs flex items-start gap-2">
                        <span className="inline-block w-1 h-1 rounded-full bg-neural-primary mt-1.5"></span>
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-6">
                <div className="flex-1">
                  <div className="relative">
                    <Button variant="outline" className="w-full sm:w-auto" type="button">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Contract File
                    </Button>
                    <input 
                      type="file" 
                      className="absolute inset-0 opacity-0 cursor-pointer" 
                      accept=".sol,.vy,.json"
                      onChange={handleFileUpload}
                    />
                  </div>
                  {fileName && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Selected: {fileName}
                    </p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="sm:ml-auto w-full sm:w-auto"
                  disabled={!contractCode || isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Analyze Code
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </GlassCard>
  );
};

export default AnalysisForm;
