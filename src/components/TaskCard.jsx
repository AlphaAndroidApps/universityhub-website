import { requestTask, approveRequest, deleteTask, resignTask } from "../services/tasks";
import { useNavigate } from "react-router-dom";

const ADMIN_EMAIL = "appdroidplus7@gmail.com";

export default function TaskCard({ task, user }) {
  const navigate = useNavigate();
  const isAdmin = user?.email === ADMIN_EMAIL;
  const hasRequested = task.requests?.some(r => r.uid === user?.uid);

  const handleDelete = (e) => {
    e.stopPropagation();
    const ok = confirm("Delete this task permanently?");
    if (!ok) return;
    deleteTask(task.id);
  };

  const handleResign = async (e) => {
    e.stopPropagation();
    const ok = confirm("Are you sure you want to resign from this task?");
    if (!ok) return;
    if (!user) return;

    await resignTask(task.id, user.uid);
    alert("You have resigned from the task.");
  };

  const handleRequest = (e) => {
    e.stopPropagation();
    requestTask(task.id, user);
  };

  const handleApprove = (e, reqUser) => {
    e.stopPropagation();
    approveRequest(task.id, reqUser);
  };

  return (
    <div
      onClick={() => navigate(`/tasks/${task.id}`)}
      className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold">
            {task.title}
          </h3>

          <p className="text-gray-600 mt-1 line-clamp-3">
            {task.preview}
          </p>
        </div>

        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm">
          {task.points}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-500">
          Status: {task.status}
        </span>

        <div className="flex gap-2">

          {/* USER: REQUEST */}
          {user && task.assignedTo === null  && (
            hasRequested ? (
              <span className="text-sm text-gray-500 px-4 py-2">
                Requested
              </span>
            ) : (
              <button
                onClick={handleRequest}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
              >
                Request Assignment  
              </button>
            )
          )}

          {/* USER: RESIGN */}
          {user && task.assignedTo === user.uid && task.status === "in_progress" && (
            <button
              onClick={handleResign}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Resign from Assignment
            </button>
          )}

          {/* ADMIN: DELETE */}
          {isAdmin && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Delete
            </button>
          )}
        </div>
      </div>

{/* NON-ADMIN: REQUEST COUNT */}
{!isAdmin && task.requests?.length > 0 && (
  <p className="mt-3 text-sm text-gray-500">
    {task.requests.length} people requested
  </p>
)}

      {/* ADMIN: REQUEST LIST (same card, no layout break) */}
      {isAdmin && task.requests?.length > 0 && (
        <div className="mt-4 border-t pt-3 space-y-2">
          <p className="text-sm font-semibold text-gray-600">
            Requests
          </p>

          {task.requests.map(r => (
            <div
              key={r.uid}
              className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
            >
              <div>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-xs text-gray-500">{r.email}</p>
              </div>

              <button
                onClick={(e) => handleApprove(e, r)}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Assign
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
