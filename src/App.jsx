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
import AdminCertificates from "./pages/AdminCertificates";
import LeaderboardMaterials from "./pages/LeaderboardMaterials";
import UserProfile from "./pages/UserProfile";


// A small helper for protected routes
const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return (
      <div className="p-10 text-center">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-10 text-center">
        Please login to view this page.
      </div>
    );
  }

  return children;
};


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
        {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
        {/* Wrap pages that REQUIRE a user to prevent null errors */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute user={user} loading={loading}>
              <Dashboard user={user} />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={user} loading={loading}>
              {user?.email === "appdroidplus7@gmail.com" ? (
                <AdminDashboard user={user}/>
              ) : (
                <div className="p-6">Not authorized</div>
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-contributions"
          element={<MyContributions user={user} />}
        />

        <Route
  path="/leaderboard"
  element={
    <ProtectedRoute user={user} loading={loading}>
      <LeaderboardMaterials user={user} />
    </ProtectedRoute>
  }
/>

<Route
  path="/profile/:uid"
  element={
    <ProtectedRoute user={user} loading={loading}>
      <UserProfile />
    </ProtectedRoute>
  }
/>


        <Route
          path="/admin-certificates"
          element={
            <ProtectedRoute user={user} loading={loading}>
              {user?.email === "appdroidplus7@gmail.com" ? (
                <AdminCertificates user={user} />
              ) : (
                <div className="p-6">Not authorized</div>
              )}
            </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
}
