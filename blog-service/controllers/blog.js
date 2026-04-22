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
      image,userId: req.user.id
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

//loggedin user can view his blogs
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ userId: req.user.id }).sort({ createdAt: -1 });
     res.status(200).json({
      success: true,
      data: myBlogs,
    });
  } catch (err) {
    res.status(500).json({success: false, message: err.message });
  }
};

// to view a blog
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
  }
};


//only owner can update and delete 
export const updateBlog = async (req, res, next) => {
  const { id } = req.params;
  const { title, content, image } = req.body;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this blog" });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, image },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: updatedBlog,
    });

  } catch (error) {
    next(error);
  }
};


export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🔒 Ownership check
    if (blog.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to delete this blog" });
    }

    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    next(error);
  }
};
