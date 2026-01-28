import { login, logout } from "../auth/auth";
import logo from "../assets/uh-logo.png";
import { useNavigate } from "react-router-dom";

export default function AuthBar({ user }) {
  // 1. Handle the "loading" state (undefined)
  // This prevents the "Login" button from flashing briefly before the user profile appears
  const isLoading = user === undefined;
  const navigate = useNavigate(); // ✅ inside component

  return (
    <div className="w-full bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="University Hub" className="h-9 w-auto" />
          <h1 className="text-xl font-bold text-indigo-600">University Hub</h1>
        </a>

        <div className="flex items-center gap-3">
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
                className="px-3 py-1 rounded-lg border hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </div>
  );
}