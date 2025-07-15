import React, { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";
import AlertMessage from "../components/AlertMessage";
import CategorySummary from "../components/CategorySummary";
import AddTransaction from "../components/AddTransaction";

const Dashboard = () => {
  const { username, transactions, fetchTransactions, addTransaction } =
    useFinance();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, []);

  // Example summary data
  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  const handleAddTransaction = async (newTx) => {
    const res = await addTransaction(newTx);
    if (res.success) {
      fetchTransactions();
      setShowAddForm(false);
    }
  };

  return (
    <>
      {/* Main Content */}
      <main className="h-full w-full flex-1 bg-[rgba(254,74,73,0.02)] px-6 py-4 pb-8 sm:px-2 sm:py-8 md:px-8">
        <>
          {/* Dashboard Header */}
          <section className="mt-2 mb-8 flex w-full flex-col items-center justify-between text-left sm:flex-row">
            <div className="flex w-full flex-row justify-between sm:flex-col md:w-auto">
              <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl md:text-4xl">
                Dashboard
              </h1>
              <p className="text-sm text-gray-600 sm:text-base">
                Welcome {username.charAt(0).toUpperCase() + username.slice(1)}{" "}
                <span className="-ml-1 text-2xl">🖐️</span>
              </p>
            </div>
            <button
              onClick={() => setShowAddForm((prev) => !prev)}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#FE4A49] px-4 py-3 text-white sm:mt-0 md:w-auto"
            >
              + Add a Transaction
            </button>
          </section>

          {/* Add Transaction Form (modal/section) */}
          {showAddForm && (
            <AddTransaction
              setShowAddForm={setShowAddForm}
              onAdd={handleAddTransaction}
            />
          )}

          {/* Summary Cards */}
          <section className="mb-4 grid w-full grid-cols-1 gap-6 sm:mb-8 sm:gap-10 md:grid-cols-3">
            <div className="flex h-48 flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
              <span className="mb-1 text-xl text-neutral-700">
                Total Income
              </span>
              <span className="text-2xl font-bold text-green-600">
                ₹{totalIncome.toLocaleString()}
              </span>
            </div>
            <div className="flex h-48 flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
              <span className="mb-1 text-xl text-neutral-700">
                Total Expense
              </span>
              <span className="text-2xl font-bold text-red-500">
                ₹{totalExpense.toLocaleString()}
              </span>
            </div>
            <div className="flex h-48 flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
              <span className="mb-1 text-xl text-neutral-700">Balance</span>
              <span
                className={`text-2xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-500"}`}
              >
                ₹{balance.toLocaleString()}
              </span>
            </div>
          </section>

          {/* alert message here */}
          <AlertMessage totalExpense={totalExpense} balance={balance} />

          {/* Category Summary */}
          <CategorySummary transactions={transactions} />
        </>
      </main>
    </>
  );
};

export default Dashboard;
