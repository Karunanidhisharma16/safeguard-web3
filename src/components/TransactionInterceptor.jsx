
import { useState } from 'react'
import { useWallet } from '../context/WalletContext'
import { useTransaction } from '../hooks/useTransaction'
import { Shield, Search, AlertTriangle, Info } from 'lucide-react'
import RiskAnalyzer from './RiskAnalyzer'
import toast from 'react-hot-toast'
import { ethers } from 'ethers'

export default function TransactionInterceptor({ walletAddress }) {
  const { provider, disconnectWallet } = useWallet()
  const { analyzeTransaction, isAnalyzing, analysisResult } = useTransaction()
  
  const [contractAddress, setContractAddress] = useState('')
  const [spenderAddress, setSpenderAddress] = useState('')
  const [tokenAmount, setTokenAmount] = useState('')
  const [transactionType, setTransactionType] = useState('approval')
  const [showAnalysis, setShowAnalysis] = useState(false)



  // SMART: Analyze whatever the user enters
  const analyzeSmartTransaction = async () => {
    // Validation

   
    if (!contractAddress) {
      toast.error('Please enter a contract address')
      return
    }

    if (!ethers.isAddress(contractAddress)) {
      toast.error('Invalid contract address format')
      return
    }

    let transaction

    // Build transaction based on type and amount
    if (transactionType === 'approval') {
      if (!spenderAddress) {
        toast.error('Please enter spender address for approval')
        return
      }

      if (!ethers.isAddress(spenderAddress)) {
        toast.error('Invalid spender address format')
        return
      }

      const ERC20_INTERFACE = new ethers.Interface([
        "function approve(address spender, uint256 amount)"
      ])

      // Determine approval amount
      let approvalAmount
      if (!tokenAmount || tokenAmount.trim() === '' || tokenAmount === 'unlimited') {
        approvalAmount = ethers.MaxUint256 // Unlimited
      } else {
        try {
          approvalAmount = ethers.parseEther(tokenAmount)
        } catch {
          toast.error('Invalid token amount')
          return
        }
      }

      const data = ERC20_INTERFACE.encodeFunctionData('approve', [
        ethers.getAddress(spenderAddress),
        approvalAmount
      ])

      transaction = {
        to: ethers.getAddress(contractAddress),
        from: walletAddress,
        data: data,
        value: '0x0'
      }

    } else if (transactionType === 'transfer') {
      const ERC20_INTERFACE = new ethers.Interface([
        "function transfer(address to, uint256 amount)"
      ])

      let recipient
      if (spenderAddress && ethers.isAddress(spenderAddress)) {
        recipient = ethers.getAddress(spenderAddress)
      } else {
        recipient = walletAddress // Transfer to self
      }

      let transferAmount
      if (!tokenAmount || tokenAmount.trim() === '') {
        transferAmount = ethers.parseEther('10') // Default 10 tokens
      } else {
        try {
          transferAmount = ethers.parseEther(tokenAmount)
        } catch {
          toast.error('Invalid token amount')
          return
        }
      }

      const data = ERC20_INTERFACE.encodeFunctionData('transfer', [
        recipient,
        transferAmount
      ])

      transaction = {
        to: ethers.getAddress(contractAddress),
        from: walletAddress,
        data: data,
        value: '0x0'
      }

    } else if (transactionType === 'nft-approval') {
      if (!spenderAddress) {
        toast.error('Please enter operator address for NFT approval')
        return
      }

      const ERC721_INTERFACE = new ethers.Interface([
        "function setApprovalForAll(address operator, bool approved)"
      ])

      const data = ERC721_INTERFACE.encodeFunctionData('setApprovalForAll', [
        ethers.getAddress(spenderAddress),
        true
      ])

      transaction = {
        to: ethers.getAddress(contractAddress),
        from: walletAddress,
        data: data,
        value: '0x0'
      }
    }

    setShowAnalysis(true)
    await analyzeTransaction(transaction, provider, walletAddress)
  }

  if (showAnalysis && analysisResult) {
    return (
      <div>
        <RiskAnalyzer 
          analysisResult={analysisResult}
          onCancel={() => {
            setShowAnalysis(false)
            toast.success('Analysis cancelled')
          }}
          onProceed={() => {
            toast.success('In a real scenario, transaction would be sent to MetaMask')
            setShowAnalysis(false)
          }}
        />
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Transaction Safety Analyzer</h2>
            <p className="text-sm text-gray-500">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          Disconnect
        </button>
      </div>

      {/* Demo Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
        <div className="flex items-start space-x-3">
          <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-blue-900 mb-2">How It Works</h3>
            <p className="text-sm text-blue-800 mb-3">
              Our AI-powered system analyzes transactions before you sign them, checking for:
            </p>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Unlimited token approvals (most common scam)</li>
              <li>• NFT collection approvals</li>
              <li>• Unverified contracts</li>
              <li>• Simulated asset loss</li>
              <li>• Contract reputation & verification status</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Enter Transaction Details
        </h3>

        {/* Transaction Type Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Transaction Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTransactionType('approval')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                transactionType === 'approval'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Token Approval
            </button>
            <button
              onClick={() => setTransactionType('transfer')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                transactionType === 'transfer'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Token Transfer
            </button>
            <button
              onClick={() => setTransactionType('nft-approval')}
              className={`px-4 py-3 rounded-lg font-medium transition-all ${
                transactionType === 'nft-approval'
                  ? 'bg-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              NFT Approval
            </button>
          </div>
        </div>

        {/* Contract Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {transactionType === 'nft-approval' ? 'NFT Contract Address' : 'Token Contract Address'}
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <p className="mt-1 text-xs text-gray-500">
            Example: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
          </p>
        </div>

        {/* Spender/Recipient Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {transactionType === 'approval' && 'Spender Address (who can spend your tokens)'}
            {transactionType === 'transfer' && 'Recipient Address (optional - leave empty for self-transfer)'}
            {transactionType === 'nft-approval' && 'Operator Address (who can transfer your NFTs)'}
          </label>
          <input
            type="text"
            value={spenderAddress}
            onChange={(e) => setSpenderAddress(e.target.value)}
            placeholder={transactionType === 'transfer' ? '0x... (optional)' : '0x...'}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {transactionType === 'approval' && (
            <p className="mt-1 text-xs text-gray-500">
              Example unsafe: 0x0000000000000000000000000000000000000001 (unknown contract)
            </p>
          )}
          {transactionType === 'transfer' && (
            <p className="mt-1 text-xs text-gray-500">
              Leave empty to transfer to yourself (safest for demo)
            </p>
          )}
        </div>

        {/* Token Amount (only for approval and transfer) */}
        {(transactionType === 'approval' || transactionType === 'transfer') && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {transactionType === 'approval' ? 'Approval Amount' : 'Transfer Amount'}
            </label>
            <input
              type="text"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder={transactionType === 'approval' ? 'e.g., 100 or "unlimited"' : 'e.g., 10'}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {transactionType === 'approval' && (
              <p className="mt-1 text-xs text-gray-500">
                Enter a number (e.g., "100") or leave empty/"unlimited" for maximum risk test
              </p>
            )}
            {transactionType === 'transfer' && (
              <p className="mt-1 text-xs text-gray-500">
                Enter amount in tokens (e.g., "10" for 10 tokens)
              </p>
            )}
          </div>
        )}

        {/* Analyze Button */}
        <button
          onClick={analyzeSmartTransaction}
          disabled={isAnalyzing}
          className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          <Search className="w-6 h-6" />
          <span>{isAnalyzing ? 'Analyzing Transaction...' : 'Analyze Transaction Safety'}</span>
        </button>
      </div>

      {/* Quick Test Examples */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4">🧪 Quick Test Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="font-semibold text-red-900 mb-2">🚨 Critical Risk Test</div>
            <div className="text-xs text-red-700 space-y-1">
              <p>Type: <strong>Token Approval</strong></p>
              <p>Amount: <strong>unlimited</strong></p>
              <p>Spender: <strong>0x0000...0001</strong></p>
              <p className="text-red-800 font-medium mt-2">Expected: Score 5-15</p>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="font-semibold text-yellow-900 mb-2">⚠️ Caution Test</div>
            <div className="text-xs text-yellow-700 space-y-1">
              <p>Type: <strong>Token Approval</strong></p>
              <p>Amount: <strong>100</strong></p>
              <p>Spender: <strong>any address</strong></p>
              <p className="text-yellow-800 font-medium mt-2">Expected: Score 45-55</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="font-semibold text-green-900 mb-2">✅ Safe Test</div>
            <div className="text-xs text-green-700 space-y-1">
              <p>Type: <strong>Token Transfer</strong></p>
              <p>Amount: <strong>10</strong></p>
              <p>Recipient: <strong>leave empty</strong></p>
              <p className="text-green-800 font-medium mt-2">Expected: Score 80-90</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
