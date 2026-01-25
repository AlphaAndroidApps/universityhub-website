import { useParams } from "react-router-dom";
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
  const [task, setTask] = useState(undefined);
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
  <div className="max-w-5xl mx-auto p-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

      {/* Left: Task content */}
      <div className="md:col-span-2 bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-bold">{task.title}</h1>

        <div className="mt-4 text-sm text-gray-500">
          Status: {task.status}
        </div>

        <div
          className="mt-6 space-y-3 text-gray-700"
          dangerouslySetInnerHTML={{ __html: task.description }}
        />
      </div>

      {/* Right / Bottom: Submit Work */}
      <div className="bg-white rounded-2xl shadow p-6">
        <SubmitWork 
          task={task} 
          user={user} 
          onSubmitted={fetchTask} 
        />
      </div>

    </div>
  </div>
);

}

