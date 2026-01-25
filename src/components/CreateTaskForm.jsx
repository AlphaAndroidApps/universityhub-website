import { useState } from "react";
import { createTask } from "../services/tasks";
import { serverTimestamp } from "firebase/firestore";


export default function CreateTaskForm({ onClose }) {
  const [title, setTitle] = useState("");
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description || !preview) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    await createTask({
      title,
      preview,
      description,
      points: Number(points),
      status: "open",
      assignedTo: null,
      createdAt: serverTimestamp()
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-xl animate-fadeIn">
        
        <h3 className="text-2xl font-bold mb-4">
          Create New Task
        </h3>

        <input
          className="w-full border rounded-lg p-3 mb-3"
          placeholder="Task title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          className="w-full border rounded-lg p-3 mb-3"
          placeholder="Task preview"
          value={preview}
          onChange={e => setPreview(e.target.value)}
        />

        <textarea
          className="w-full border rounded-lg p-3 mb-3"
          placeholder="Task description"
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />

        <input
          type="number"
          className="w-full border rounded-lg p-3 mb-4"
          placeholder="Points"
          value={points}
          onChange={e => setPoints(e.target.value)}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
