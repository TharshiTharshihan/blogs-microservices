import express from "express";
import {  createBlog,getBlogs ,getMyBlogs,getBlogById,updateBlog, deleteBlog} from "../controllers/blog.js";
import { verifyToken } from "../../auth-service/middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createBlog);
router.get("/", getBlogs);
router.get("/my-blogs", verifyToken, getMyBlogs);
router.get("/:id", getBlogById);
router.put("/:id", verifyToken, updateBlog);
router.delete("/:id", verifyToken, deleteBlog);

export default router;