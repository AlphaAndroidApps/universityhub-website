import { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import TaskCard from "../components/TaskCard";
import CreateTaskForm from "../components/CreateTaskForm";

const ADMIN_EMAIL = "appdroidplus7@gmail.com";
const ITEMS_PER_PAGE = 10;

export default function Tasks({ user }) {
  
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Please login to see tasks
      </div>
    );
  }

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const q = query(
      collection(db, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, snap => {
      setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return unsub;
  }, []);

  const totalTasks = tasks.length;
  const totalPages = Math.ceil(totalTasks / ITEMS_PER_PAGE);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentTasks = tasks.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <div className="max-w-5xl mx-auto p-8">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-8">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-4xl font-extrabold">
                Community Tasks
              </h2>
              <p className="text-gray-500">
                Earn certifications by contributing to University Hub
              </p>
            </div>

            {user.email === ADMIN_EMAIL && (
              <button
                onClick={() => setShowForm(true)}
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-semibold hover:bg-indigo-700 transition"
              >
                + Add Task
              </button>
            )}
          </div>

          {/* TOTAL COUNT */}
          <p className="text-sm text-gray-600 mb-6">
            Total tasks: <b>{totalTasks}</b>
          </p>

          {/* MODAL */}
          {showForm && (
            <CreateTaskForm onClose={() => setShowForm(false)} />
          )}

          {/* EMPTY STATE */}
          {totalTasks === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-xl">No tasks yet</p>
              <p>Be the first to create one.</p>
            </div>
          )}

          {/* TASK LIST */}
          <div className="space-y-4">
            {currentTasks.map(task => (
              <TaskCard key={task.id} task={task} user={user} />
            ))}
          </div>

          {/* PAGINATION */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
              >
                Prev
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
