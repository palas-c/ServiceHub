import { useState } from "react";

function AuthForm({ mode = "login", onSubmit, loading = false }) {
  const isSignup = mode === "signup";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white rounded-2xl shadow p-6">
      <h2 className="text-2xl font-bold">{isSignup ? "Create Account" : "Welcome Back"}</h2>
      <p className="text-sm text-gray-500">
        {isSignup ? "Sign up to start booking services." : "Log in to continue."}
      </p>

      {isSignup && (
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
        />
      )}

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength={6}
        className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-teal-500"
      />

      {isSignup && (
        <div className="flex gap-2">
          <button
            type="button"
            className={`flex-1 py-2 rounded-full border ${
              formData.role === "customer" ? "bg-[#0f4c4c] text-white border-[#0f4c4c]" : ""
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, role: "customer" }))}
          >
            Customer
          </button>
          <button
            type="button"
            className={`flex-1 py-2 rounded-full border ${
              formData.role === "vendor" ? "bg-[#0f4c4c] text-white border-[#0f4c4c]" : ""
            }`}
            onClick={() => setFormData((prev) => ({ ...prev, role: "vendor" }))}
          >
            Vendor
          </button>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#0f4c4c] text-white py-3 rounded-lg hover:bg-teal-700 transition disabled:opacity-60"
      >
        {loading ? "Please wait..." : isSignup ? "Sign Up" : "Log In"}
      </button>
    </form>
  );
}

export default AuthForm;
