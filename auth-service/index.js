import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { connectProducer } from "./kafka/producer.js";  // ✅ import

dotenv.config();

const PORT = process.env.PORT || 3001;

connectDB();


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173","http://127.0.0.1:5173"],
  credentials: true
}));

// Routes
app.use("/api/auth", authRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || err });
});

// ✅ wrap everything in async start function
const start = async () => {
  try {
    await connectDB();           // ✅ connect MongoDB first
    await connectProducer();     // ✅ then connect Kafka producer
    
    app.listen(PORT, () => {
      console.log(`Auth service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start auth-service:", err);
    process.exit(1);  // ✅ crash loudly if startup fails
  }
};

start();

