# SpendWise

SpendWise is a modern, full-stack personal finance tracker that helps you manage your income and expenses, visualize trends, and gain insights into your spending habits. The app features a beautiful, responsive UI, interactive charts, and even an AI-powered assistant to answer your finance-related questions.

---

## Features

- **Dashboard**: View your total income, expenses, and balance at a glance.
- **Add/Edit/Delete Transactions**: Easily manage your financial records.
- **Category Tracking**: Assign categories to transactions for better organization.
- **Interactive Charts**: Visualize your income and expenses over time and by category.
- **Filter by Time**: See your data for all time, this week, month, or year.
- **AI Chatbot**: Ask questions about your finances and get instant insights.
- **Authentication**: Secure login and session management.
- **Responsive Design**: Works great on desktop and mobile.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS, Chart.js, Framer Motion
- **Backend**: Node.js, Express, MongoDB (see backend repo if applicable)
- **State Management**: React Context API
- **Authentication**: JWT-based
- **AI Assistant**: OpenAI API (or similar, via backend)

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- Backend API (see `.env` setup below)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/spendwise.git
   cd spendwise
   ```

2. **Install dependencies:**

   ```bash
   cd client
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the `client` directory:

   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```

   Adjust the URL if your backend runs elsewhere.

4. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173) (or as shown in your terminal).

---

## Usage

- **Add a Transaction**: Click "+ Add a Transaction" on the dashboard, fill in the details, and submit.
- **Edit/Delete**: Use the edit (✏️) or delete (🗑️) icons next to each transaction.
- **Charts**: Go to the "Insights" page to view bar and pie charts of your finances. Use the filter buttons to change the time range.
- **Chatbot**: Click the chat bubble in the bottom-right to ask questions like "How much did I spend on food this month?" or "What is my biggest expense category?"

---

## Project Structure

The project is organized as follows:



