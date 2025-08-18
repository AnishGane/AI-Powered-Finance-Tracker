import React from "react";

const CategorySummary = ({ transactions }) => {
  // Group by category and sum
  const summary =
    transactions?.reduce((acc, t) => {
      if (!acc[t.category]) {
        acc[t.category] = { amount: 0, type: t.type };
      }
      acc[t.category].amount += t.amount;
      return acc;
    }, {}) || {};

  return (
    <>
      <h1 className="mb-4 text-xl font-semibold sm:text-2xl">
        Category Summary
      </h1>
      <section className="mb-6 flex w-full flex-col gap-4 rounded-[8px] bg-neutral-200/60 px-3 pt-5 pb-2 shadow-md sm:px-6">
        {!transactions || transactions.length === 0 ? (
          <p className="text-md my-4 text-center text-gray-600">
            No transactions found.
          </p>
        ) : (
          <div className="mb-4 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-8 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(summary).map(([category, { amount, type }]) => (
              <div
                key={category}
                className={`flex items-center gap-4 rounded-[8px] border-l-4 bg-white p-5 shadow-md transition hover:scale-[1.03] hover:shadow-lg ${
                  type === "Income" ? "border-green-400" : "border-red-400"
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-full border-2 text-2xl font-bold ${
                    type === "Income"
                      ? "border-green-400 bg-green-200 text-green-700"
                      : "border-red-400 bg-red-200 text-red-700"
                  }`}
                >
                  {category.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col -space-y-0.5">
                  <span className="text-[17px] font-normal text-gray-800">
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </span>
                  <span
                    className={`text-xl font-bold ${
                      type === "Income" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    ₹{amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default CategorySummary;
