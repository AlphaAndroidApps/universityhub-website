import MyTasksPanel from "../components/MyTasksPanel";

export default function MyContributions({ user }) {
  if (user === undefined) {
    return <div className="p-6">Checking session...</div>;
  }

  if (!user) {
    return <div className="p-6">Please login</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <MyTasksPanel user={user} title="My Tasks" />
    </div>
  );
}
