import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTaskById } from "../services/tasks";
import SubmitWork from "../components/SubmitWork";

export default function TaskDetails({ user }) {
  if (user === undefined) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTask = async () => {   // 👈 move here
    const data = await getTaskById(taskId);
    setTask(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!task) return <p className="p-6">Task not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
        <Link to="/tasks" className="text-indigo-600 hover:underline">
          ← Back to tasks
        </Link>
        <span>•</span>
        <span>Task details</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Task content */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{task.title}</h1>
              {task.preview && (
                <p className="text-gray-600 mt-2">{task.preview}</p>
              )}
            </div>
            {task.points !== undefined && (
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                {task.points} pts
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Status: {task.status}
            </span>
            {task.deadline && (
              <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                Due: {task.deadline}
              </span>
            )}
            {task.assignedName && (
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                Assigned to {task.assignedName}
              </span>
            )}
          </div>

          <div
            className="mt-6 space-y-3 text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: task.description }}
          />
        </div>

        {/* Right / Bottom: Submit Work */}
        <div className="bg-white rounded-2xl shadow p-5 sm:p-6 lg:sticky lg:top-6 h-fit">
          <h2 className="text-lg font-semibold mb-3">Submit work</h2>
          <SubmitWork task={task} user={user} onSubmitted={fetchTask} />
        </div>
      </div>
    </div>
  );

}

