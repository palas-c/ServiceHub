import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  // 🔥 GET USER FROM CONTEXT
  const { user, logout } = useAuth();

  // 🔥 HANDLE LOGOUT
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-indigo-700 text-white px-8 py-4 flex justify-between items-center">

      {/* LOGO */}
      <h1
        onClick={() => navigate("/")}
        className="text-xl font-bold cursor-pointer"
      >
        ServiceHub
      </h1>

      {/* LINKS */}
      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>
        <Link to="/vendors">Vendors</Link>

        {/* 🔐 LOGGED IN */}
        {user ? (
          <>
            {/* CUSTOMER DASHBOARD */}
            {user.role === "customer" && (
              <Link to="/dashboard">Dashboard</Link>
            )}

            {/* VENDOR DASHBOARD */}
            {user.role === "vendor" && (
              <Link to="/vendor-dashboard">Dashboard</Link>
            )}

            {/* USER NAME */}
            <span className="text-sm font-medium">
              Hi, {user.name}
            </span>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* NOT LOGGED IN */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;