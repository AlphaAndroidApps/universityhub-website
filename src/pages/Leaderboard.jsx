import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "contributors"),
      orderBy("points", "desc"),
      limit(10)
    );

    const unsub = onSnapshot(q, (snap) => {
      setUsers(snap.docs.map(d => d.data()));
    });

    return unsub;
  }, []);

  return (
    <div>
      <h2>Leaderboard</h2>
      {users.map((u, i) => (
        <p key={i}>{u.name} - {u.points}</p>
      ))}
    </div>
  );
}
