import express from "express";
import blogRoutes from "./routes/blog.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectProducer } from "./kafka/producer.js";  // ✅ import


dotenv.config();

const PORT = process.env.PORT || 3002;


const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  credentials: true
}));

// Routes
app.use("/api/blog", blogRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || err });
});

const start = async () => {
  try {
    await connectDB();           
    await connectProducer();     
    
    app.listen(PORT, () => {
      console.log(`Auth service running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start auth-service:", err);
    process.exit(1);  
  }
};

start();
