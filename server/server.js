import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

const app = express();

// CORS configuration
const corsOptions = {
  origin: ["https://ai-powered-finance-tracker-qjzn.onrender.com/"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};
mongoDB();

//middleware
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRoutes);
app.use("/api/ai", aiRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("=================================");
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📧 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Frontend URL: http://localhost:5173`);
  console.log("=================================");
});
