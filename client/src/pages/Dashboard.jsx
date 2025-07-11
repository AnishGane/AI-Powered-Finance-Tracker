import React, { useState } from "react";

const dummyTransactions = [
  {
    id: 1,
    type: "Income",
    category: "Salary",
    amount: 50000,
    date: "2024-06-01",
  },
  {
    id: 2,
    type: "Expense",
    category: "Groceries",
    amount: 3200,
    date: "2024-06-03",
  },
  {
    id: 3,
    type: "Expense",
    category: "Transport",
    amount: 1200,
    date: "2024-06-04",
  },
  {
    id: 4,
    type: "Income",
    category: "Freelance",
    amount: 8000,
    date: "2024-06-05",
  },
  {
    id: 5,
    type: "Expense",
    category: "Utilities",
    amount: 2100,
    date: "2024-06-06",
  },
];

const sidebarLinks = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6m-6 0H7m6 0v6m0 0h6m-6 0H7"
        />
      </svg>
    ),
  },
  {
    key: "charts",
    label: "Charts",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11 3v18M4 12h16"
        />
      </svg>
    ),
  },
  {
    key: "transactions",
    label: "Transactions",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    key: "settings",
    label: "Settings",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
];

const Dashboard = ({ showMobileNav = true }) => {
  const [selected, setSelected] = useState("dashboard");

  // Example summary data
  const totalIncome = dummyTransactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = dummyTransactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-[#F7F4EA] md:flex-row">
        {/* Sidebar for md+ screens */}
        <aside className="hidden w-64 flex-shrink-0 flex-col items-stretch rounded-r-2xl border-r border-gray-100 bg-white px-4 py-10 shadow-xl md:flex">
          <div className="mb-10 flex items-center justify-center">
            <span className="text-2xl font-extrabold tracking-wide text-gray-900 select-none">
              <span className="text-[#FE4A49]">&#9679; </span>SpendWise
            </span>
          </div>
          <nav className="flex w-full flex-col justify-start gap-3">
            {sidebarLinks.map((link) => (
              <button
                key={link.key}
                className={`flex w-full items-center rounded-xl px-5 py-3 font-medium text-gray-700 transition hover:bg-[#FE4A49]/15 hover:text-[#FE4A49] focus:bg-[#FE4A49]/10 focus:ring-2 focus:ring-[#FE4A49]/30 focus:outline-none ${selected === link.key ? "bg-[#FE4A49]/20 text-[#FE4A49] shadow-md" : ""}`}
                onClick={() => setSelected(link.key)}
              >
                {link.icon}
                <span className="ml-2 text-base">{link.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-full flex-1 bg-neutral-400 px-2 py-8 pb-8 md:px-8">
          {selected === "dashboard" && (
            <>
              {/* Dashboard Header */}
              <section className="mt-2 mb-8 w-full max-w-5xl text-left">
                <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
                  Dashboard
                </h1>
                <p className="text-lg text-gray-600">
                  Welcome to your finance overview. Track your income, expenses,
                  and financial health at a glance.
                </p>
              </section>

              {/* Summary Cards */}
              <section className="mb-12 grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg">
                  <span className="mb-1 text-sm text-gray-500">
                    Total Income
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{totalIncome.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg">
                  <span className="mb-1 text-sm text-gray-500">
                    Total Expense
                  </span>
                  <span className="text-2xl font-bold text-red-500">
                    ₹{totalExpense.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-lg">
                  <span className="mb-1 text-sm text-gray-500">Balance</span>
                  <span
                    className={`text-2xl font-bold ${balance >= 0 ? "text-green-600" : "text-red-500"}`}
                  >
                    ₹{balance.toLocaleString()}
                  </span>
                </div>
              </section>
            </>
          )}

          {selected === "charts" && (
            <section className="mb-12 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
                <span className="mb-2 text-gray-500">Spending Breakdown</span>
                <div className="flex h-40 w-full items-center justify-center text-gray-300">
                  [Pie/Bar Chart Placeholder]
                </div>
              </div>
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl bg-white p-6 shadow-lg">
                <span className="mb-2 text-gray-500">Income vs Expense</span>
                <div className="flex h-40 w-full items-center justify-center text-gray-300">
                  [Line/Area Chart Placeholder]
                </div>
              </div>
            </section>
          )}

          {selected === "transactions" && (
            <section className="w-full max-w-5xl">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Recent Transactions
              </h2>
              <div className="overflow-x-auto rounded-2xl bg-white shadow-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-[#FE4A49]/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {dummyTransactions.map((t) => (
                      <tr key={t.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {t.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${t.type === "Income" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                          >
                            {t.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {t.category}
                        </td>
                        <td
                          className={`px-6 py-4 font-bold whitespace-nowrap ${t.type === "Income" ? "text-green-600" : "text-red-500"}`}
                        >
                          ₹{t.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {selected === "settings" && (
            <section className="w-full max-w-5xl">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Settings
              </h2>
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                [Settings Placeholder]
              </div>
            </section>
          )}
        </main>
      </div>
      {/* Mobile Bottom Nav (should be below footer) */}
      {showMobileNav && (
        <div className="md:hidden">
          <div className="h-0" />
          <nav className="fixed right-0 bottom-0 left-0 z-30 flex items-center justify-between rounded-t-2xl border-t border-gray-200 bg-white px-2 py-1 shadow-2xl">
            {sidebarLinks.map((link) => (
              <button
                key={link.key}
                className={`flex flex-1 flex-col items-center justify-center rounded-xl py-2 text-gray-500 transition hover:bg-[#FE4A49]/10 hover:text-[#FE4A49] focus:ring-2 focus:ring-[#FE4A49]/20 focus:outline-none ${selected === link.key ? "bg-[#FE4A49]/10 text-[#FE4A49]" : ""}`}
                onClick={() => setSelected(link.key)}
              >
                {link.icon}
                <span className="mt-1 text-xs font-medium md:hidden">
                  {link.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Dashboard;
