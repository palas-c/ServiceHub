import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function Booking() {
  const [step, setStep] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const vendor = location.state;

  // 🔥 FORM STATE
  const [details, setDetails] = useState("");
  const [file, setFile] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // 🔥 SUBMIT BOOKING
  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vendorName: vendor?.name,
          description: details,
          date,
          time,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Booking Confirmed ✅");

        // 🔥 SAVE LOCALLY (for dashboard)
        const oldBookings =
          JSON.parse(localStorage.getItem("bookings")) || [];

        const newBooking = {
          vendorName: vendor?.name,
          details,
          date,
          time,
          status: "Scheduled",
        };

        const updatedBookings = [...oldBookings, newBooking];

        localStorage.setItem(
          "bookings",
          JSON.stringify(updatedBookings)
        );

        // 🔥 REDIRECT
        navigate("/dashboard");
      } else {
        alert(data.message || "Booking failed ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow">

        {/* 🔥 VENDOR INFO */}
        {vendor && (
          <div className="mb-6">
            <h2 className="text-xl font-bold">{vendor.name}</h2>
            <p>₹ {vendor.price}</p>
          </div>
        )}

        {/* STEP INDICATOR */}
        <div className="flex justify-between mb-6 font-semibold">
          <p className={step === 1 ? "text-teal-600" : ""}>1. Details</p>
          <p className={step === 2 ? "text-teal-600" : ""}>2. Schedule</p>
          <p className={step === 3 ? "text-teal-600" : ""}>3. Confirm</p>
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <div>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full border p-4 rounded mb-4"
            />

            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="mb-4"
            />

            <button
              onClick={() => {
                if (!details) return alert("Enter details");
                setStep(2);
              }}
              className="bg-teal-600 text-white px-6 py-2 rounded"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border p-3 mb-3"
            />

            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border p-3 mb-3"
            />

            <button onClick={() => setStep(1)}>Back</button>

            <button
              onClick={() => {
                if (!date || !time) return alert("Select date/time");
                setStep(3);
              }}
              className="bg-teal-600 text-white px-6 py-2 ml-4"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">
              Confirm Booking
            </h2>

            <div className="bg-gray-100 p-4 rounded mb-4 text-left">
              <p><strong>Vendor:</strong> {vendor?.name}</p>
              <p><strong>Details:</strong> {details}</p>
              <p><strong>Date:</strong> {date}</p>
              <p><strong>Time:</strong> {time}</p>
            </div>

            <button
              onClick={handleBooking}
              className="bg-teal-600 text-white px-6 py-2 rounded"
            >
              Confirm Booking
            </button>

            <button
              onClick={() => setStep(2)}
              className="block mt-3 text-gray-500"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Booking;