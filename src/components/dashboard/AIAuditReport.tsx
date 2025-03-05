
import React, { useState } from 'react';
import GlassCard from '../shared/GlassCard';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, FileText, Download, Copy, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface AIAuditReportProps {
  contractAddress?: string;
  contractName?: string;
  findings: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
  };
  className?: string;
}

const AIAuditReport: React.FC<AIAuditReportProps> = ({
  contractAddress,
  contractName = "Smart Contract",
  findings,
  className
}) => {
  const [activeTab, setActiveTab] = useState('summary');
  const { toast } = useToast();
  
  // Mock report content
  const reportSections = {
    summary: `This AI-generated security audit report provides an overview of potential security vulnerabilities and code quality issues in the analyzed smart contract.
    
The contract was analyzed for common vulnerabilities including reentrancy, access control issues, arithmetic operations, and other known attack vectors.

${findings.critical > 0 ? '⚠️ Critical issues were found that require immediate attention.' : '✅ No critical vulnerabilities were identified.'}

Our recommendation is to ${findings.critical + findings.high > 0 ? 'address all critical and high severity issues before deployment' : 'proceed with caution, addressing the issues identified in this report'}.`,

    vulnerabilities: `# Vulnerability Details

## Reentrancy
- ${findings.critical > 0 ? 'Critical: External calls made before state changes' : 'No reentrancy vulnerabilities detected'}

## Access Control
- ${findings.high > 0 ? 'High: Insufficient privilege checks in sensitive functions' : 'No access control issues detected'}

## Arithmetic Operations
- ${findings.medium > 0 ? 'Medium: Potential integer overflow/underflow in calculations' : 'Safe arithmetic operations with proper checks'}

## Gas Optimization
- ${findings.low > 0 ? 'Low: Inefficient storage usage increasing gas costs' : 'Efficient gas usage detected'}

## Best Practices
- ${findings.informational > 0 ? 'Informational: Code could benefit from better documentation' : 'Good adherence to best practices'}`,

    code: `// This is a simplified representation of the analyzed code with issue markers

contract ${contractName.replace(/[^a-zA-Z0-9]/g, '')} {
  // CRITICAL: Potential reentrancy vulnerability
  function withdraw(uint amount) external {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");  // <- Issue here
    require(success);
    balances[msg.sender] -= amount;  // <- State change after external call
  }

  // HIGH: Access control issue
  function updateConfig(address newConfig) external {  // <- Missing access control
    config = newConfig;
  }

  // MEDIUM: Arithmetic issue
  function addRewards(uint amount) external {
    totalRewards += amount;  // <- Potential overflow
  }
}`
  };

  const handleCopyReport = () => {
    const reportText = `# AI Security Audit Report for ${contractName}
Contract Address: ${contractAddress || 'N/A'}
Date: ${new Date().toLocaleDateString()}

${reportSections.summary}

${reportSections.vulnerabilities}

## Summary of Findings
- Critical: ${findings.critical}
- High: ${findings.high}
- Medium: ${findings.medium}
- Low: ${findings.low}
- Informational: ${findings.informational}`;

    navigator.clipboard.writeText(reportText).then(() => {
      toast({
        title: "Report copied",
        description: "The audit report has been copied to your clipboard",
      });
    });
  };

  const handleDownload = () => {
    // Create a blob with the report content
    const reportText = `# AI Security Audit Report for ${contractName}
Contract Address: ${contractAddress || 'N/A'}
Date: ${new Date().toLocaleDateString()}

${reportSections.summary}

${reportSections.vulnerabilities}

## Summary of Findings
- Critical: ${findings.critical}
- High: ${findings.high}
- Medium: ${findings.medium}
- Low: ${findings.low}
- Informational: ${findings.informational}

${reportSections.code}`;

    const blob = new Blob([reportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link and trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-report-${contractName.replace(/[^a-zA-Z0-9]/g, '')}-${new Date().getTime()}.md`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Report downloaded",
      description: "The audit report has been downloaded as a markdown file",
    });
  };

  return (
    <GlassCard className={cn('overflow-hidden', className)}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-neural-primary" />
            <h3 className="text-lg font-medium">AI Audit Report</h3>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCopyReport} className="h-8">
              <Copy className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Copy</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="h-8">
              <Download className="w-3.5 h-3.5 mr-1" />
              <span className="text-xs">Download</span>
            </Button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-sm font-medium">{contractName}</h4>
            {contractAddress && (
              <p className="text-xs text-muted-foreground">
                {contractAddress.slice(0, 6)}...{contractAddress.slice(-4)}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-xs">
              <div className="h-2 w-2 rounded-full bg-neural-danger"></div>
              <span>{findings.critical + findings.high}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span>{findings.medium}</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <div className="h-2 w-2 rounded-full bg-neural-success"></div>
              <span>{findings.low + findings.informational}</span>
            </div>
          </div>
        </div>
        
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            {findings.critical + findings.high > 0 ? (
              <AlertTriangle className="w-4 h-4 text-neural-danger" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-neural-success" />
            )}
            <span className="text-sm font-medium">
              {findings.critical + findings.high > 0 
                ? "Issues requiring attention" 
                : "No critical issues found"}
            </span>
          </div>
          
          <div className="text-xs bg-muted/50 px-2 py-1 rounded">
            Generated {new Date().toLocaleDateString()}
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="code">Code Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary">
            <div className="p-4 bg-muted/30 rounded-md text-sm whitespace-pre-line">
              {reportSections.summary}
            </div>
            
            <div className="grid grid-cols-5 gap-2 mt-4">
              <div className="p-3 rounded-md bg-neural-danger/10 text-center">
                <p className="text-xl font-bold text-neural-danger">{findings.critical}</p>
                <p className="text-xs">Critical</p>
              </div>
              <div className="p-3 rounded-md bg-orange-500/10 text-center">
                <p className="text-xl font-bold text-orange-500">{findings.high}</p>
                <p className="text-xs">High</p>
              </div>
              <div className="p-3 rounded-md bg-yellow-500/10 text-center">
                <p className="text-xl font-bold text-yellow-500">{findings.medium}</p>
                <p className="text-xs">Medium</p>
              </div>
              <div className="p-3 rounded-md bg-neural-success/10 text-center">
                <p className="text-xl font-bold text-neural-success">{findings.low}</p>
                <p className="text-xs">Low</p>
              </div>
              <div className="p-3 rounded-md bg-blue-500/10 text-center">
                <p className="text-xl font-bold text-blue-500">{findings.informational}</p>
                <p className="text-xs">Info</p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="vulnerabilities">
            <div className="p-4 bg-muted/30 rounded-md font-mono text-sm whitespace-pre-line">
              {reportSections.vulnerabilities}
            </div>
          </TabsContent>
          
          <TabsContent value="code">
            <div className="relative">
              <Textarea
                readOnly
                value={reportSections.code}
                className="font-mono text-sm h-80 bg-muted/30"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="absolute top-2 right-2 h-7 w-7 p-0"
                onClick={() => {
                  navigator.clipboard.writeText(reportSections.code);
                  toast({ title: "Code copied to clipboard" });
                }}
              >
                <Copy className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" />
              <span>AI-highlighted code with potential issues</span>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </GlassCard>
  );
};

export default AIAuditReport;
