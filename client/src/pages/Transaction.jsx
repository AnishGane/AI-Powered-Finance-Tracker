import React, { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";
import toast from "react-hot-toast";
import { MdEdit, MdDelete } from "react-icons/md";

const Transaction = () => {
  const {
    transactions,
    currency,
    fetchTransactions,
    deleteTransaction,
    editTransaction,
  } = useFinance();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTx, setEditTx] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id) => {
    toast((t) => (
      <span>
        Are you sure you want to delete this transaction?
        <div className="mt-2 flex gap-2">
          <button
            className="cursor-pointer rounded bg-red-500 px-3 py-1 text-xs text-white hover:bg-red-700"
            onClick={async () => {
              await deleteTransaction(id);
              fetchTransactions();
              toast.dismiss(t.id);
              toast.success("Transaction deleted!");
            }}
          >
            Yes
          </button>
          <button
            className="cursor-pointer rounded bg-gray-300 px-3 py-1 text-xs hover:bg-gray-400"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </span>
    ));
  };

  const handleEditClick = (tx) => {
    setEditTx(tx);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (updatedTx) => {
    const res = await editTransaction(editTx._id, updatedTx);
    if (res && res.success) {
      toast.success("Transaction updated!");
      setEditModalOpen(false);
      setEditTx(null);
      fetchTransactions();
    } else {
      toast.error(res?.message || "Failed to update transaction");
    }
  };

  // EditTransactionForm: Separate form for editing a transaction
  const EditTransactionForm = ({ initialValues, onEdit, loading, onClose }) => {
    const [amount, setAmount] = useState(initialValues.amount || "");
    const [type, setType] = useState(initialValues.type || "Income");
    const [category, setCategory] = useState(initialValues.category || "");
    const [date, setDate] = useState(
      initialValues.date ? initialValues.date.slice(0, 10) : "",
    );
    const [description, setDescription] = useState(
      initialValues.description || "",
    );
    const [formLoading, setFormLoading] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      setFormLoading(true);
      await onEdit({ amount, type, category, date, description });
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
          <h2 className="mb-7 text-2xl font-semibold">Edit Transaction</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="number"
              id="edit-amount"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-lg shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder=" "
            />
            <label
              htmlFor="edit-amount"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Amount
            </label>
          </div>
          <div className="relative">
            <select
              id="edit-type"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-lg shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            <label
              htmlFor="edit-type"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Type
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="edit-category"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-lg shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder=" "
            />
            <label
              htmlFor="edit-category"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Category
            </label>
          </div>
          <div className="relative">
            <input
              type="date"
              id="edit-date"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-lg shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              placeholder=" "
            />
            <label
              htmlFor="edit-date"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Date
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="edit-description"
              className="peer h-16 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 pt-6 pb-2 text-lg shadow-sm transition outline-none focus:border-[#FE4A49] focus:bg-white focus:ring-2 focus:ring-[#FE4A49]/20"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=" "
            />
            <label
              htmlFor="edit-description"
              className="pointer-events-none absolute top-2 left-3 bg-white px-1 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#FE4A49]"
            >
              Description
            </label>
          </div>
          <button
            type="submit"
            className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#FE4A49] to-[#c9302c] px-4 py-3 text-lg font-normal text-white shadow-md transition hover:from-[#e63b38] hover:to-[#a81e1c] focus:ring-2 focus:ring-[#FE4A49]/40 focus:outline-none"
            disabled={formLoading || loading}
          >
            {formLoading || loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-[#F7F4EA] p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        All Transactions
      </h1>
      {!transactions || transactions.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500 shadow-sm">
          No transactions found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-[8px] shadow-md">
          <div className="overflow-hidden rounded-[8px] border border-gray-100 bg-white">
            <table className="w-full min-w-[700px] border-collapse">
              <thead className="bg-neutral-50 font-bold">
                <tr>
                  <th className="px-4 py-3.5 text-center text-xs tracking-wide text-gray-600 uppercase">
                    Date
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs tracking-wide text-gray-600 uppercase">
                    Type
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs tracking-wide text-gray-600 uppercase">
                    Category
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs tracking-wide text-gray-600 uppercase">
                    Description
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs tracking-wide text-gray-600 uppercase">
                    Amount
                  </th>
                  <th className="px-4 py-3.5 text-center text-xs tracking-wide text-gray-600 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-center">
                {transactions.map((tx) => (
                  <tr key={tx._id} className="hover:bg-neutral-50/60">
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {new Date(tx.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${tx.type === "Income" ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100" : "bg-rose-50 text-rose-700 ring-1 ring-rose-100"}`}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {tx.category}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {tx.description}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                      {currency} {Number(tx.amount).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-gray-50"
                          onClick={() => handleEditClick(tx)}
                          aria-label="Edit"
                        >
                          <MdEdit size={18} />
                        </button>
                        <button
                          className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:bg-rose-50 hover:text-rose-600"
                          onClick={() => handleDelete(tx._id)}
                          aria-label="Delete"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Edit Transaction Modal */}
      {editModalOpen && (
        <>
          {/* Backdrop Blur Layer */}
          <div className="fixed inset-0 z-199 bg-black/30 backdrop-blur-sm"></div>
          {/* Modal */}
          <div className="fixed inset-0 z-200 mx-3 flex items-center justify-center sm:mx-0">
            <EditTransactionForm
              initialValues={editTx}
              onEdit={handleEditSubmit}
              onClose={() => setEditModalOpen(false)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Transaction;
