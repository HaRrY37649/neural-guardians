
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import GlassCard from '../shared/GlassCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Database, Upload, Search, LoaderCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface AnalysisFormProps {
  onSubmit?: (data: any) => void;
  className?: string;
}

const AnalysisForm: React.FC<AnalysisFormProps> = ({ onSubmit, className }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const [contractCode, setContractCode] = useState('');
  const [fileName, setFileName] = useState('');

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSubmit) {
        onSubmit({ type: 'address', address: contractAddress });
      }
    }, 2000);
  };

  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      if (onSubmit) {
        onSubmit({ type: 'code', code: contractCode });
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
        setContractCode(event.target.result as string);
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
                <Input
                  id="contract-address"
                  placeholder="0x..."
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Enter a deployed smart contract address to analyze its security.
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <select className="bg-transparent border rounded-md px-3 py-1 text-sm">
                    <option>Ethereum Mainnet</option>
                    <option>Polygon</option>
                    <option>Binance Smart Chain</option>
                    <option>Optimism</option>
                    <option>Arbitrum</option>
                  </select>
                </div>
                
                <Button 
                  type="submit" 
                  className="ml-auto"
                  disabled={!contractAddress || isLoading}
                >
                  {isLoading ? (
                    <>
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
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
                <label htmlFor="contract-code" className="block text-sm font-medium mb-2">
                  Smart Contract Source Code
                </label>
                <Textarea
                  id="contract-code"
                  placeholder="Paste your smart contract code here..."
                  value={contractCode}
                  onChange={(e) => setContractCode(e.target.value)}
                  className="min-h-40 font-mono"
                />
              </div>
              
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
