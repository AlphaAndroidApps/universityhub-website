import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MyContributions({ user }) {
  if (user === undefined) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }

  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;   // 🔒 critical

    async function fetchSubs() {
      const q = query(
        collection(db, "submissions"),
        where("userId", "==", user.uid)
      );
      const snap = await getDocs(q);
      setSubs(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }

    fetchSubs();
  }, [user]);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold">My Contributions</h2>

      {subs.length === 0 ? (
        <p className="text-gray-500">
          You haven’t submitted any work yet.
        </p>
      ) : (
        subs.map(s => (
          <div key={s.id} className="border p-4 rounded-xl">
            <p className="font-medium text-lg">{s.taskTitle}</p>

            <p className="text-sm text-gray-500">
              Status:{" "}
              <span
                className={
                  s.status === "approved"
                    ? "text-green-600"
                    : s.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {s.status}
              </span>
            </p>

            {s.reviewComment && (
              <p className="text-sm mt-1">
                Feedback: {s.reviewComment}
              </p>
            )}

            <div className="flex justify-between items-center mt-2">
              <Link
                to={`/tasks/${s.taskId}`}
                className="text-indigo-600 text-sm"
              >
                View task →
              </Link>

              {s.submittedAt && (
                <p className="text-xs text-gray-400">
                  {new Date(
                    s.submittedAt.seconds * 1000
                  ).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
