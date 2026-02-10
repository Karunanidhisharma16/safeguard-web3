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

The Problem

3.8 billion dollars lost to crypto scams in 2022

Most users do not understand what they are signing

Wallets show raw hex data instead of meaningful warnings

Unlimited token approvals are the most common attack vector

Once a malicious transaction is signed, it cannot be reversed.

The Solution

SafeGuard intercepts transactions before they are signed and provides:

Real-time risk analysis for approvals, NFTs, and suspicious contracts

Human-readable explanations instead of technical jargon

Rule-based deterministic safety scoring from 0 to 100

Contract verification using Etherscan

Transaction simulation before execution

Educational warnings explaining why a transaction is risky

Key Features
Priority-Based Risk Detection

Critical Risk (Score 0–20)

Unlimited ERC-20 approvals

Full NFT collection approvals using setApprovalForAll

Known malicious contracts

Simulated asset loss

Caution (Score 40–70)

Limited token approvals

Unverified contracts

Unknown function calls

Low-trust contract interactions

Safe (Score 75–100)

Standard token transfers

Verified contracts

Normal wallet operations

Smart Analysis Engine

ABI decoding to convert hex data into readable function calls

Etherscan integration for contract verification and ABI fetching

Trust scoring based on contract age, creator history, and patterns

Separation of execution failure risk and security risk

Tech Stack

Frontend

React 18

Vite

Tailwind CSS

Lucide React

Web3

Ethers.js 6

MetaMask

Sepolia testnet

APIs and Services

Etherscan API

Alchemy (optional, for simulation)

Tenderly (optional, advanced simulation)

Developer Tools

React Hot Toast

Axios

ESLint

Installation

Prerequisites

Node.js 18 or higher

npm or yarn

MetaMask browser extension

Setup Steps

git clone https://github.com/Karunanidhisharma16/SignSure.git
cd safeguard-web3
npm install --legacy-peer-deps
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
cp .env.example .env


Add the following to your .env file:

VITE_ETHERSCAN_API_KEY=your_etherscan_api_key
VITE_ALCHEMY_API_KEY=your_alchemy_api_key
VITE_NETWORK=sepolia


Start the development server:

npm run dev

Usage

Connect MetaMask to the Sepolia testnet

Enter transaction details or paste a contract address

Select transaction type (Approval, Transfer, or NFT)

Click Analyze Transaction

Review the risk analysis and explanation

Decide whether to proceed or cancel

Example Test Cases

Critical Risk – Unlimited Approval

Type: Token Approval
Contract: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
Spender: 0x0000000000000000000000000000000000000001
Amount: Unlimited

Result: Critical Risk, Score 10/100

Caution – Limited Approval

Type: Token Approval
Contract: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
Spender: 0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD
Amount: 100

Result: Caution, Score 50/100

Safe – Normal Transfer

Type: Token Transfer
Contract: 0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0
Recipient: Self
Amount: 10

Result: Safe, Score 85/100

Testing

Run tests:

npm test


Manual Testing Checklist

Connect MetaMask wallet

Analyze unlimited approval

Analyze limited approval

Analyze safe transfer

Test unverified contracts

Test NFT approval detection

Verify back button navigation

Ensure all warnings render correctly

Contributing

Fork the repository

Create a feature branch

Commit your changes

Push the branch

Open a pull request

Known Issues

Transaction simulation requires Alchemy or Tenderly API

Only Sepolia testnet is supported

Active approvals tab uses demo data

License

This project is licensed under the MIT License. See the LICENSE file for details.

Author

Karunanidhi Sharma
Portfolio: portfolio.logicryx.in
GitHub: https://github.com/Karunanidhisharma16

LinkedIn: [linkedin.com/in/yourname](https://www.linkedin.com/in/karunanidhi-sharma-154465323?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app)

Disclaimer

This tool is for educational purposes only. Always verify contract addresses and understand the risks before approving any blockchain transaction. The developers are not responsible for any loss of funds.