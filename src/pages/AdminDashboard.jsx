import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

export default function AdminDashboard({ user }) {
  if (user === undefined) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPending() {
      const q = query(
        collection(db, "submissions"),
        where("status", "==", "pending")
      );
      const snap = await getDocs(q);
      setSubs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    fetchPending();
  }, []);

  const updateStatus = async (id, status, feedback) => {
    await updateDoc(doc(db, "submissions", id), {
      status,
      reviewComment: feedback || ""
    });

    // remove from UI
    setSubs(subs.filter(s => s.id !== id));
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">
        Admin Review Panel
      </h2>

      {subs.length === 0 && (
        <p className="text-gray-500">
          No pending submissions 🎉
        </p>
      )}

      {subs.map(s => (
        <ReviewCard
          key={s.id}
          sub={s}
          onUpdate={updateStatus}
        />
      ))}
    </div>
  );
}

function ReviewCard({ sub, onUpdate }) {
  const [feedback, setFeedback] = useState("");

  return (
    <div className="border p-4 rounded-xl space-y-2">
      <p className="font-semibold">{sub.taskTitle}</p>
      <p className="text-sm text-gray-500">
        By: {sub.userName}
      </p>
      <p className="text-sm">
        Time spent: {sub.timeSpent} hrs
      </p>

      <a
        href={sub.url}
        target="_blank"
        className="text-indigo-600 text-sm"
      >
        View submission →
      </a>

      <textarea
        placeholder="Feedback to user (optional)"
        value={feedback}
        onChange={e => setFeedback(e.target.value)}
        rows={2}
        className="w-full p-2 border rounded-lg mt-2"
      />

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onUpdate(sub.id, "approved", feedback)}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Approve
        </button>
        <button
          onClick={() => onUpdate(sub.id, "rejected", feedback)}
          className="bg-red-600 text-white px-3 py-1 rounded"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
