import React, { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFinance } from "../context/FinanceContext";
import { MdClose, MdSend } from "react-icons/md";

const Chatbot = () => {
  const { api, token, username } = useFinance();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: `Hi${username ? `, ${username}` : ""}! Ask me anything about your finances.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const toggle = () => setOpen((v) => !v);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await api.post(
        "/api/ai/chat",
        { messages: [...messages, userMessage] },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (res.data?.success && res.data?.message) {
        setMessages((prev) => [...prev, res.data.message]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              res.data?.message || "Sorry, I couldn't reach the AI right now.",
          },
        ]);
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            e?.response?.data?.message ||
            e?.message ||
            "Sorry, I couldn't reach the AI right now.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        aria-label="Open chat"
        onClick={toggle}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-5 bottom-28 z-200 cursor-pointer rounded-full bg-[#FE4A49] p-4 text-white shadow-lg sm:right-8 sm:bottom-24"
      >
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M21 15a4 4 0 01-4 4H7l-4 4V7a4 4 0 014-4h10a4 4 0 014 4v8z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed right-4 bottom-44 z-200 flex h-[420px] w-[320px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl sm:right-8 sm:bottom-36 sm:h-[480px] sm:w-[360px]"
          >
            <div className="flex items-center justify-between border-b border-gray-100 bg-neutral-50 px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-800">
                SpendWise Assistant
              </h3>
              <button
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <MdClose size={18} />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "ml-auto bg-[#FE4A49] text-white" : "bg-neutral-100 text-gray-800"}`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="text-xs text-gray-500">Thinking...</div>
              )}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2 border-t border-gray-100 p-3"
            >
              <input
                type="text"
                placeholder="Ask about budgets, trends..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#FE4A49] focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#FE4A49] text-white shadow-sm transition hover:bg-red-600/90 disabled:opacity-60"
              >
                <MdSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
