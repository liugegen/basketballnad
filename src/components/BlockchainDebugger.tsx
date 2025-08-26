import { useState } from 'react';

interface TestResult {
  success: boolean;
  error?: string;
  config?: {
    walletAddress: string;
    balance: string;
    contractAddress: string;
    rpcUrl: string;
    networkName: string;
    chainId: string;
  };
}

export default function BlockchainDebugger() {
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const testBlockchainConnection = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/test-blockchain');
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm rounded-xl p-4 border border-white/10 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">Blockchain Debug</h3>
          <button
            onClick={testBlockchainConnection}
            disabled={isLoading}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-1 rounded text-xs transition-colors border border-blue-500/30 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Connection'}
          </button>
        </div>
        
        {testResult && (
          <div className="text-xs">
            {testResult.success ? (
              <div className="space-y-1">
                <div className="text-green-400">✓ Connection successful</div>
                <div className="text-gray-300">
                  <div>Wallet: {testResult.config?.walletAddress?.slice(0, 10)}...</div>
                  <div>Balance: {testResult.config?.balance}</div>
                  <div>Chain ID: {testResult.config?.chainId}</div>
                </div>
              </div>
            ) : (
              <div className="text-red-400">
                ✗ Error: {testResult.error}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}