# 🛡️ SignSure - Web3 Transaction Safety Analyzer

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-5.0.8-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.3.6-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Ethers.js-6.9.0-2535A0?style=for-the-badge&logo=ethereum&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" />
</div>

<p align="center">
  <strong>Protect yourself from crypto scams before you sign.</strong>
</p>

<p align="center">
  A smart security layer that analyzes Ethereum transactions in real-time, detecting unlimited token approvals, NFT scams, and malicious contracts before they drain your wallet.
</p>

---

## 🎥 **Demo**



**Live Demo:** [safeguard-web3.vercel.app](#) *(Add your deployment link)*

---

## 🚨 **The Problem**

- **$3.8 Billion** lost to crypto scams in 2022 alone
- **95%** of users don't understand what they're signing
- Wallets show raw hex data instead of human-readable warnings
- **Unlimited token approvals** are the #1 attack vector

**Once you sign a malicious transaction, it's irreversible.**

---

## ✨ **The Solution**

SafeGuard intercepts transactions **before** you sign them and provides:

✅ **Real-time Risk Analysis** - Detects unlimited approvals, NFT scams, and suspicious contracts  
✅ **Human-Readable Explanations** - Clear warnings instead of technical jargon  
✅ **Deterministic Scoring** - Rule-based safety scores (0-100)  
✅ **Contract Verification** - Checks Etherscan for verified source code  
✅ **Transaction Simulation** - Predicts outcomes before execution  
✅ **Educational Warnings** - Teaches users WHY transactions are risky

---

## 🎯 **Key Features**

### **Priority-Based Risk Detection**

1. **🚨 CRITICAL (Score: 0-20)**
   - Unlimited ERC-20 token approvals
   - Full NFT collection approvals (`setApprovalForAll`)
   - Known malicious contracts
   - Simulated asset loss

2. **⚠️ CAUTION (Score: 40-70)**
   - Limited token approvals
   - Unverified contracts
   - Unknown function calls
   - Contract interactions with low trust scores

3. **✅ SAFE (Score: 75-100)**
   - Standard token transfers
   - Verified contracts
   - Normal wallet operations

### **Smart Analysis Engine**

- **ABI Decoding** - Translates hex data into readable function calls
- **Etherscan Integration** - Fetches contract verification status
- **Trust Scoring** - Analyzes contract age, creator history, and patterns
- **Execution vs Security Risk** - Separates "will fail" from "is dangerous"

---

## 🛠️ **Tech Stack**

### **Frontend**
- **React 18** - UI Framework
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

### **Web3**
- **Ethers.js 6** - Blockchain interactions
- **MetaMask** - Wallet integration
- **Sepolia Testnet** - Safe testing environment

### **APIs & Services**
- **Etherscan API** - Contract verification & ABI retrieval
- **Alchemy** - Transaction simulation (optional)
- **Tenderly** - Advanced simulation (optional)

### **Developer Tools**
- **React Hot Toast** - Notifications
- **Axios** - HTTP requests
- **ESLint** - Code quality

---

## 📦 **Installation**

### **Prerequisites**

- Node.js 18+ 
- npm or yarn
- MetaMask browser extension

### **Step-by-Step Setup**
```bash
# 1. Clone the repository
git clone https://github.com/Karunanidhisharma16/safeguard-web3.git
cd safeguard-web3

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# 4. Create environment file
cp .env.example .env

# 5. Add your API keys to .env
VITE_ETHERSCAN_API_KEY=your_etherscan_api_key
VITE_ALCHEMY_API_KEY=your_alchemy_api_key (optional)
VITE_NETWORK=sepolia

# 6. Start development server
npm run dev
```

### **Get Free API Keys**

- **Etherscan**: https://etherscan.io/apis (Required)
- **Alchemy**: https://www.alchemy.com/ (Optional - for simulation)

---

## 🚀 **Usage**

1. **Connect MetaMask** to Sepolia testnet
2. **Enter transaction details** or paste a contract address
3. **Select transaction type** (Approval, Transfer, or NFT)
4. **Click "Analyze Transaction"**
5. **Review the risk analysis** with clear explanations
6. **Decide** to proceed or cancel

### **Example Test Cases**

#### **🚨 Critical Risk - Unlimited Approval**
```
Type: Token Approval
Contract: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
Spender: 0x0000000000000000000000000000000000000001
Amount: unlimited

Result: CRITICAL RISK, Score 10/100


#### **⚠️ Caution - Limited Approval**
```
Type: Token Approval
Contract: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
Spender: 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD
Amount: 100

Result: CAUTION, Score 50/100
```

#### **✅ Safe - Normal Transfer**
```
Type: Token Transfer
Contract: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
Recipient: (leave empty for self-transfer)
Amount: 10

Result: SAFE, Score 85/100



### **Manual Testing Checklist**

- [ ] Connect MetaMask wallet
- [ ] Analyze unlimited approval → Score 10
- [ ] Analyze limited approval → Score 50
- [ ] Analyze safe transfer → Score 85
- [ ] Test with unverified contract
- [ ] Test NFT approval detection
- [ ] Verify back button works
- [ ] Check all warnings display correctly



## 🤝 **Contributing**

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🐛 **Known Issues**

- Transaction simulation requires Alchemy/Tenderly API (optional)
- Only supports Sepolia testnet (mainnet support coming soon)
- Active Approvals tab shows demo data only



## 🗺️ **Roadmap**

- [ ] Mainnet support
- [ ] Multi-chain support (Polygon, BSC, Arbitrum)
- [ ] Browser extension
- [ ] Real-time approval tracking
- [ ] Advanced contract pattern detection
- [ ] Integration with popular DeFi protocols
- [ ] Mobile app



## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 👨‍💻 **Author**

**Karunanidhi Sharma**
- Portfolio: [portfolio.logicryx.in]
- GitHub: (https://github.com/Karunanidhisharma16)
- LinkedIn: (https://www.linkedin.com/in/karunanidhi-sharma-154465323)




##  **Acknowledgments**

- Built for [Hackathon Name]
- Inspired by the need to protect Web3 users from scams
- Special thanks to the Ethereum community

---

## ⚠️ **Disclaimer**

This tool is provided for educational purposes only. Always verify contract addresses and understand the risks before approving any blockchain transaction. The developers are not responsible for any loss of funds.

---

<div align="center">
  <strong>⭐ Star this repo if it helped you! ⭐</strong>
</div>
```
