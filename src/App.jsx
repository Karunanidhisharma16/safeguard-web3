import { useState } from 'react'
import { WalletProvider, useWallet } from './context/WalletContext'
import { Toaster } from 'react-hot-toast'
import WalletConnect from './components/WalletConnect'
import TransactionInterceptor from './components/TransactionInterceptor'
import ApprovalDashboard from './components/ApprovalDashboard'
import { Shield, FileText } from 'lucide-react'

function AppContent() {
  const { walletAddress } = useWallet()
  const [activeTab, setActiveTab] = useState('monitor')

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="max-w-6xl w-full">
        {/* Header with enhanced styling */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full mb-6 neon-glow float">
            <Shield className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-black mb-3">
            <span className="gradient-text">SignSure</span>
          </h1>
          <p className="text-gray-300 text-xl font-medium">
            Protect yourself from malicious transactions before you sign
          </p>
          <div className="mt-4 flex items-center justify-center space-x-2">
            <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-semibold rounded-full border border-green-500/30">
              ✓ Live on Sepolia
            </span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full border border-blue-500/30">
              🛡️ Scam Detection Active
            </span>
          </div>
        </div>

        {/* Main Content Card with glassmorphism */}
        <div className="glass rounded-3xl shadow-2xl overflow-hidden border border-white/10 neon-glow">
          {!walletAddress ? (
            <div className="p-12">
              <WalletConnect />
            </div>
          ) : (
            <>
              {/* Enhanced Tabs */}
              <div className="flex border-b border-white/10 bg-slate-900/50">
                <button
                  onClick={() => setActiveTab('monitor')}
                  className={`flex-1 px-8 py-5 font-bold transition-all duration-300 flex items-center justify-center space-x-3 relative ${
                    activeTab === 'monitor'
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Shield className="w-5 h-5" />
                  <span>Transaction Monitor</span>
                  {activeTab === 'monitor' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('approvals')}
                  className={`flex-1 px-8 py-5 font-bold transition-all duration-300 flex items-center justify-center space-x-3 relative ${
                    activeTab === 'approvals'
                      ? 'text-white bg-gradient-to-r from-indigo-600 to-purple-600'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span>Active Approvals</span>
                  {activeTab === 'approvals' && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'monitor' ? (
                  <TransactionInterceptor walletAddress={walletAddress} />
                ) : (
                  <ApprovalDashboard />
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer info */}
        {walletAddress && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 px-4 py-2 glass rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full pulse-slow"></div>
              <p className="text-gray-300 text-sm font-medium">
                Connected: <span className="text-white font-mono">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
              </p>
            </div>
          </div>
        )}

        {/* Enhanced Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm space-y-2">
          <p className="font-semibold text-gray-300">Built for Web3 Security • Sepolia Testnet</p>
          <p className="text-xs">
            Always verify contract addresses and understand risks before approving transactions
          </p>
        </div>
      </div>

      {/* Toast Notifications - Dark Theme */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(15, 23, 42, 0.95)',
            color: '#fff',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            backdropFilter: 'blur(20px)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <WalletProvider>
      <AppContent />
    </WalletProvider>
  )
}

export default App