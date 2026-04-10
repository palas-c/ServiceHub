import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";

function UserDashboard() {
  const [bookings, setBookings] = useState([]);

  // 🔥 LOAD BOOKINGS FROM LOCAL STORAGE
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(data);
  }, []);

  return (
    <MainLayout>

      <div className="grid md:grid-cols-4 gap-6">

        {/* SIDEBAR */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h2 className="font-bold text-lg mb-6">Dashboard</h2>

          <ul className="space-y-4 text-gray-600">
            <li className="text-teal-600 font-semibold">
              My Bookings
            </li>
            <li>Payments</li>
            <li>Settings</li>
          </ul>
        </div>

        {/* MAIN */}
        <div className="md:col-span-3 space-y-8">

          {/* WELCOME */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h1 className="text-2xl font-bold">
              Welcome back 👋
            </h1>
            <p className="text-gray-500">
              Here are your recent bookings
            </p>
          </div>

          {/* BOOKINGS */}
          <div className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold mb-4">
              Active Bookings
            </h2>

            {bookings.length === 0 ? (
              <p className="text-gray-500">
                No bookings yet
              </p>
            ) : (
              bookings.map((b, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border-b py-4"
                >
                  <div>
                    <p className="font-medium">
                      {b.vendorName}
                    </p>

                    <p className="text-sm text-gray-500">
                      {b.details}
                    </p>

                    <p className="text-sm text-gray-500">
                      {b.date} • {b.time}
                    </p>
                  </div>

                  <span className="bg-teal-100 text-teal-700 px-3 py-1 rounded-lg text-sm">
                    {b.status}
                  </span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </MainLayout>
  );
}

export default UserDashboard;