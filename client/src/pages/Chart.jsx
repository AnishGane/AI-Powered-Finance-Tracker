import React, { useEffect, useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useFinance } from "../context/FinanceContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const palette = {
  incomeMain: "#10B981",
  incomeBg: "rgba(16, 185, 129, 0.15)",
  expenseMain: "#EF4444",
  expenseBg: "rgba(239, 68, 68, 0.15)",
  surface: "#FFFFFF",
  surfaceAlt: "#F7F4EA",
  text: "#111827",
  textMuted: "#6B7280",
  ring: "rgba(0,0,0,0.06)",
};

const niceCategoryColors = [
  "#6366F1",
  "#22C55E",
  "#F59E0B",
  "#EF4444",
  "#06B6D4",
  "#A855F7",
  "#84CC16",
  "#EC4899",
  "#14B8A6",
  "#F97316",
  "#3B82F6",
  "#10B981",
];

const Chart = () => {
  const { transactions, fetchTransactions } = useFinance();
  const [pieMode, setPieMode] = useState("Expense"); // "Income" | "Expense"
  const [filter, setFilter] = useState("All"); // "All" | "Week" | "Month" | "Year"

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { monthlyIncome, monthlyExpense, expenseByCategory, incomeByCategory } =
    useMemo(() => {
      const now = new Date();

      // filter transactions by selected filter
      const filteredTransactions = (transactions || []).filter((t) => {
        const d = new Date(t.date);
        if (isNaN(d)) return false;

        if (filter === "Month") {
          return (
            d.getMonth() === now.getMonth() &&
            d.getFullYear() === now.getFullYear()
          );
        }
        if (filter === "Week") {
          const startOfWeek = new Date(now);
          startOfWeek.setDate(now.getDate() - now.getDay());
          startOfWeek.setHours(0, 0, 0, 0);

          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);
          endOfWeek.setHours(23, 59, 59, 999);

          return d >= startOfWeek && d <= endOfWeek;
        }
        if (filter === "Year") {
          return d.getFullYear() === now.getFullYear();
        }
        return true; // All
      });

      const incomeByMonth = new Array(12).fill(0);
      const expenseByMonth = new Array(12).fill(0);
      const expenseCat = {};
      const incomeCat = {};

      filteredTransactions.forEach((t) => {
        const amount = Number(t.amount) || 0;
        const d = new Date(t.date);
        const m = Number.isNaN(d.getTime()) ? null : d.getMonth();

        if (m !== null && m >= 0 && m <= 11) {
          if (t.type === "Income") incomeByMonth[m] += amount;
          if (t.type === "Expense") expenseByMonth[m] += amount;
        }

        const key = (t.category || "Uncategorized").trim() || "Uncategorized";
        if (t.type === "Expense")
          expenseCat[key] = (expenseCat[key] || 0) + amount;
        if (t.type === "Income")
          incomeCat[key] = (incomeCat[key] || 0) + amount;
      });

      return {
        monthlyIncome: incomeByMonth,
        monthlyExpense: expenseByMonth,
        expenseByCategory: expenseCat,
        incomeByCategory: incomeCat,
      };
    }, [transactions, filter]);

  const barData = useMemo(
    () => ({
      labels: monthLabels,
      datasets: [
        {
          label: "Income",
          data: monthlyIncome,
          backgroundColor: palette.incomeBg,
          borderColor: palette.incomeMain,
          hoverBackgroundColor: palette.incomeMain,
          hoverBorderColor: palette.incomeMain,
          borderWidth: 2,
          borderRadius: 6,
          maxBarThickness: 26,
        },
        {
          label: "Expense",
          data: monthlyExpense,
          backgroundColor: palette.expenseBg,
          borderColor: palette.expenseMain,
          hoverBackgroundColor: palette.expenseMain,
          hoverBorderColor: palette.expenseMain,
          borderWidth: 2,
          borderRadius: 6,
          maxBarThickness: 26,
        },
      ],
    }),
    [monthlyIncome, monthlyExpense],
  );

  const barOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: palette.text,
            boxWidth: 12,
            boxHeight: 12,
            usePointStyle: true,
          },
        },
        title: {
          display: true,
          text: `Income vs Expense (${filter})`,
          color: palette.text,
          font: { size: 16, weight: 600 },
          padding: { top: 10, bottom: 10 },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = Number(ctx.parsed.y || 0);
              return `${ctx.dataset.label}: ₹${v.toLocaleString()}`;
            },
          },
        },
      },
      scales: {
        x: {
          ticks: { color: palette.textMuted },
          grid: { display: false },
        },
        y: {
          ticks: {
            color: palette.textMuted,
            callback: (v) => `₹${Number(v).toLocaleString()}`,
          },
          grid: { color: palette.ring },
        },
      },
    }),
    [filter],
  );

  const isExpenseMode = pieMode === "Expense";
  const pieMap = isExpenseMode ? expenseByCategory : incomeByCategory;
  const pieLabels = Object.keys(pieMap);
  const pieValues = Object.values(pieMap);
  const pieColors = pieLabels.map(
    (_, i) => niceCategoryColors[i % niceCategoryColors.length],
  );

  const pieData = {
    labels: pieLabels,
    datasets: [
      {
        data: pieValues,
        backgroundColor: pieColors.map((c) => c + "26"),
        borderColor: pieColors,
        borderWidth: 2,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: palette.text,
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: `${isExpenseMode ? "Expense" : "Income"} by Category (${filter})`,
        color: palette.text,
        font: { size: 16, weight: 600 },
        padding: { top: 10, bottom: 10 },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || "";
            const value = Number(ctx.parsed || 0);
            return `${label}: ₹${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  const hasAnyData = (transactions || []).length > 0;

  return (
    <div className="w-full px-4 py-6 sm:px-6 md:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <h1 className="mb-6 flex flex-col items-center gap-1.5 text-4xl font-semibold text-gray-900 sm:flex-row sm:text-3xl">
          Insights{" "}
          <span className="text-sm font-normal">
            (visualize your spending and earnings trends below)
          </span>
        </h1>

        {/* Filter Buttons */}
        <div className="mb-6 flex w-full justify-between gap-2 rounded-lg bg-neutral-100 p-1 shadow-md sm:w-fit">
          {["All", "Week", "Month", "Year"].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilter(mode)}
              className={`w-full cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition outline-none ${
                filter === mode
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {!hasAnyData ? (
          <div className="rounded-xl bg-white p-8 text-center shadow-md ring-1 ring-black/5">
            <p className="text-gray-600">
              No transactions yet. Add some to see your charts.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Bar Chart */}
            <section className="rounded-xl bg-white p-4 shadow-md ring-1 ring-black/5">
              <div className="h-[340px] w-full">
                <Bar data={barData} options={barOptions} />
              </div>
            </section>

            {/* Pie Chart */}
            <section className="rounded-xl bg-white p-4 shadow-md ring-1 ring-black/5">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex gap-2 rounded-lg bg-neutral-100 p-1">
                  {["Expense", "Income"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPieMode(mode)}
                      className={`cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition ${
                        pieMode === mode
                          ? "bg-white text-gray-900 shadow-sm"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-[340px] w-full">
                {pieLabels.length === 0 ? (
                  <div className="flex h-full items-center justify-center text-gray-600">
                    No {isExpenseMode ? "expense" : "income"} categories yet
                  </div>
                ) : (
                  <Pie data={pieData} options={pieOptions} />
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chart;
