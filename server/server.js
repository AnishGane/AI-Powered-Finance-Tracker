import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoDB from "./config/mongoDB.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
mongoDB();

// CORS configuration
const corsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use("/api/user", userRouter);

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
