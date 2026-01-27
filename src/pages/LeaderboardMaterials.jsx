import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";


export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();


  const toTitleCase = (str = "") =>
  str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")


  useEffect(() => {
    const fetchLeaders = async () => {
      const q = query(
        collection(db, "leaderboard"),
        orderBy("contributions", "desc"),
        limit(10)
      );

      const snap = await getDocs(q);
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLeaders(data);
      setLoading(false);
    };

    fetchLeaders();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading leaderboard...</div>;
  }

  const updatedAt = leaders[0]?.lastUpdated?.toDate?.();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2 text-center">
        🏆 Top Contributors
      </h1>

      {updatedAt && (
        <p className="text-sm text-gray-500 text-center mb-6">
          Updated {updatedAt.toLocaleString()}
        </p>
      )}

      {/* Top 3 podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {leaders.slice(0, 3).map((u, i) => (
          <div
            key={u.id}
            onClick={() => navigate(`/profile/${u.id}`)}
            className={`rounded-xl p-4 text-center shadow-lg
              ${i === 0 && "bg-gradient-to-r from-yellow-300 to-yellow-500"}
              ${i === 1 && "bg-gradient-to-r from-gray-200 to-gray-300"}
              ${i === 2 && "bg-gradient-to-r from-orange-300 to-orange-400"}
              cursor-pointer hover:bg-gray-50 hover:shadow-md 
             transition
            `}
          >
            <div className="text-2xl mb-1">
              {i === 0 && "🥇"}
              {i === 1 && "🥈"}
              {i === 2 && "🥉"}
            </div>
            <div className="font-bold">{toTitleCase(u.name)}</div>
            <div className="text-sm">
              {u.contributions} uploads
            </div>
          </div>
        ))}
      </div>

      {/* Full list */}
      <div className="space-y-3">
        {leaders.map((u, index) => (
          <div
            key={u.id}
            onClick={() => navigate(`/profile/${u.id}`)}
            className={`flex items-center justify-between p-4 rounded-lg shadow
              ${user?.uid === u.id
                ? "bg-indigo-50 border border-indigo-400"
                : "bg-white"}
                cursor-pointer hover:bg-gray-50 hover:shadow-md 
             transition
            `}
          >
            <div className="flex items-center gap-3">
              <span className="font-bold w-10 text-gray-500">
                #{index + 1}
              </span>
              <span className="font-semibold">
                {toTitleCase(u.name)}
                {/* {u.uid} */}
                {user?.uid === u.id && (
                  <span className="ml-2 text-xs text-indigo-600 font-bold">
                    (You)
                  </span>
                )}
              </span>
            </div>
<div className="flex items-center gap-2">

            <span className="font-bold text-indigo-600">
              {u.contributions}
            </span>
            </div>
            
          </div>
          
        ))}
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6">
  <h2 className="font-bold text-indigo-700 mb-2">
    📌 What counts as a valid material upload?
  </h2>
  <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
    <li>
      Must be uploaded in the <b>relevant section</b> (branch/semester/subject/materials).
    </li>
    <li>
      Must use an appropriate tag:
      <b> Previous Papers / Notes / Important Q&A</b>.
    </li>
    <li>
      Should have a <b>clear and proper title</b>.
    </li>
    <li>
      Should <b>not be a duplicate</b> of existing materials.
    </li>
  </ul>
</div>

      </div>
    </div>
  );
}
