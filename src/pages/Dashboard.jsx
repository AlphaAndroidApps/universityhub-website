import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { resignTask } from "../services/tasks";

const ADMIN_EMAIL = "appdroidplus7@gmail.com"; // change if needed

export default function Dashboard({ user }) {
  if (user === undefined) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }

  const [assigned, setAssigned] = useState([]);
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.email === ADMIN_EMAIL;

  useEffect(() => {
    if (!user?.uid) return;   // 🔒 critical
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

      setLoading(false);
    }

    fetchAll();
  }, [user]);

  if (loading) return <div className="p-6">Loading...</div>;

  const approved = subs.filter(s => s.status === "approved").length;
  const pending = subs.filter(s => s.status === "under_review").length;

    const handleResign = async (taskId) => {
    const ok = confirm("Are you sure you want to resign from this task?");
    if (!ok) return;

    await resignTask(taskId, user.uid);
    alert("You have resigned from the task.");

    setAssigned(prev => prev.filter(t => t.id !== taskId));
    };


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
      <h2 className="text-2xl font-bold">My Dashboard</h2>

      {/* NAV OPTIONS */}
      <div className="flex gap-3 flex-wrap">
        <NavButton to="/tasks" label="All Tasks" />
        <NavButton to="/my-contributions" label="My Contributions" />
        {isAdmin && <NavButton to="/admin" label="Admin" />}
    </div>


      {/* STATS */}
      <div className="grid grid-cols-4 gap-4">
        <Stat label="Assigned" value={assigned.length} />
        <Stat label="Submitted" value={subs.length} color="yellow" />
        <Stat label="Under Review" value={pending} color="green" />
        <Stat label="Approved" value={approved} />
        
      </div>

      {/* ASSIGNED TASKS */}
      <div>
        <h3 className="font-semibold mb-3">Assigned to me</h3>
        {assigned.length === 0 ? (
          <p className="text-gray-500">No active tasks.</p>
        ) : (
          assigned.map(t => (
            <div key={t.id} className="border p-4 rounded-xl mb-2">
              <p className="font-medium">{t.title}</p>
              {t.preview && (
                <p className="text-sm text-gray-600 mt-1">
                    {t.preview}
                </p>
                )}
              <p className="text-sm text-gray-500">
                Due: {t.deadline || "No deadline"}
              </p>
              <div className="flex gap-3 mt-3">
  <Link to={`/tasks/${t.id}`}>
    <button className="bg-indigo-500/90 text-white px-4 py-2 rounded-lg 
                       hover:bg-indigo-600 transition text-sm">
      Open
    </button>
  </Link>

  <button
    onClick={() => handleResign(t.id)}
    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg 
               hover:bg-red-100 hover:text-red-600 
               transition text-sm"
  >
    Resign
  </button>
</div>


            </div>
          ))
        )}
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

function Stat({ label, value, color }) {
  const colors = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    darkGreen: "bg-green-200 text-green-900",

  };

  return (
    <div className={`p-4 rounded-xl ${colors[color] || "bg-gray-100"}`}>
      <p className="text-sm">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}
