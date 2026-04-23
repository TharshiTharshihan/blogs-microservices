// src/pages/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' }); // ✅ use email (matches backend)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include', 
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      login(data);  // saves user to context + localStorage

      //  success
      navigate('/my-blogs');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#222831] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-[#16213e] border border-[#0f3460] rounded-2xl p-10 shadow-2xl">

        {/* Header */}
        <div className="text-center mb-7">
          <h1 className="text-white text-2xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-[#2a0a0f] border border-[#e94560] text-[#e94560] px-4 py-3 rounded-lg mb-5 text-sm">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B3EF1B]"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B3EF1B]"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#B3EF1B] text-[#030300]  py-3 rounded-lg font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm mt-6">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-[#eaf60a] font-semibold hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;