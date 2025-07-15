import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      get: (v) => Number(v.toFixed(2)),
      set: (v) => Number(Number(v).toFixed(2)),
    },
    type: {
      type: String,
      enum: ["Income", "Expense"], // Capitalized to match frontend
      required: true,
    },
    category: {
      type: String,
      required: function () {
        return this.type === "expense";
      },
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const transactionModel =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default transactionModel;
