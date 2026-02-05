import { login, logout } from "../auth/auth";
import logo from "../assets/uh-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function AuthBar({ user }) {
  // 1. Handle the "loading" state (undefined)
  // This prevents the "Login" button from flashing briefly before the user profile appears
  const isLoading = user === undefined;
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", to: "/" },
    { label: "My Profile", to: "/me" },
    { label: "All Tasks", to: "/tasks" },
    { label: "My Dashboard", to: "/dashboard" },
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "Build your Resume", to: "/resume-maker" },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

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
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(true)}
            className="inline-flex items-center justify-center w-10 h-10 rounded-full border hover:bg-gray-100 transition"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="w-6 h-6 text-slate-700"
            >
              <path
                d="M3 6h18M3 12h18M3 18h18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto">
              <div className="sticky top-0 z-10 bg-white border-b">
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="font-semibold">Menu</span>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={closeMenu}
                    className="w-9 h-9 rounded-full border hover:bg-gray-100 transition"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-2 p-5 pb-10">
                {menuItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={closeMenu}
                    className="px-4 py-3 rounded-lg text-base text-slate-900 hover:bg-slate-100 transition"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
