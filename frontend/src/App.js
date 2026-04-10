import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Vendors from "./pages/Vendors";
import Booking from "./pages/Booking";
import UserDashboard from "./pages/UserDashboard";
import VendorDashboard from "./pages/VendorDashboard";
import Signup from "./pages/Signup";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {

  // 🔥 AUTO LOGIN CHECK
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      console.log("User session restored");
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/booking" element={<Booking />} />

        {/* 🔐 PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor-dashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;