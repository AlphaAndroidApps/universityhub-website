import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { resignTask } from "../services/tasks";

export default function MyTasksPanel({ user, userId, title = "My Tasks", headerActions = null }) {
  const targetUserId = userId || user?.uid;
  const [subs, setSubs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("requested");

  useEffect(() => {
    if (!targetUserId) return;

    const subsQuery = query(
      collection(db, "submissions"),
      where("userId", "==", targetUserId)
    );

    const tasksQuery = query(
      collection(db, "tasks"),
      orderBy("createdAt", "desc")
    );

    const unsubSubs = onSnapshot(subsQuery, (snap) => {
      setSubs(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    const unsubTasks = onSnapshot(tasksQuery, (snap) => {
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });

    return () => {
      unsubSubs();
      unsubTasks();
    };
  }, [targetUserId]);

  const submittedTaskIds = new Set(subs.map((s) => s.taskId));

  const userTasks = tasks.filter((task) => {
    const isAssigned = task.assignedTo === targetUserId;
    const isRequested = task.requests?.some((r) => r.uid === targetUserId);
    const isSubmitted = submittedTaskIds.has(task.id);
    return isAssigned || isRequested || isSubmitted;
  });

  const filteredTasks =
    statusFilter === "all"
      ? userTasks
      : statusFilter === "requested"
      ? userTasks.filter((task) =>
          task.requests?.some((r) => r.uid === targetUserId)
        )
      : userTasks.filter((task) => task.status === statusFilter);

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const aPriority = a.status === "in_progress" ? 0 : 1;
    const bPriority = b.status === "in_progress" ? 0 : 1;
    if (aPriority !== bPriority) return aPriority - bPriority;
    return 0;
  });

  const handleResign = async (taskId) => {
    const ok = confirm("Are you sure you want to resign from this task?");
    if (!ok) return;
    await resignTask(taskId, targetUserId);
    alert("You have resigned from the task.");
  };

  if (loading) return <div className="p-2">Loading...</div>;

  const counts = {
    requested: userTasks.filter((task) =>
      task.requests?.some((r) => r.uid === targetUserId)
    ).length,
    in_progress: userTasks.filter((task) => task.status === "in_progress").length,
    in_review: userTasks.filter((task) => task.status === "in_review").length,
    done: userTasks.filter((task) => task.status === "done").length,
    all: userTasks.length,
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-bold">{title}</h3>
          {headerActions}
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {[
            { label: "Requested", value: "requested" },
            { label: "In Progress", value: "in_progress" },
            { label: "In Review", value: "in_review" },
            { label: "Done", value: "done" },
            { label: "All", value: "all" },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setStatusFilter(item.value)}
              className={`px-3 py-1.5 rounded-full border transition ${
                statusFilter === item.value
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label} ({counts[item.value] ?? 0})
            </button>
          ))}
        </div>
      </div>

      {userTasks.length === 0 ? (
        <p className="text-gray-500">
          You haven't joined or submitted any tasks yet.
        </p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-gray-500">No tasks found for this filter.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`border p-4 rounded-2xl bg-white ${
                task.status === "in_progress"
                  ? "border-indigo-300 ring-1 ring-indigo-200"
                  : ""
              }`}
            >
              <p className="font-medium text-lg">{task.title}</p>
              {task.preview && (
                <p className="text-sm text-gray-600 mt-1">{task.preview}</p>
              )}

              <div className="flex flex-wrap items-center gap-3 mt-3 text-sm">
                <span className="text-gray-500">
                  Status:
                </span>
                {task.status === "in_progress" && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-600 text-white text-xs">
                    In Progress
                  </span>
                )}
                {task.points !== undefined && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                    {task.points} pts
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Link
                  to={`/tasks/${task.id}`}
                  className="text-indigo-600 text-sm font-medium"
                >
                  View task →
                </Link>
                {(task.status === "open" || task.status === "in_progress") &&
                  task.assignedTo === user.uid && (
                    <button
                      onClick={() => handleResign(task.id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600"
                    >
                      Resign
                    </button>
                  )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
