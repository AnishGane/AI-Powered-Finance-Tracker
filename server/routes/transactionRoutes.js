// import express from "express";
// import { validateToken } from "../middlewares/auth.js";
// import {
//   addTransaction,
//   editTransaction,
//   deleteTransaction,
//   getAllTransactions,
// } from "../controllers/transactionController.js";

// const router = express.Router();

// // Add transaction
// router.post("/add", validateToken, addTransaction);
// // Edit transaction
// router.put("/edit/:id", validateToken, editTransaction);
// // Delete transaction
// router.delete("/delete/:id", validateToken, deleteTransaction);
// // Get all transactions
// router.get("/all", validateToken, getAllTransactions);

// export default router;

import express from "express";
import { validateToken } from "../middlewares/auth.js";
import {
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../controllers/transactionController.js";

const router = express.Router();

// All routes are protected with authentication
router.use(validateToken);

// Transaction routes
router.get("/all", getTransactions);
router.post("/add", addTransaction);
router.put("/edit/:id", updateTransaction);
router.delete("/delete/:id", deleteTransaction);

export default router;
