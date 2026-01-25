import { useState } from "react";
import { db } from "../firebase/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CommentBox({ taskId, user }) {
  if (user === undefined) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }
  const [message, setMessage] = useState("");
  const submit = async () => {
    await addDoc(collection(db, "tasks", taskId, "comments"), {
      userId: user.uid,
      name: user.displayName,
      message,
      timestamp: Date.now()
    });
    setMessage("");
  };

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Comment"
      />
      <button onClick={submit}>Send</button>
    </div>
  );
}
