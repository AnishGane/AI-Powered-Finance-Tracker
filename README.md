# SpendWise

SpendWise is a modern, full-stack personal finance tracker that helps you manage your income and expenses, visualize trends, and gain insights into your spending habits. The app features a beautiful, responsive UI, interactive charts, and even an AI-powered assistant to answer your finance-related questions.

---

## 🌟 Features

- **Dashboard**: View your total income, expenses, and balance at a glance.
- **Add/Edit/Delete Transactions**: Easily manage your financial records.
- **Category Tracking**: Assign categories to transactions for better organization.
- **Interactive Charts**: Visualize your income and expenses over time and by category.
- **Filter by Time**: See your data for all time, this week, month, or year.
- **AI Chatbot**: Ask questions about your finances and get instant insights.
- **Authentication**: Secure login and session management.
- **Responsive Design**: Works great on desktop and mobile.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS, Chart.js, Framer Motion
- **Backend**: Node.js, Express, MongoDB (see backend repo if applicable)
- **State Management**: React Context API
- **Authentication**: JWT-based
- **AI Assistant**: OpenAI API (or similar, via backend)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Backend API (see `.env` setup below)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AnishGane/AI-Powered-Finance-Tracker
   ```

2. **Install dependencies:**

   ```bash
   cd client
   npm install
   # or
   yarn install

   cd server
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `client` directory:

   ```
   VITE_BACKEND_URL=http://localhost:4000
   ```

   Create a `.env` file in the `server` directory:

   ```env
   # Backend .env
   PORT= 4000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

   Adjust the URL if your backend runs elsewhere.

4. **Start the development servers:**

   In two separate terminals, run:

   ```bash
   # Terminal 1
   cd client
   npm run dev
   # or
   yarn dev
   ```

   ```bash
   # Terminal 2
   cd server
   npm run start
   ```

   The frontend app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal). The backend will run on [http://localhost:4000](http://localhost:4000) by default.

---

## Usage

- **Add a Transaction**: Click "+ Add a Transaction" on the dashboard, fill in the details, and submit.
- **Edit/Delete**: Use the edit (✏️) or delete (🗑️) icons next to each transaction.
- **Charts**: Go to the "Insights" page to view bar and pie charts of your finances. Use the filter buttons to change the time range.
- **Chatbot**: Click the chat bubble in the bottom-right to ask questions like "How much did I spend on food this month?" or "What is my biggest expense category?"

---

## 📁 Project Structure

```
AI POWERED FINANCE TRACKER/
├── client/                 # Customer-facing React app
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context for state management
│   └── package.json
├── server/                 # Node.js/Express API server
│   ├── config/            # Database and service configurations
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication and validation
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   └── server.js         # Main server file
└── README.md
```
---

## 🌐 Live Demo

### Website Links
- **Frontend (Customer App)**: [https://softstitch-ecommerce.onrender.com](https://softstitch-ecommerce.onrender.com)
- **Backend API**: [https://softstitch-backend.onrender.com](https://softstitch-backend.onrender.com)

---

## 👨‍💻 Author

**Anish Gane** 

## 🙏 Acknowledgments

- MongoDB Atlas for database hosting
- Render for deployment platform

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact: anishgane10@gmail.com

---

**Note**: A demo project for practicing my tech skills.