import { useState, useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

function VendorDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // 🔥 JOB STATE
  const [jobs, setJobs] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      service: "AC Repair",
      time: "Today • 3:00 PM",
      status: "pending",
    },
    {
      id: 2,
      name: "Anita Das",
      service: "Cleaning",
      time: "Tomorrow • 11:00 AM",
      status: "pending",
    },
  ]);

  // 🔥 PROFILE STATE
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  });

  // 🔥 LOAD USER FROM LOCALSTORAGE
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setProfile({
        name: user.name || "",
        phone: user.phone || "",
      });
    }
  }, []);

  // 🔥 HANDLE JOB ACTION
  const handleAction = (id, action) => {
    const updated = jobs.map((job) =>
      job.id === id ? { ...job, status: action } : job
    );
    setJobs(updated);
  };

  // 🔥 PROFILE CHANGE
  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 SAVE PROFILE
  const handleSaveProfile = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    const updatedUser = {
      ...user,
      name: profile.name,
      phone: profile.phone,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated ✅");
  };

  return (
    <MainLayout>

      <div className="grid md:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="font-bold text-lg mb-6">Vendor Panel</h2>

          <ul className="space-y-4 text-gray-600">
            <li
              onClick={() => setActiveTab("dashboard")}
              className={`cursor-pointer ${
                activeTab === "dashboard"
                  ? "text-teal-600 font-semibold"
                  : ""
              }`}
            >
              Dashboard
            </li>

            <li
              onClick={() => setActiveTab("jobs")}
              className={`cursor-pointer ${
                activeTab === "jobs"
                  ? "text-teal-600 font-semibold"
                  : ""
              }`}
            >
              My Jobs
            </li>

            <li
              onClick={() => setActiveTab("earnings")}
              className={`cursor-pointer ${
                activeTab === "earnings"
                  ? "text-teal-600 font-semibold"
                  : ""
              }`}
            >
              Earnings
            </li>

            <li
              onClick={() => setActiveTab("profile")}
              className={`cursor-pointer ${
                activeTab === "profile"
                  ? "text-teal-600 font-semibold"
                  : ""
              }`}
            >
              Profile
            </li>
          </ul>
        </div>

        {/* MAIN CONTENT */}
        <div className="md:col-span-3 space-y-6">

          {/* ================= DASHBOARD ================= */}
          {activeTab === "dashboard" && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow">
                  <p>Today's Jobs</p>
                  <h2 className="text-2xl font-bold">3</h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                  <p>Monthly Earnings</p>
                  <h2 className="text-2xl font-bold">₹18,500</h2>
                </div>

                <div className="bg-white p-4 rounded-xl shadow">
                  <p>Rating</p>
                  <h2 className="text-2xl font-bold">4.8 ⭐</h2>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow">
                <h2 className="text-lg font-semibold mb-4">
                  New Job Requests
                </h2>

                {jobs
                  .filter((job) => job.status === "pending")
                  .map((job) => (
                    <div
                      key={job.id}
                      className="flex justify-between items-center border-b py-4"
                    >
                      <div>
                        <p className="font-semibold">{job.name}</p>
                        <p className="text-sm text-gray-500">
                          {job.service} • {job.time}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleAction(job.id, "accepted")
                          }
                          className="bg-teal-600 text-white px-4 py-2 rounded-lg"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleAction(job.id, "rejected")
                          }
                          className="border px-4 py-2 rounded-lg"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}

          {/* ================= MY JOBS ================= */}
          {activeTab === "jobs" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                My Jobs
              </h2>

              {jobs
                .filter((job) => job.status === "accepted")
                .map((job) => (
                  <div key={job.id} className="border-b py-3">
                    <p className="font-semibold">{job.name}</p>
                    <p className="text-sm text-gray-500">
                      {job.service} • {job.time}
                    </p>
                  </div>
                ))}

              {jobs.filter((j) => j.status === "accepted").length === 0 && (
                <p>No accepted jobs yet</p>
              )}
            </div>
          )}

          {/* ================= EARNINGS ================= */}
          {activeTab === "earnings" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Earnings
              </h2>

              <p>Total Earnings: ₹18,500</p>
              <p className="text-gray-500 mt-2">
                (Backend later)
              </p>
            </div>
          )}

          {/* ================= PROFILE ================= */}
          {activeTab === "profile" && (
            <div className="bg-white p-6 rounded-2xl shadow">
              <h2 className="text-xl font-semibold mb-4">
                Profile
              </h2>

              <input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Name"
                className="w-full border p-3 rounded-lg mb-4"
              />

              <input
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                placeholder="Phone"
                className="w-full border p-3 rounded-lg mb-4"
              />

              <button
                onClick={handleSaveProfile}
                className="bg-teal-600 text-white px-6 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          )}

        </div>

      </div>

    </MainLayout>
  );
}

export default VendorDashboard;