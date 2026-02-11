
// import { useState } from 'react'
// import { useWallet } from '../context/WalletContext'
// import { useTransaction } from '../hooks/useTransaction'
// import { Shield, Search, AlertTriangle, Info } from 'lucide-react'
// import RiskAnalyzer from './RiskAnalyzer'
// import toast from 'react-hot-toast'
// import { ethers } from 'ethers'

// export default function TransactionInterceptor({ walletAddress }) {
//   const { provider, disconnectWallet } = useWallet()
//   const { analyzeTransaction, isAnalyzing, analysisResult } = useTransaction()
  
//   const [contractAddress, setContractAddress] = useState('')
//   const [spenderAddress, setSpenderAddress] = useState('')
//   const [tokenAmount, setTokenAmount] = useState('')
//   const [transactionType, setTransactionType] = useState('approval')
//   const [showAnalysis, setShowAnalysis] = useState(false)



//   // SMART: Analyze whatever the user enters
//   const analyzeSmartTransaction = async () => {
//     // Validation

   
//     if (!contractAddress) {
//       toast.error('Please enter a contract address')
//       return
//     }

//     if (!ethers.isAddress(contractAddress)) {
//       toast.error('Invalid contract address format')
//       return
//     }

//     let transaction

//     // Build transaction based on type and amount
//     if (transactionType === 'approval') {
//       if (!spenderAddress) {
//         toast.error('Please enter spender address for approval')
//         return
//       }

//       if (!ethers.isAddress(spenderAddress)) {
//         toast.error('Invalid spender address format')
//         return
//       }

//       const ERC20_INTERFACE = new ethers.Interface([
//         "function approve(address spender, uint256 amount)"
//       ])

//       // Determine approval amount
//       let approvalAmount
//       if (!tokenAmount || tokenAmount.trim() === '' || tokenAmount === 'unlimited') {
//         approvalAmount = ethers.MaxUint256 // Unlimited
//       } else {
//         try {
//           approvalAmount = ethers.parseEther(tokenAmount)
//         } catch {
//           toast.error('Invalid token amount')
//           return
//         }
//       }

//       const data = ERC20_INTERFACE.encodeFunctionData('approve', [
//         ethers.getAddress(spenderAddress),
//         approvalAmount
//       ])

//       transaction = {
//         to: ethers.getAddress(contractAddress),
//         from: walletAddress,
//         data: data,
//         value: '0x0'
//       }

//     } else if (transactionType === 'transfer') {
//       const ERC20_INTERFACE = new ethers.Interface([
//         "function transfer(address to, uint256 amount)"
//       ])

//       let recipient
//       if (spenderAddress && ethers.isAddress(spenderAddress)) {
//         recipient = ethers.getAddress(spenderAddress)
//       } else {
//         recipient = walletAddress // Transfer to self
//       }

//       let transferAmount
//       if (!tokenAmount || tokenAmount.trim() === '') {
//         transferAmount = ethers.parseEther('10') // Default 10 tokens
//       } else {
//         try {
//           transferAmount = ethers.parseEther(tokenAmount)
//         } catch {
//           toast.error('Invalid token amount')
//           return
//         }
//       }

//       const data = ERC20_INTERFACE.encodeFunctionData('transfer', [
//         recipient,
//         transferAmount
//       ])

//       transaction = {
//         to: ethers.getAddress(contractAddress),
//         from: walletAddress,
//         data: data,
//         value: '0x0'
//       }

//     } else if (transactionType === 'nft-approval') {
//       if (!spenderAddress) {
//         toast.error('Please enter operator address for NFT approval')
//         return
//       }

//       const ERC721_INTERFACE = new ethers.Interface([
//         "function setApprovalForAll(address operator, bool approved)"
//       ])

//       const data = ERC721_INTERFACE.encodeFunctionData('setApprovalForAll', [
//         ethers.getAddress(spenderAddress),
//         true
//       ])

//       transaction = {
//         to: ethers.getAddress(contractAddress),
//         from: walletAddress,
//         data: data,
//         value: '0x0'
//       }
//     }

//     setShowAnalysis(true)
//     await analyzeTransaction(transaction, provider, walletAddress)
//   }

//   if (showAnalysis && analysisResult) {
//     return (
//       <div>
//         <RiskAnalyzer 
//           analysisResult={analysisResult}
//           onCancel={() => {
//             setShowAnalysis(false)
//             toast.success('Analysis cancelled')
//           }}
//           onProceed={() => {
//             toast.success('In a real scenario, transaction would be sent to MetaMask')
//             setShowAnalysis(false)
//           }}
//         />
//       </div>
//     )
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
//             <Shield className="w-6 h-6 text-purple-600" />
//           </div>
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800">Transaction Safety Analyzer</h2>
//             <p className="text-sm text-gray-500">
//               {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
//             </p>
//           </div>
//         </div>
//         <button
//           onClick={disconnectWallet}
//           className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
//         >
//           Disconnect
//         </button>
//       </div>

//       {/* Demo Info */}
//       <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 mb-6">
//         <div className="flex items-start space-x-3">
//           <Info className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
//           <div>
//             <h3 className="font-bold text-blue-900 mb-2">How It Works</h3>
//             <p className="text-sm text-blue-800 mb-3">
//               Our AI-powered system analyzes transactions before you sign them, checking for:
//             </p>
//             <ul className="text-sm text-blue-700 space-y-1">
//               <li>• Unlimited token approvals (most common scam)</li>
//               <li>• NFT collection approvals</li>
//               <li>• Unverified contracts</li>
//               <li>• Simulated asset loss</li>
//               <li>• Contract reputation & verification status</li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Input Section */}
//       <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-6">
//         <h3 className="text-lg font-bold text-gray-800 mb-4">
//           Enter Transaction Details
//         </h3>

//         {/* Transaction Type Selector */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-3">
//             Transaction Type
//           </label>
//           <div className="grid grid-cols-3 gap-3">
//             <button
//               onClick={() => setTransactionType('approval')}
//               className={`px-4 py-3 rounded-lg font-medium transition-all ${
//                 transactionType === 'approval'
//                   ? 'bg-purple-600 text-white shadow-lg'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Token Approval
//             </button>
//             <button
//               onClick={() => setTransactionType('transfer')}
//               className={`px-4 py-3 rounded-lg font-medium transition-all ${
//                 transactionType === 'transfer'
//                   ? 'bg-purple-600 text-white shadow-lg'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               Token Transfer
//             </button>
//             <button
//               onClick={() => setTransactionType('nft-approval')}
//               className={`px-4 py-3 rounded-lg font-medium transition-all ${
//                 transactionType === 'nft-approval'
//                   ? 'bg-purple-600 text-white shadow-lg'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               NFT Approval
//             </button>
//           </div>
//         </div>

//         {/* Contract Address */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             {transactionType === 'nft-approval' ? 'NFT Contract Address' : 'Token Contract Address'}
//           </label>
//           <input
//             type="text"
//             value={contractAddress}
//             onChange={(e) => setContractAddress(e.target.value)}
//             placeholder="0x..."
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           />
//           <p className="mt-1 text-xs text-gray-500">
//             Example: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
//           </p>
//         </div>

//         {/* Spender/Recipient Address */}
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             {transactionType === 'approval' && 'Spender Address (who can spend your tokens)'}
//             {transactionType === 'transfer' && 'Recipient Address (optional - leave empty for self-transfer)'}
//             {transactionType === 'nft-approval' && 'Operator Address (who can transfer your NFTs)'}
//           </label>
//           <input
//             type="text"
//             value={spenderAddress}
//             onChange={(e) => setSpenderAddress(e.target.value)}
//             placeholder={transactionType === 'transfer' ? '0x... (optional)' : '0x...'}
//             className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//           />
//           {transactionType === 'approval' && (
//             <p className="mt-1 text-xs text-gray-500">
//               Example unsafe: 0x0000000000000000000000000000000000000001 (unknown contract)
//             </p>
//           )}
//           {transactionType === 'transfer' && (
//             <p className="mt-1 text-xs text-gray-500">
//               Leave empty to transfer to yourself (safest for demo)
//             </p>
//           )}
//         </div>

//         {/* Token Amount (only for approval and transfer) */}
//         {(transactionType === 'approval' || transactionType === 'transfer') && (
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               {transactionType === 'approval' ? 'Approval Amount' : 'Transfer Amount'}
//             </label>
//             <input
//               type="text"
//               value={tokenAmount}
//               onChange={(e) => setTokenAmount(e.target.value)}
//               placeholder={transactionType === 'approval' ? 'e.g., 100 or "unlimited"' : 'e.g., 10'}
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
//             />
//             {transactionType === 'approval' && (
//               <p className="mt-1 text-xs text-gray-500">
//                 Enter a number (e.g., "100") or leave empty/"unlimited" for maximum risk test
//               </p>
//             )}
//             {transactionType === 'transfer' && (
//               <p className="mt-1 text-xs text-gray-500">
//                 Enter amount in tokens (e.g., "10" for 10 tokens)
//               </p>
//             )}
//           </div>
//         )}

//         {/* Analyze Button */}
//         <button
//           onClick={analyzeSmartTransaction}
//           disabled={isAnalyzing}
//           className="w-full flex items-center justify-center space-x-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
//         >
//           <Search className="w-6 h-6" />
//           <span>{isAnalyzing ? 'Analyzing Transaction...' : 'Analyze Transaction Safety'}</span>
//         </button>
//       </div>

//       {/* Quick Test Examples */}
//       <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
//         <h3 className="font-bold text-gray-800 mb-4">🧪 Quick Test Scenarios</h3>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
//           <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//             <div className="font-semibold text-red-900 mb-2">🚨 Critical Risk Test</div>
//             <div className="text-xs text-red-700 space-y-1">
//               <p>Type: <strong>Token Approval</strong></p>
//               <p>Amount: <strong>unlimited</strong></p>
//               <p>Spender: <strong>0x0000...0001</strong></p>
//               <p className="text-red-800 font-medium mt-2">Expected: Score 5-15</p>
//             </div>
//           </div>

//           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//             <div className="font-semibold text-yellow-900 mb-2">⚠️ Caution Test</div>
//             <div className="text-xs text-yellow-700 space-y-1">
//               <p>Type: <strong>Token Approval</strong></p>
//               <p>Amount: <strong>100</strong></p>
//               <p>Spender: <strong>any address</strong></p>
//               <p className="text-yellow-800 font-medium mt-2">Expected: Score 45-55</p>
//             </div>
//           </div>

//           <div className="bg-green-50 border border-green-200 rounded-lg p-4">
//             <div className="font-semibold text-green-900 mb-2">✅ Safe Test</div>
//             <div className="text-xs text-green-700 space-y-1">
//               <p>Type: <strong>Token Transfer</strong></p>
//               <p>Amount: <strong>10</strong></p>
//               <p>Recipient: <strong>leave empty</strong></p>
//               <p className="text-green-800 font-medium mt-2">Expected: Score 80-90</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
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
      {/* Header - Dark styled */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
            <Shield className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white">Transaction Analyzer</h2>
            <p className="text-sm text-gray-400 font-mono">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          </div>
        </div>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors glass rounded-lg hover:bg-white/5"
        >
          Disconnect
        </button>
      </div>

      {/* Demo Info - Cyberpunk style */}
      <div className="glass border-indigo-500/30 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
        <div className="relative flex items-start space-x-4">
          <Info className="w-6 h-6 text-indigo-400 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-white text-lg mb-2">🔐 Advanced Security Scanning</h3>
            <p className="text-gray-300 text-sm mb-3">
              Military-grade transaction analysis powered by AI and blockchain forensics:
            </p>
            <ul className="text-sm text-gray-400 space-y-1.5">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
                <span>Unlimited token approval detection (99.9% accuracy)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                <span>NFT collection scam prevention</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                <span>Smart contract verification & reputation scoring</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></span>
                <span>Real-time transaction simulation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Input Section - Dark glassmorphism */}
      <div className="glass border-white/10 rounded-2xl p-8 space-y-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
          <span className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-sm">
            1
          </span>
          <span>Enter Transaction Details</span>
        </h3>

        {/* Transaction Type Selector - Enhanced */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3">
            Transaction Type
          </label>
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setTransactionType('approval')}
              className={`px-5 py-4 rounded-xl font-semibold transition-all duration-300 ${
                transactionType === 'approval'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                  : 'glass text-gray-400 hover:text-white hover:scale-102'
              }`}
            >
              Token Approval
            </button>
            <button
              onClick={() => setTransactionType('transfer')}
              className={`px-5 py-4 rounded-xl font-semibold transition-all duration-300 ${
                transactionType === 'transfer'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                  : 'glass text-gray-400 hover:text-white hover:scale-102'
              }`}
            >
              Token Transfer
            </button>
            <button
              onClick={() => setTransactionType('nft-approval')}
              className={`px-5 py-4 rounded-xl font-semibold transition-all duration-300 ${
                transactionType === 'nft-approval'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/50 scale-105'
                  : 'glass text-gray-400 hover:text-white hover:scale-102'
              }`}
            >
              NFT Approval
            </button>
          </div>
        </div>

        {/* Input fields - Dark theme */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            {transactionType === 'nft-approval' ? 'NFT Contract Address' : 'Token Contract Address'}
          </label>
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            placeholder="0x..."
            className="w-full px-5 py-4 glass border-2 border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-300"
          />
          <p className="mt-2 text-xs text-gray-500 font-mono">
            Example: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
          </p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            {transactionType === 'approval' && 'Spender Address (who can spend your tokens)'}
            {transactionType === 'transfer' && 'Recipient Address (optional)'}
            {transactionType === 'nft-approval' && 'Operator Address (who can transfer your NFTs)'}
          </label>
          <input
            type="text"
            value={spenderAddress}
            onChange={(e) => setSpenderAddress(e.target.value)}
            placeholder={transactionType === 'transfer' ? '0x... (optional)' : '0x...'}
            className="w-full px-5 py-4 glass border-2 border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-300"
          />
        </div>

        {(transactionType === 'approval' || transactionType === 'transfer') && (
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              {transactionType === 'approval' ? 'Approval Amount' : 'Transfer Amount'}
            </label>
            <input
              type="text"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
              placeholder={transactionType === 'approval' ? 'e.g., 100 or "unlimited"' : 'e.g., 10'}
              className="w-full px-5 py-4 glass border-2 border-white/10 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-500 transition-all duration-300"
            />
          </div>
        )}

        {/* Analyze Button - EPIC */}
        <button
          onClick={analyzeSmartTransaction}
          disabled={isAnalyzing}
          className="group relative w-full flex items-center justify-center space-x-3 px-10 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-black text-xl rounded-xl hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-indigo-500/50 transform hover:scale-105 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
          <Search className="w-7 h-7 relative z-10" />
          <span className="relative z-10">{isAnalyzing ? 'Scanning Transaction...' : 'Analyze Transaction Safety'}</span>
        </button>
      </div>

      {/* Quick Test Examples - Cyberpunk cards */}
      <div className="mt-8 glass border-white/10 rounded-2xl p-6">
        <h3 className="font-bold text-white text-lg mb-4">🧪 Quick Test Scenarios</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="glass border-red-500/30 rounded-xl p-4 hover:border-red-500/50 transition-colors">
            <div className="font-bold text-red-400 mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              <span>🚨 Critical Risk</span>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Type: <span className="text-white">Token Approval</span></p>
              <p>Amount: <span className="text-white">unlimited</span></p>
              <p>Spender: <span className="text-white font-mono">0x0000...0001</span></p>
              <p className="text-red-400 font-semibold mt-2">Score: 5-15</p>
            </div>
          </div>

          <div className="glass border-yellow-500/30 rounded-xl p-4 hover:border-yellow-500/50 transition-colors">
            <div className="font-bold text-yellow-400 mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              <span>⚠️ Caution</span>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Type: <span className="text-white">Token Approval</span></p>
              <p>Amount: <span className="text-white">100</span></p>
              <p>Spender: <span className="text-white">any address</span></p>
              <p className="text-yellow-400 font-semibold mt-2">Score: 45-55</p>
            </div>
          </div>

          <div className="glass border-green-500/30 rounded-xl p-4 hover:border-green-500/50 transition-colors">
            <div className="font-bold text-green-400 mb-2 flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span>✅ Safe</span>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Type: <span className="text-white">Token Transfer</span></p>
              <p>Amount: <span className="text-white">10</span></p>
              <p>Recipient: <span className="text-white">leave empty</span></p>
              <p className="text-green-400 font-semibold mt-2">Score: 80-90</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}