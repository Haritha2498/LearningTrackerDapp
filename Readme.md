# 🌟 Learning and Skill Development Tracker 🌟

## 📚 Project Overview

The **Learning and Skill Development Tracker** is a cutting-edge platform designed to promote lifelong learning by allowing users to log and track their educational progress. Users can document their achievements—whether completing online courses, reading books, or acquiring new skills. The platform rewards users with blockchain-validated NFTs or tokens, serving as verifiable proof of their learning accomplishments. These rewards are securely stored on the Ethereum blockchain, ensuring immutability and verifiability for future use by educational institutions, employers, and other organizations.

## 🚀 Unique Aspects

The key differentiator of this project is the integration of **blockchain technology**, specifically the **Ethereum blockchain**, to validate and record learning achievements. This guarantees a transparent, tamper-proof record of completed skills and activities permanently stored on the blockchain. By issuing educational NFTs or tokens, the platform provides verifiable and credible proof of learning, transforming how individuals showcase their accomplishments in career development and further education.

### 🌍 Alignment with Sustainable Development Goals (SDGs)

This project aligns with the **United Nations' Sustainable Development Goals (SDGs)**, particularly in the following areas:

- 🎓 **Quality Education (SDG 4)**
- 🌐 **Reduced Inequalities (SDG 10)**
- 💼 **Decent Work and Economic Growth (SDG 8)**

The project promotes decentralized education and equitable access to lifelong learning, contributing to a sustainable future.

## 🔑 Features

- **User Types:**
  - 👩‍💻 **Admin:** Verifies uploaded certificates and manages platform functionalities.
  - 👨‍🎓 **Learner/Regular User:** Uploads certificates and tracks learning achievements.

- **🎓 Certificate Management:**
  - Users can upload certificate details such as candidate name, course title, issuing authority, duration, and issue date.
  - Admins can verify user-uploaded certificates.

- **🏆 Reward System:**
  - Users receive **digital badges or tokens** as rewards for verified certificates.
  - Tokens can be used to **purchase additional certificates** or apply discounts.

- **🗄️ Data Storage:**
  - Certificate details are stored on the **Ethereum blockchain** for immutability and security.
  - Future plans include using **IPFS** to store certificates for better accessibility.

## 📅 Current Status

The platform is currently in development. Users can enter certificate details, which are stored on the blockchain. The admin dashboard displays the uploaded certificates for verification. Future work includes implementing IPFS for certificate storage.

---

## ⚙️ Running the Project

To run the project, clone the repository and change into the directory:


git clone git@github.com:Haritha2498/LearningTrackerDapp.git
cd LearningTrackerDapp

Open the folder in VS Code. In the terminal, install dependencies:

npm init
npm install --save-dev hardhat

In hardhat.config.js, add your private key across the accounts section:

infura: {
    url: "https://sepolia.infura.io/v3/66d60f103eac4256995259d73ede2b51",
    accounts: [""]
},


Next, install frontend and backend dependencies:

cd frontend
npm install
cd ../backend
npm install

To start MongoDB, run the following in the terminal:
sudo systemctl start mongod

Run the project in the server terminal:
node app.js

In the frontend terminal, run:
npm run dev

If you need to make changes to the smart contract, follow these steps:
To initialize Hardhat nodes:
npx hardhat node

To deploy, in another terminal:
npx hardhat compile
npx hardhat ignition deploy ignition/modules/Learn.js

## 🤝 Contributing

We welcome contributions to improve the platform! Please follow the guidelines below:

1. 🍴 Fork the repository.
2. 🌿 Create a new branch for your feature.
3. ✨ Make your changes and commit them.
4. 🚀 Push to your branch.
5. 🔥 Open a pull request.

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.





