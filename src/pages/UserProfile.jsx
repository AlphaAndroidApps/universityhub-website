import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function UserProfile() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const ref = doc(db, "ALLUSERS", uid);
      const snap = await getDoc(ref);
      if (snap.exists()) setUser(snap.data());
      setLoading(false);
    };
    fetchUser();
  }, [uid]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <div className="p-10 text-center">User not found</div>;

  const initials = user.fullName
    ?.split(" ")
    .map(w => w[0])
    .join("");

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-lg border p-5">

        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="Profile"
              className="w-20 h-20 rounded-lg object-cover border"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
              {initials}
            </div>
          )}

          <div>
            <h1 className="text-xl font-bold">
              {user.fullName}
            </h1>
            {user.branch && user.course && (
              <p className="text-sm text-gray-600">
                {user.branch} · {user.course}
              </p>
            )}
            {user.college && (
              <p className="text-xs text-gray-400">
                {user.college}
              </p>
            )}
          </div>
        </div>

        {/* ID Details */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          {user.email && <Field label="Email" value={user.email} />}
          {user.registrationNumber && (
            <Field label="Reg No" value={user.registrationNumber} />
          )}
          {user.fromYear && <Field label="From" value={user.fromYear} />}
          {user.toYear && <Field label="To" value={user.toYear} />}
        </div>

        {/* Social Links */}
        <div className="flex gap-3 mt-4 flex-wrap">
          {user.linkedin && <Badge label="LinkedIn" url={user.linkedin} />}
          {user.instagram && <Badge label="Instagram" url={user.instagram} />}
          {user.twitter && <Badge label="Twitter" url={user.twitter} />}
        </div>

        {/* Footer */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          University Hub • Digital Student ID
        </div>
      </div>
    </div>
  );
}

const Field = ({ label, value }) => (
  <div>
    <div className="text-gray-500 text-xs">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

const Badge = ({ label, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs hover:bg-indigo-200"
  >
    {label}
  </a>
);
