import transactionModel from "../models/transactionModel.js";

// Get all transactions for a user
export const getTransactions = async (req, res) => {
  try {
    const transactions = await transactionModel
      .find({
        userId: req.userId,
      })
      .sort({ date: -1 });
    // Convert amounts to numbers with 2 decimal places
    const formattedTransactions = transactions.map((t) => ({
      ...t.toObject(),
      amount: Number(t.amount.toFixed(2)),
    }));
    return res.json({ success: true, transactions: formattedTransactions });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return res
      .status(500)
      .json({ message: "Error fetching transactions", success: false });
  }
};

// Add a new controller to get transactions by userId from route param
// export const getTransactionsByUserId = async (req, res) => {
//   try {
//     const { userId } = req.params;

//     // Ensure the authenticated user is requesting their own data
//     if (req.userId?.toString() !== userId?.toString()) {
//       return res.status(403).json({ success: false, message: "Forbidden" });
//     }

//     const transactions = await transactionModel
//       .find({ userId })
//       .sort({ date: -1 });

//     const formattedTransactions = transactions.map((t) => ({
//       ...t.toObject(),
//       amount: Number(t.amount.toFixed(2)),
//     }));

//     return res.json({ success: true, transactions: formattedTransactions });
//   } catch (error) {
//     console.error("Error fetching transactions by userId:", error);
//     return res
//       .status(500)
//       .json({ message: "Error fetching transactions", success: false });
//   }
// };

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
    return res.json({
      transaction: {
        ...savedTransaction.toObject(),
        amount: Number(savedTransaction.amount.toFixed(2)),
      },
      success: true,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    return res
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

    return res.json({
      transaction: {
        ...updatedTransaction.toObject(),
        amount: Number(updatedTransaction.amount.toFixed(2)),
      },
      success: true,
    });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return res
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
    return res.json({
      message: "Transaction deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res
      .status(500)
      .json({ message: "Error deleting transaction", success: false });
  }
};
