import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/firebase";
import AuthBar from "./components/AuthBar";
import { useEffect, useState } from "react";

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
import MyProfile from "./pages/MyProfile";
import ResumeMaker from "./pages/ResumeMaker";
import PrintPreviewPage from "./components/preview/PrintPreviewPage";



const FullscreenLoader = ({ label = "Loading" }) => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-indigo-600 animate-bounce" />
        <span className="h-3 w-3 rounded-full bg-indigo-500 animate-bounce [animation-delay:120ms]" />
        <span className="h-3 w-3 rounded-full bg-indigo-400 animate-bounce [animation-delay:240ms]" />
      </div>
      <span className="text-sm font-semibold text-slate-700">
        {label}
      </span>
    </div>
  </div>
);

// A small helper for protected routes
const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return <FullscreenLoader label="Checking session" />;
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

const RouteLoadingOverlay = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search, location.hash]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center">
      <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg">
        <span className="h-3 w-3 rounded-full bg-indigo-600 animate-pulse" />
        <span className="text-sm font-semibold text-slate-700">
          Loading...
        </span>
      </div>
    </div>
  );
};


export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <FullscreenLoader label="Loading" />;
  }

  return (
    <HashRouter>
      <AuthBar user={user} />
      <RouteLoadingOverlay />

      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/resume-maker" element={<ResumeMaker />} />
<Route path="/print-preview" element={<PrintPreviewPage />} />
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

        <Route
  path="/me"
  element={
    <ProtectedRoute user={user} loading={loading}>
      <MyProfile />
    </ProtectedRoute>
  }
/>


      </Routes>
    </HashRouter>
  );
}
