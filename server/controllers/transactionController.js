// import Transaction from "../models/transactionModel.js";

// export const addTransaction = async (req, res) => {
//   try {
//     const { amount, type, category, date, description } = req.body;
//     const userId = req.body.userId;
//     if (!amount || !type || !category || !date) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing required fields" });
//     }
//     const transaction = new Transaction({
//       amount,
//       type,
//       category,
//       date,
//       description,
//       user: userId,
//     });
//     await transaction.save();
//     res.status(201).json({ success: true, transaction });
//   } catch (error) {
//     console.error("Add transaction error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to add transaction" });
//   }
// };

// // Edit a transaction
// export const editTransaction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.body.userId;
//     const updateData = req.body;
//     const transaction = await Transaction.findOneAndUpdate(
//       { _id: id, user: userId },
//       updateData,
//       { new: true }
//     );
//     if (!transaction) {
//       return res.status(404).json({
//         success: false,
//         message: "Transaction not found or unauthorized",
//       });
//     }
//     res.json({ success: true, transaction });
//   } catch (error) {
//     console.error("Edit transaction error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to edit transaction" });
//   }
// };

// // Delete a transaction
// export const deleteTransaction = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.body.userId;
//     const transaction = await Transaction.findOneAndDelete({
//       _id: id,
//       user: userId,
//     });
//     if (!transaction) {
//       return res.status(404).json({
//         success: false,
//         message: "Transaction not found or unauthorized",
//       });
//     }
//     res.json({ success: true, message: "Transaction deleted" });
//   } catch (error) {
//     console.error("Delete transaction error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to delete transaction" });
//   }
// };

// // Get all transactions for the logged-in user
// export const getAllTransactions = async (req, res) => {
//   try {
//     // For GET, userId is set on req.userId by middleware
//     const userId = req.userId;
//     const transactions = await Transaction.find({ user: userId }).sort({
//       date: -1,
//     });
//     res.json({ success: true, transactions });
//   } catch (error) {
//     console.error("Get transactions error:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Failed to fetch transactions" });
//   }
// };

import transactionModel from "../models/transactionModel.js";

// Get all transactions for a user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel.find({
      userId: req.userId,
    });
    // Convert amounts to numbers with 2 decimal places
    const formattedTransactions = transactions.map((t) => ({
      ...t.toObject(),
      amount: Number(t.amount.toFixed(2)),
    }));
    res.json(formattedTransactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res
      .status(500)
      .json({ message: "Error fetching transactions", success: false });
  }
};

// Add a new transaction
export const addTransaction = async (req, res) => {
  try {
    const { description, amount, type, category, date } = req.body;

    // Ensure amount is a number with 2 decimal places
    const formattedAmount = Number(Number(amount).toFixed(2));

    const newTransaction = new transactionModel({
      description,
      amount: formattedAmount,
      type,
      category,
      date,
      userId: req.body.userId,
    });

    const savedTransaction = await newTransaction.save();
    res.json({
      transaction: {
        ...savedTransaction.toObject(),
        amount: Number(savedTransaction.amount.toFixed(2)),
      },
      success: true,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res
      .status(500)
      .json({ message: "Error adding transaction", success: false });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, amount, type, category, date } = req.body;

    const transaction = await transactionModel.findOne({
      _id: id,
      userId: req.body.userId,
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found", success: false });
    }

    // Ensure amount is a number with 2 decimal places
    const formattedAmount = Number(Number(amount).toFixed(2));

    const updatedTransaction = await transactionModel.findByIdAndUpdate(
      id,
      {
        description,
        amount: formattedAmount,
        type,
        category,
        date,
      },
      { new: true }
    );

    res.json({
      transaction: {
        ...updatedTransaction.toObject(),
        amount: Number(updatedTransaction.amount.toFixed(2)),
      },
      success: true,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    res
      .status(500)
      .json({ message: "Error updating transaction", success: false });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const transaction = await transactionModel.findOne({
      _id: id,
      userId: req.body.userId,
    });

    if (!transaction) {
      return res
        .status(404)
        .json({ message: "Transaction not found", success: false });
    }

    await transactionModel.findByIdAndDelete(id);
    res.json({ message: "Transaction deleted successfully", success: true });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res
      .status(500)
      .json({ message: "Error deleting transaction", success: false });
  }
};
