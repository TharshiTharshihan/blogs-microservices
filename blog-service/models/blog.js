import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  image: {
    type: String,
    default: [
      "https://i0.wp.com/woodwoon.com/wp-content/uploads/2023/01/SOS0002-sofa-set-sofa-design-furniture-store-in-pakistan.webp?fit=1024%2C787&ssl=1",
    ],
  },
  

},{ timestamps: true });

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
