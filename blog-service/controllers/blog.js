import Blog  from "../models/blog.js";


export const createBlog = async (req, res, next) => {
  const { title, content, image } = req.body;

  try {
    if (!title || !content ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBlog = new Blog({
      title,
      content,
      image,
    });

    await newBlog.save();

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
    });
  } catch (err) {
    next(err);
  }
};


export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: blogs,
    });
  } catch (err) {
    next(err);
        res.status(500).json({ success: false, message: "failed to fetch blogs " });

  }
};

export const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (err) {
    next(err);
    res.status(500).json({ success: false, message: "failed to fetch blog for " + id });
  }
};

export const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, image } = req.body;   

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true }
    );
    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      data: updatedBlog,
    });

  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: "failed to update blog for " + id });
  }
};

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
    res.status(500).json({ success: false, message: "failed to delete blog for " + id });
  }
};

