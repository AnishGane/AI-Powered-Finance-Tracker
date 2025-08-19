import React, { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";
import toast from "react-hot-toast";
import AlertMessage from "../components/AlertMessage";
import CategorySummary from "../components/CategorySummary";
import {
  MdTrendingUp,
  MdTrendingDown,
  MdAccountBalanceWallet,
} from "react-icons/md";
import Chatbot from "../components/Chatbot";

const Dashboard = () => {
  const {
    username,
    transactions,
    showUsername,
    fetchTransactions,
    addTransaction,
  } = useFinance();
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchTransactions();
    showUsername();
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
    if (res && res.success) {
      toast.success("Transaction added!");
      fetchTransactions();
      setShowAddForm(false);
    } else {
      toast.error(res?.message || "Failed to add transaction");
    }
  };

  // Modal-styled Add Transaction Form (mirrors Transaction edit UX)
  const AddTransactionForm = ({ onAdd, onClose }) => {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Income");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormLoading(true);
      await onAdd({ amount, type, category, date, description });
      setFormLoading(false);
    };

    return (
      <div className="relative mx-auto w-full max-w-lg rounded-2xl bg-white p-8 shadow-2xl">
        <div className="relative flex flex-row-reverse items-center justify-between">
          <button
            type="button"
            className="mb-7 inline-flex cursor-pointer items-center rounded-lg text-4xl text-[#FE4A49] hover:text-[#c9302c]"
            onClick={onClose}
            aria-label="Close"
          >
            &times;
          </button>
          <h2 className="mb-7 text-2xl font-semibold">Add Transaction</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="number"
              id="add-amount"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-base shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder=" "
              min="0"
              step="0.01"
            />
            <label
              htmlFor="add-amount"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Amount
            </label>
          </div>
          <div className="relative">
            <select
              id="add-type"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-base shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <label
              htmlFor="add-type"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Type
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="add-category"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-base shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder=" "
            />
            <label
              htmlFor="add-category"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Category
            </label>
          </div>
          <div className="relative">
            <input
              type="date"
              id="add-date"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-base shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder=" "
            />
            <label
              htmlFor="add-date"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Date
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="add-description"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-base shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
            />
            <label
              htmlFor="add-description"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Description
            </label>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#FE4A49] to-[#c9302c] px-4 py-3 text-lg font-normal text-white shadow-md transition hover:from-[#e63b38] hover:to-[#a81e1c] focus:ring-2 focus:ring-[#FE4A49]/40 focus:outline-none"
            disabled={formLoading}
          >
            {formLoading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <>
      {/* Main Content */}
      <main className="h-full w-full flex-1 bg-[rgba(254,74,73,0.02)] px-6 py-4 pb-8 sm:px-2 sm:py-8 md:px-8">
        <>
          {/* Dashboard Header */}
          <section className="mt-2 mb-8 flex w-full flex-col items-center justify-between text-left sm:flex-row">
            <div className="flex w-full flex-row justify-between sm:flex-col md:w-auto">
              <h1 className="flex flex-col text-4xl font-semibold text-gray-900 sm:text-3xl">
                Dashboard
                <p className="flex items-center gap-1 text-sm font-normal text-gray-600 sm:text-base">
                  Welcome {username.charAt(0).toUpperCase() + username.slice(1)}{" "}
                  <span className="-ml-1 text-2xl">🖐️</span>
                </p>
              </h1>
            </div>
            <button
              onClick={() => setShowAddForm((prev) => !prev)}
              className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#FE4A49] px-4 py-3 text-white sm:mt-0 md:w-auto"
            >
              + Add a Transaction
            </button>
          </section>

          {/* Add Transaction Modal */}
          {showAddForm && (
            <>
              <div className="fixed inset-0 z-199 bg-black/30 backdrop-blur-sm"></div>
              <div className="fixed inset-0 z-200 mx-3 mb-6 flex items-center justify-center sm:mx-0 sm:mb-0">
                <AddTransactionForm
                  onAdd={handleAddTransaction}
                  onClose={() => setShowAddForm(false)}
                />
              </div>
            </>
          )}

          {/* Summary Cards */}
          <section className="mb-4 grid w-full grid-cols-1 items-stretch gap-6 sm:mb-8 sm:gap-8 md:grid-cols-3">
            {/* Income Card */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[8px] bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-500"></div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
                <MdTrendingUp size={20} />
              </div>
              <div className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                Total Income
              </div>
              <div className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                <span className="mr-1 align-top text-sm text-gray-500">₹</span>
                {totalIncome.toLocaleString()}
              </div>
            </div>

            {/* Expense Card */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[8px] bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-500 via-red-400 to-rose-500"></div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                <MdTrendingDown size={20} />
              </div>
              <div className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                Total Expense
              </div>
              <div className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                <span className="mr-1 align-top text-sm text-gray-500">₹</span>
                {totalExpense.toLocaleString()}
              </div>
            </div>

            {/* Balance Card */}
            <div className="group relative flex h-full flex-col overflow-hidden rounded-[8px] bg-white p-6 shadow-md ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-blue-400 to-indigo-500"></div>
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 ring-1 ring-indigo-100">
                <MdAccountBalanceWallet size={20} />
              </div>
              <div className="text-xs font-medium tracking-wide text-gray-600 uppercase">
                Balance
              </div>
              <div className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
                <span className="mr-1 align-top text-sm text-gray-500">₹</span>
                {balance.toLocaleString()}
              </div>
              <span
                className={`mt-3 inline-flex w-fit rounded-full px-2.5 py-1 text-[11px] font-medium ${balance >= 0 ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "bg-rose-50 text-rose-700 ring-1 ring-rose-100"}`}
              >
                {balance >= 0 ? "Surplus" : "Deficit"}
              </span>
            </div>
          </section>

          {/* alert message here */}
          <AlertMessage totalExpense={totalExpense} balance={balance} />

          {/* Category Summary */}
          <CategorySummary transactions={transactions} />
        </>
      </main>
      <Chatbot />
    </>
  );
};

export default Dashboard;
