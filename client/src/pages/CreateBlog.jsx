// src/pages/CreateBlog.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setError(null);
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/blog/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include", // 🔐 important
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create blog");
      }

      // ✅ success → redirect
      navigate("/my-blogs");

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-gray-200 flex items-center justify-center px-5 py-10">
      <div className="w-full max-w-2xl bg-[#16213e] border border-[#0f3460] rounded-2xl p-8 shadow-2xl">

        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-6 text-center">
          Create New Blog
        </h1>

        {/* Error */}
        {error && (
          <div className="bg-[#2a0a0f] border border-[#e94560] text-[#e94560] px-4 py-3 rounded-lg mb-5 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-semibold">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-semibold">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="6"
              placeholder="Write your blog..."
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
            />
          </div>

          {/* Image URL */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-sm font-semibold">
              Image URL (optional)
            </label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-[#e94560]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#e94560] text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Publishing..." : "Publish Blog"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;