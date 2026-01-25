import { useState } from "react";
import { submitTask, submitTaskUpdateStatus } from "../services/tasks";

export default function SubmitWork({ task, user, onSubmitted }) {
  if (user === undefined) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }

  const [url, setUrl] = useState("");
  const [comment, setComment] = useState("");
  const [timeSpent, setTimeSpent] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user || task.assignedTo !== user?.uid) return null;
  if (task.status !== "in_progress") return null;

  const handleSubmit = async () => {
    if (!url) return alert("Please enter a submission link");
    if (loading) return;

    setLoading(true);

    await submitTask(
      task.id,
      task.title,
      url,
      comment,
      timeSpent,
      user
    );

    await submitTaskUpdateStatus(task.id);

    setLoading(false);
    alert("Work submitted successfully!");
    
    onSubmitted();
    // Soft refresh
    // navigate(0);   // React Router v6+
  };

  return (
    <div className="mt-8 p-4 border rounded-xl bg-gray-50 space-y-3">
      <h3 className="font-semibold">Submit your work</h3>

      <input
        type="text"
        placeholder="Submission link (GitHub / Drive / Figma)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      <textarea
        placeholder="Comments for reviewer (what you did, notes, etc.)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded-lg"
      />

      <input
        type="number"
        placeholder="Time spent (hours)"
        value={timeSpent}
        onChange={(e) => setTimeSpent(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full"
      >
        {loading ? "Submitting..." : "Submit work"}
      </button>
    </div>
  );
}
