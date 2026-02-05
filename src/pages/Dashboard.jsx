import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyTasksPanel from "../components/MyTasksPanel";

const ADMIN_EMAIL = "appdroidplus7@gmail.com"; // change if needed

export default function Dashboard({ user }) {
  const Loader = ({ label }) => (
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

  if (user === undefined) {
    return <Loader label="Checking session" />;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }

  const [assigned, setAssigned] = useState([]);
  const [subs, setSubs] = useState([]);
  const [requestedCount, setRequestedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (user === undefined) {
      return <div className="p-6">Checking session...</div>;
    }

    if (!user) {
      return <div className="p-6">Please login</div>;
    }
    async function fetchAll() {
      const tq = query(
        collection(db, "tasks"),
        where("assignedTo", "==", user.uid),
        where("status", "==", "in_progress")
      );
      const tSnap = await getDocs(tq);
      setAssigned(tSnap.docs.map(d => ({ id: d.id, ...d.data() })));

      const sq = query(
        collection(db, "submissions"),
        where("userId", "==", user.uid)
      );
      const sSnap = await getDocs(sq);
      setSubs(sSnap.docs.map(d => d.data()));

      const allTasksSnap = await getDocs(collection(db, "tasks"));
      const requested = allTasksSnap.docs.filter((d) => {
        const data = d.data();
        return data.requests?.some((r) => r.uid === user.uid);
      }).length;
      setRequestedCount(requested);

      setLoading(false);
    }

    fetchAll();
  }, [user]);

  if (loading) return <Loader label="Loading" />;

  const approved = subs.filter(s => s.status === "approved").length;
  const pending = subs.filter(s => s.status === "under_review").length;


    function NavButton({ to, label }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-full text-sm font-medium 
                 bg-gray-100 text-gray-700 
                 hover:bg-indigo-100 hover:text-indigo-700 
                 transition"
    >
      {label}
    </Link>
  );
}


  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* <h2 className="text-2xl font-bold">My Dashboard</h2> */}

      {/* NAV OPTIONS */}
      {/* <div className="flex gap-3 flex-wrap">
        <NavButton to="/tasks" label="All Tasks" />
        {isAdmin && <NavButton to="/admin" label="Admin" />}
    </div> */}


      {/* STATS REMOVED */}

      {/* MY TASKS */}
      <div className="bg-white/80 backdrop-blur rounded-2xl p-5 border">
        <MyTasksPanel
          user={user}
          userId={user.uid}
          title=""
          headerActions={
            <div className="flex items-center gap-2 text-sm">
              <NavButton to="/tasks" label="All Tasks" />
              {isAdmin && <NavButton to="/admin" label="Admin" />}
            </div>
          }
        />
      </div>

      {/* SUBMISSIONS */}
      {/* <div>
        <h3 className="font-semibold mb-3">My submissions</h3>
        {subs.slice(0, 5).map((s, i) => (
          <div key={i} className="border p-3 rounded-lg mb-2">
            <p className="font-medium">{s.taskTitle}</p>
            <p className="text-sm text-gray-500">
              Status: {s.status}
            </p>
          </div>
        ))}
      </div> */}
    </div>
  );
}
