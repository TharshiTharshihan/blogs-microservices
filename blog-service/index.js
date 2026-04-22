import express from "express";
import blogRoutes from "./routes/blog.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
dotenv.config();

const PORT = process.env.PORT || 3002;

connectDB();


const app = express();

app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// Routes
app.use("/api", blogRoutes);

// Error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message || err });
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
