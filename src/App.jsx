import { HashRouter, Routes, Route } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import AuthBar from "./components/AuthBar";

import Landing from "./pages/Landing";
import Tasks from "./pages/Tasks";
import TaskDetails from "./pages/TaskDetails";
import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MyContributions from "./pages/MyContributions";


export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Loading...
      </div>
    );
  }

  return (
    <HashRouter>
      <AuthBar user={user} />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tasks" element={<Tasks user={user} />} />
        <Route path="/tasks/:taskId" element={<TaskDetails user={user} />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route
          path="/admin"
          element={
            user?.email === "appdroidplus7@gmail.com" ? (
              <AdminDashboard />
            ) : (
              <div className="p-6">Not authorized</div>
            )
          }
        />
        <Route
          path="/my-contributions"
          element={<MyContributions user={user} />}
        />


      </Routes>
    </HashRouter>
  );
}
