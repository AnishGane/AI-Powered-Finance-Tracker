import React from "react";

const AlertMessage = ({ totalExpense, balance }) => {
  if (balance === 0) {
    return (
      <div className="mb-6 flex items-center rounded-lg bg-blue-100 px-4 py-3 text-blue-800">
        <span className="mr-2 text-xl">ℹ️</span>
        Notice: Your balance is zero. Consider adding income or reducing
        expenses.
      </div>
    );
  }

  if (balance < 0) {
    return (
      <div className="mb-6 flex items-center rounded-lg bg-red-100 px-4 py-3 text-red-700">
        <span className="mr-2 text-xl">⚠️</span>
        Warning: Your expenses exceed your income! Your balance is negative.
      </div>
    );
  }
  if (balance < totalExpense) {
    return (
      <div className="mb-6 flex items-center rounded-lg bg-yellow-100 px-4 py-3 text-yellow-800">
        <span className="mr-2 text-xl">⚠️</span>
        Caution: Your balance is less than your total expenses. Consider
        reviewing your spending.
      </div>
    );
  }
  return (
    <div className="mb-6 flex items-center rounded-lg bg-green-100 px-4 py-3 text-green-800">
      <span className="mr-2 text-xl">✅</span>
      Good job! Your balance is healthy and above your expenses.
    </div>
  );
};

export default AlertMessage;
