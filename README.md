# 🏦 Blockchain BankCRM

<div align="center">

![Solidity](https://img.shields.io/badge/Solidity-0.8.17-black?logo=solidity)
![Ethereum](https://img.shields.io/badge/Ethereum-Blockchain-blue?logo=ethereum)
![Truffle](https://img.shields.io/badge/Truffle-Framework-brown)
![Web3.js](https://img.shields.io/badge/Web3.js-DApp-orange)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![Status](https://img.shields.io/badge/Status-Completed-success)

### Decentralized Bank Customer Management System

A blockchain-based customer relationship management system built using Solidity, Truffle, Web3.js, and MetaMask.

</div>

---

# 📖 Overview

Blockchain BankCRM is a decentralized application (DApp) that demonstrates how blockchain technology can be used to manage customer records securely and transparently.

The system integrates an Ethereum smart contract with a modern web interface, allowing users to perform customer management operations through MetaMask and Web3.js.

---

# ✨ Features

## 👥 Customer Management

* Add New Customers
* View Customer Information
* Update Customer Records
* Remove Customers

## 💰 Balance Management

* Deposit Customer Balance
* Withdraw Customer Balance
* View Customer Balances
* Balance Visibility Control

## 🔗 Blockchain Features

* Smart Contract Deployment
* MetaMask Wallet Integration
* Web3.js Communication
* Event Logging
* Ownership Management

---

# 🏗️ Architecture

```text
User
 │
 ▼
Frontend (HTML / CSS / JavaScript)
 │
 ▼
Web3.js
 │
 ▼
MetaMask Wallet
 │
 ▼
BankCRM Smart Contract
 │
 ▼
Ethereum Blockchain
```

---

# 🛠️ Technology Stack

### Blockchain

* Solidity 0.8.17
* Ethereum
* Truffle Framework
* Ganache
* MetaMask

### Frontend

* HTML5
* CSS3
* JavaScript
* Web3.js

### Development Tools

* Node.js
* npm

---

# 📂 Project Structure

```text
Blockchain-BankCRM/
│
├── contracts/
│   └── BankCRM.sol
│
├── migrations/
│   └── 1_deploy_bankcrm.js
│
├── build/
│   └── contracts/
│
├── app.js
├── index.html
├── styles.css
├── package.json
├── truffle-config.js
│
└── README.md
```

---

# 📸 Application Preview

<div align="center">

![Blockchain BankCRM](screenshots/main.png)

*Blockchain BankCRM User Interface*

</div>

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/abdullhamar/Blockchain-BankCRM.git
cd Blockchain-BankCRM
```

## Install Dependencies

```bash
npm install
```

## Start Ganache

Run Ganache locally on:

```text
127.0.0.1:7545
```

## Compile Smart Contract

```bash
truffle compile
```

## Deploy Smart Contract

```bash
truffle migrate --network development
```

## Run Application

```bash
npm start
```

Application URL:

```text
http://localhost:8080
```

---

# 🔐 Smart Contract Functions

The BankCRM smart contract supports:

* addCustomer()
* getCustomer()
* updateCustomer()
* removeCustomer()
* depositToCustomer()
* withdrawFromCustomer()
* transferOwnership()
* listCustomers()

---

# 🎯 Learning Objectives

This project demonstrates:

* Smart Contract Development
* Ethereum DApp Development
* MetaMask Integration
* Web3.js Communication
* Blockchain-Based Data Management
* Decentralized Application Architecture

---

# 🚀 Future Improvements

* Ethereum Testnet Deployment
* Transaction History Tracking
* Customer Authentication
* Multi-Role Authorization
* Analytics Dashboard
* Mobile Responsive Interface

---

# 👨‍💻 Author

### Abdullah Ammar

Information Security Student

**GitHub:**
https://github.com/abdullhamar

**LinkedIn:**
https://www.linkedin.com/in/abdullah-amar-6b117240b

---

# ⭐ Support

If you find this project useful, consider giving it a star ⭐.

It helps support future development and encourages open-source contributions.

---

<div align="center">

### Built with Solidity, Web3.js, and Ethereum 🚀

</div>
