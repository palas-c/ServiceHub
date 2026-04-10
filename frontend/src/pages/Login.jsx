import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import API from "../services/api";
import SocialLogin from "../components/auth/SocialLogin";
import { useAuth } from "../context/AuthContext"; // ✅ ADD THIS

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ ADD THIS

  const [role, setRole] = useState("customer");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      // 🔥 LOGIN API
      const res = await API.post("/auth/login", formData);

      const { user, token } = res.data;

      // 🔐 ROLE VALIDATION
      if (user.role !== role) {
        setError(
          `This account is registered as ${user.role}. Please switch role.`
        );
        setLoading(false);
        return;
      }

      // ✅ USE CONTEXT (INSTEAD OF localStorage)
      login(user, token);

      // 🔥 REDIRECT
      if (user.role === "vendor") {
        navigate("/vendor-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center">

        <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8">

          <h2 className="text-3xl font-bold text-center mb-2">
            Service<span className="text-teal-600">Hub</span>
          </h2>

          <p className="text-center text-gray-500 mb-6">
            Welcome back
          </p>

          {/* ROLE SWITCH */}
          <div className="flex bg-gray-100 rounded-full p-1 mb-6">
            <button
              onClick={() => setRole("customer")}
              className={`flex-1 py-2 rounded-full ${
                role === "customer"
                  ? "bg-teal-600 text-white"
                  : ""
              }`}
            >
              Customer
            </button>

            <button
              onClick={() => setRole("vendor")}
              className={`flex-1 py-2 rounded-full ${
                role === "vendor"
                  ? "bg-teal-600 text-white"
                  : ""
              }`}
            >
              Vendor
            </button>
          </div>

          {/* ERROR */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {error}
            </p>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* SIGNUP */}
          <p className="text-center mt-6 text-sm">
            Don’t have an account?
            <span
              onClick={() => navigate("/signup")}
              className="text-teal-600 cursor-pointer ml-1 font-semibold"
            >
              Signup
            </span>
          </p>

          {/* SOCIAL LOGIN */}
          <SocialLogin />

        </div>
      </div>
    </MainLayout>
  );
}

export default Login;