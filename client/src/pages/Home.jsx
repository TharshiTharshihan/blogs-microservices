// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchBlogs = async () => {
//       try {
//         const res = await blogAPI.getAllBlogs();
//         setBlogs(res.data);
//       } catch (err) {
//         setError('Failed to load blogs. Is the backend running?');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBlogs();
//   }, []);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-gray-200">

      {/* HERO SECTION */}
      <div className="bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] border-b border-[#e94560] px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
          Welcome to <span className="text-[#e94560]">BlogApp</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Discover stories, ideas, and expertise from writers everywhere.
        </p>

        {/* {!isLoggedIn && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-[#e94560] text-white px-7 py-3 rounded-full font-bold hover:opacity-90 transition"
            >
              Start Writing
            </Link>
            <Link
              to="/login"
              className="border-2 border-[#e94560] text-[#e94560] px-7 py-3 rounded-full font-bold hover:bg-[#e94560] hover:text-white transition"
            >
              Sign In
            </Link>
          </div>
        )}

        {isLoggedIn && (
          <Link
            to="/create"
            className="inline-block bg-[#e94560] text-white px-7 py-3 rounded-full font-bold hover:opacity-90 transition"
          >
            + Write a New Blog
          </Link>
        )} */}
      </div>

      {/* BLOG SECTION */}
      <div className="max-w-3xl mx-auto px-5 py-10">
        <div className="flex justify-between items-center mb-7">
          <h2 className="text-xl font-semibold text-white">
            📰 Latest Stories
          </h2>
          <span className="text-sm text-gray-500">
            {blogs.length} posts
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-gray-400 py-10">
            Loading blogs...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-[#2a0a0f] border border-[#e94560] text-[#e94560] px-4 py-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {/* Empty */}
        {/* {!loading && !error && blogs.length === 0 && (
          <div className="text-center text-gray-500 py-16">
            <p className="mb-4">No blogs yet. Be the first to write!</p>
            {/* {!isLoggedIn && (
              <Link
                to="/register"
                className="bg-[#e94560] text-white px-6 py-2 rounded-full font-semibold"
              >
                Get Started
              </Link>
            )} */}
          </div>
        )} */}

        {/* Blog List */}
        <div className="flex flex-col gap-6">
          {/* {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} showActions={false} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Home;