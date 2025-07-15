import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import toast from "react-hot-toast";

const AddTransaction = ({ setShowAddForm, onAdd }) => {
  const { addTransaction } = useFinance();
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category || !date) {
      toast.error("Please fill all required fields.");
      return;
    }
    setLoading(true);
    const txData = {
      amount,
      type,
      category,
      date,
      description,
    };
    let res;
    try {
      res = await addTransaction(txData);
    } catch (error) {
      console.log("AddTransaction handleSubmit error:", error);
    }
    setLoading(false);
    console.log("AddTransaction handleSubmit result:", res);
    if (res && res.success) {
      setAmount("");
      setCategory("");
      setDate("");
      setDescription("");
      setType("Income");
      toast.success("Transaction added!");
      setShowAddForm(false);
    } else if (res && res.message) {
      toast.error(res.message);
    } else {
      toast.error("Failed to add transaction (unexpected error)");
    }
  };

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold sm:text-2xl">
        Add Transaction
      </h1>
      <section className="mb-6 flex w-full flex-col gap-4 rounded-2xl bg-neutral-100 px-6 py-4 shadow-md">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Amount</label>
            <input
              type="number"
              min="0"
              step="0.01"
              className="rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Type</label>
            <select
              className="rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Category</label>
            <input
              type="text"
              className="rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              placeholder="e.g. Groceries, Salary"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-medium text-gray-700">
              Description <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              className="rounded-lg border border-gray-300 px-4 py-2 transition focus:border-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none"
              placeholder="Add a note (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-[#FE4A49] px-6 py-3 text-lg font-semibold text-white shadow-md transition hover:bg-red-600/90 focus:ring-2 focus:ring-[#FE4A49] focus:ring-offset-2 focus:outline-none disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Adding..." : "+ Add Transaction"}
          </button>
        </form>
      </section>
    </>
  );
};

export default AddTransaction;
