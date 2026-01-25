import { login, logout } from "../auth/auth";
import logo from "../assets/uh-logo.png";

export default function AuthBar({ user }) {
  return (
    <div className="w-full bg-white/70 backdrop-blur border-b">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">
        
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="University Hub"
            className="h-9 w-auto"
          />
          <h1 className="text-xl font-bold text-indigo-600">
            University Hub
          </h1>
        </a>

        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={user.photoURL}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium">
              {user.displayName}
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 rounded-lg border hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Login with Google
          </button>
        )}
      </div>
    </div>
  );
}
