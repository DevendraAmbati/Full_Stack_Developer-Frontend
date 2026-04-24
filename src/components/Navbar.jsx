import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  const [open, setOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setOpen(false);
  };

  const linkStyle = (path) =>
    `block px-4 py-2 rounded-lg transition ${
      location.pathname === path
        ? "bg-white text-indigo-600 font-semibold"
        : "text-white hover:bg-white/20"
    }`;

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-md">
      
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-white cursor-pointer"
        >
          TaskFlow
        </h1>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/" className={linkStyle("/")}>Home</Link>

          {!token ? (
            <>
              <Link to="/login" className={linkStyle("/login")}>Login</Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold hover:bg-gray-200"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/task" className={linkStyle("/task")}>Tasks</Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setOpen(false)} className={linkStyle("/")}>
            Home
          </Link>

          {!token ? (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className={linkStyle("/login")}>
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 rounded-lg bg-white text-indigo-600 font-semibold"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link to="/task" onClick={() => setOpen(false)} className={linkStyle("/task")}>
                Tasks
              </Link>

              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 rounded-lg bg-red-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}