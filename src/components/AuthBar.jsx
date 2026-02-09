import { login, logout } from "../auth/auth";
import logo from "../assets/uh-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AuthBar({ user }) {
  // 1. Handle the "loading" state (undefined)
  // This prevents the "Login" button from flashing briefly before the user profile appears
  const isLoading = user === undefined;
  const navigate = useNavigate();
  const menuItems = [
    { label: "Home", to: "/" },
    { label: "My Profile", to: "/me" },
    { label: "All Tasks", to: "/tasks" },
    { label: "My Dashboard", to: "/dashboard" },
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "Build your Resume", to: "/resume-maker" },
  ];

  useEffect(() => {
    document.documentElement.style.overflowX = "hidden";
    document.body.style.overflowX = "hidden";
    return () => {
      document.documentElement.style.overflowX = "";
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <div className="w-full bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-2">
        <a href="/" className="flex items-center gap-2 min-w-0">
          <img src={logo} alt="University Hub" className="h-9 w-auto" />
          <h1 className="text-base sm:text-xl font-bold text-indigo-600 truncate">
            University Hub
          </h1>
        </a>

        <nav className="sr-only">
          {menuItems.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded-lg" />
          ) : user ? (
            <>
              <img
                src={user.photoURL || "/default-avatar.png"}
                alt="avatar"
                onClick={() => navigate("/me")}
                className="w-8 h-8 rounded-full border cursor-pointer hover:opacity-90"
              />
              <span className="text-sm font-medium hidden sm:inline">
                {user.displayName}
              </span>
              <button
                onClick={logout}
                className="px-3 py-1 rounded-lg border hover:bg-gray-100 transition hidden sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="bg-indigo-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

