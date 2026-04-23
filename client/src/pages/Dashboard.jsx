// src/pages/MyBlogs.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar.jsx";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { user } = useAuth();  //  { _id, email, username }

  // Fetch logged-in user's blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog/my-blogs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

      const data = await res.json();
      console.log('====================================');
      console.log(data);
      console.log('====================================');

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch blogs");
      }

      setBlogs(data.data); // ✅ because backend returns { success, data }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // 🗑️ Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Delete failed");
      }

      //  remove deleted blog from UI
      setBlogs((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#0a0a1a] text-gray-200 px-5 py-10">

      {/* Header */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">My Blogs</h1>

        <button
          onClick={() => navigate("/create")}
          className="bg-[#e94560] text-white px-5 py-2 rounded-lg font-semibold hover:opacity-90"
        >
          + Create Blog
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center text-gray-400">Loading...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-center text-red-400">{error}</div>
      )}

      {/* Empty */}
      {!loading && blogs.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No blogs yet.
        </div>
      )}
        <h1>Welcome, {user?.username}</h1>  
        
      {/* Blog List */}
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-[#16213e] border border-[#0f3460] rounded-xl p-5"
          >
            <h2 className="text-xl font-semibold text-white mb-2">
              {blog.title}
            </h2>

            <p className="text-gray-400 mb-4 line-clamp-3">
              {blog.content}
            </p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/edit/${blog._id}`)}
                className="px-4 py-2 bg-blue-500 rounded-md text-sm font-semibold hover:opacity-90"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(blog._id)}
                className="px-4 py-2 bg-red-500 rounded-md text-sm font-semibold hover:opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div></>
  );
};

export default MyBlogs;