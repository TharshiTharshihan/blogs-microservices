import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Check login (optional)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate('/');
  }, [navigate]);

  const clearError = () => setError('');

  const handleChange = (e) => {
    clearError();
    setValidationError('');
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setValidationError('');

    if (form.password !== confirmPassword) {
      return setValidationError('Passwords do not match');
    }

    if (form.password.length < 6) {
      return setValidationError('Password must be at least 6 characters');
    }

    try {
      setLoading(true);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Save token if your backend sends it
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate('/my-blogs');

    } catch (err) {
      console.log("Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const displayError = validationError || error;

  return (
    <div className="min-h-screen bg-[#222831] flex items-center justify-center px-5">
      <div className="w-full max-w-md bg-[#16213e] border border-[#0f3460] rounded-2xl p-10 shadow-2xl">

        <div className="text-center mb-7">
          <h1 className="text-white text-2xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400 text-sm">Join the writing community</p>
        </div>

        {displayError && (
          <div className="bg-[#2a0a0f] border border-[#e94560] text-[#e94560] px-4 py-3 rounded-lg mb-5 text-sm">
            ⚠️ {displayError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B3EF1B]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B3EF1B]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B3EF1B]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-gray-400 text-xs font-semibold">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setValidationError('');
                setConfirmPassword(e.target.value);
              }}
              required
              className="w-full px-4 py-3 bg-[#0a0a1a] border border-[#0f3460] rounded-lg text-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#B3EF1B]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#B3EF1B] text-[#030300] py-3 rounded-lg font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#eaf60a] font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;