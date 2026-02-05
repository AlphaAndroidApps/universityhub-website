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
    <div className="space-y-4">
      <div className="rounded-2xl border bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-lg">Submit your work</h3>
          <span className="text-xs px-2 py-1 rounded-full bg-indigo-50 text-indigo-700">
            Task: {task.title}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Share a link to your work and any notes for the reviewer.
        </p>
      </div>

      <div className="space-y-3 rounded-2xl border bg-gray-50 p-4 sm:p-5">
        <label className="block text-sm font-medium text-gray-700">
          Submission link
          <input
            type="url"
            placeholder="GitHub / Drive / Figma link"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="mt-1 w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Comments for reviewer
          <textarea
            placeholder="What you did, notes, blockers, etc."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="mt-1 w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block text-sm font-medium text-gray-700">
          Time spent (hours)
          <input
            type="number"
            min="0"
            step="0.5"
            placeholder="e.g. 2.5"
            value={timeSpent}
            onChange={(e) => setTimeSpent(e.target.value)}
            className="mt-1 w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between pt-2">
          <span className="text-xs text-gray-500">
            Submitting will move the task to review.
          </span>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit work"}
          </button>
        </div>
      </div>
    </div>
  );
}
