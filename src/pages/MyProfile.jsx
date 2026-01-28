import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import CertificateTemplate from "./CertificateTemplate";
import { downloadCertificatePNG } from "../services/useCertificateDownload";

export default function MyProfile() {
  const [user] = useAuthState(auth);
  const [profile, setProfile] = useState(null);
  const [contributions, setContributions] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showCert, setShowCert] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      // 🔹 Fetch profile
      const profileRef = doc(db, "ALLUSERS", user.uid);
      const profileSnap = await getDoc(profileRef);

      // 🔹 Fetch contributions
      const contribRef = doc(db, "leaderboard", user.uid);
      const contribSnap = await getDoc(contribRef);

      if (profileSnap.exists()) {
        setProfile(profileSnap.data());
      }

      if (contribSnap.exists()) {
        setContributions(contribSnap.data().contributions || 0);
      } else {
        setContributions(0);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="p-10 text-center">Loading profile...</div>;
  }

  if (!user || !profile) {
    return <div className="p-10 text-center">Profile not found</div>;
  }

  /* ---------------- Avatar Logic ---------------- */
  const profileImage =
    user.photoURL || profile.avatar_url || null;

  const initials = profile.fullName
    ?.split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase();

  /* ---------------- Certificate Logic ---------------- */
  const canDownloadCertificate = contributions >= 50;

  const certificateData = {
    name: profile.fullName,
    task: "Academic Content on University Hub",
    level: "Elite Contributor",
    contributions,
    id: `UH-${new Date().getFullYear()}-AC-${user.uid
      .slice(0, 5)
      .toUpperCase()}-${String(contributions).padStart(4, "0")}`
  };

  const handleDownload = async () => {
    setShowCert(true);
    setTimeout(async () => {
      await downloadCertificatePNG(`UniversityHub_${profile.fullName}`);
      setShowCert(false);
    }, 300);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* HEADER */}
      <div className="flex items-center gap-6 mb-8">
        {profileImage ? (
          <img
            src={profileImage}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-indigo-200"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {initials}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-bold">{profile.fullName}</h1>
          <p className="text-gray-600">{profile.email}</p>

          {profile.course && profile.branch && (
            <p className="text-sm text-gray-500">
              {profile.course} · {profile.branch}
            </p>
          )}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Stat label="Contributions" value={contributions} />
        <Stat
          label="Certificate"
          value={canDownloadCertificate ? "Eligible" : "Not Eligible"}
        />
      </div>

      {/* DETAILS */}
      <div className="bg-white rounded-xl shadow border p-6 mb-8 space-y-3">
        {profile.college && <Detail label="College" value={profile.college} />}
        {profile.registrationNumber && (
          <Detail label="Reg. No" value={profile.registrationNumber} />
        )}
        {profile.fromYear && profile.toYear && (
          <Detail
            label="Duration"
            value={`${profile.fromYear} - ${profile.toYear}`}
          />
        )}
        {profile.about && <Detail label="About" value={profile.about} />}
      </div>

      {/* CERTIFICATE BUTTON */}
      {canDownloadCertificate && (
        <button
          onClick={handleDownload}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          🎓 Download Contribution Certificate (PNG)
        </button>
      )}

      {/* HIDDEN CERTIFICATE RENDER */}
      {showCert && (
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <CertificateTemplate data={certificateData} />
        </div>
      )}
    </div>
  );
}

/* ---------------- Helpers ---------------- */

const Stat = ({ label, value }) => (
  <div className="bg-gray-50 border rounded-lg p-4 text-center">
    <div className="text-2xl font-bold">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </div>
);

const Detail = ({ label, value }) => (
  <div className="flex justify-between text-sm gap-4">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-right break-all">{value}</span>
  </div>
);
