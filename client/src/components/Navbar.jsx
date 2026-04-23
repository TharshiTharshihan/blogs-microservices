import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#16213e] border-b border-[#0f3460] px-6 py-4 flex justify-between items-center">
      
      {/* Logo */}
      <Link to="/" className="text-white font-bold text-lg">
        BlogApp
      </Link>

      {/* Right Side */}
      {user ? (
        <div className="flex items-center gap-4">
          <span className="text-gray-300 text-sm">
            👋 {user.username}
          </span>

          <Link
            to="/my-blogs"
            className="text-[#e94560] font-semibold hover:underline"
          >
            My Blogs
          </Link>

          <button
            onClick={handleLogout}
            className="bg-[#e94560] px-4 py-2 rounded-lg text-white text-sm hover:opacity-90"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link
            to="/login"
            className="text-[#e94560] font-semibold hover:underline"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-[#e94560] px-4 py-2 rounded-lg text-white text-sm"
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;