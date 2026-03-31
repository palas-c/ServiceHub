import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role, setRole] = useState("customer");
  const navigate = useNavigate();

  return (
    <>
      {/* CSS */}
      <style>{`
        body {
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f4f6f8;
        }

        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 100vh;
        }

        .left img {
          width: 100%;
          height: 100vh;
          object-fit: cover;
        }

        .right {
          background: white;
          padding: 60px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .logo {
          font-size: 50px;
          font-weight: bold;
        }

        .logo span {
          color: orange;
        }

        h1 {
          margin: 14px 0;
          font-size:25px
        }

        .toggle {
          display: flex;
          background: #eee;
          border-radius: 30px;
          overflow: hidden;
          width: 800px;
          margin-bottom: 20px;
        }

        .toggle button {
          flex: 1;
          padding: 10px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-weight: bold;
        }

        .toggle .active {
          background: #0f4c4c;
          color: white;
          border-radius: 30px;
        }

        input {
          width: 100%;
          padding: 12px;
          margin: 8px 0;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .forgot {
          font-size: 16px;
          color: gray;
          margin-bottom: 15px;
          cursor: pointer;
        }

        .login-btn {
          width: 100%;
          padding: 12px;
          background: #0f4c4c;
          color: white;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }
        

        .divider {
          text-align: center;
          margin: 20px 0;
          color: gray;
        }

        .social {
          width: 100%;
          padding: 1px;
          margin-bottom: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          background: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 500;
        }
        .social:hover {
          background: #f2f2f2;
        }

        .social img{
        width:50px;
        height:50px;
        object-fit:contain;
        }

        .signup {
          margin-top: 15px;
          font-size: 25px;
        }

        .signup span {
          color: #0f4c4c;
          font-weight: bold;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .container {
            grid-template-columns: 1fr;
          }

          .left {
            display: none;
          }
        }
      `}</style>

    
      <div className="container">

        {/* LEFT IMAGE */}
        <div className="left">
          <img
            src="https://cdn.pixabay.com/photo/2024/01/16/09/12/woman-8511676_1280.jpg"
            alt="service"
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="right">

          <div className="logo">
            Service<span>Hub</span>
          </div>

          <h1>Welcome to ServiceHub!</h1>

          {/* TOGGLE */}
          <div className="toggle">
            <button
              className={role === "customer" ? "active" : ""}
              onClick={() => setRole("customer")}
            >
              Customer
            </button>

            <button
              className={role === "vendor" ? "active" : ""}
              onClick={() => setRole("vendor")}
            >
              Vendor
            </button>
          </div>

          {/* FORM */}
          <input type="email" placeholder="Email Address" />
          <input type="password" placeholder="Password" />

          <div className="forgot">Forgot password?</div>

          <button className="login-btn">LOGIN</button>

          <div className="divider">or Social Login</div>

          <button className="social"><img src="https://tse1.mm.bing.net/th/id/OIP.AfKMLf4rKX7EqOSAVpujIQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" alt="google"/>Continue with Google</button>
          <button className="social"><img src="https://www.freepnglogos.com/uploads/apple-logo-png/apple-logo-png-index-content-uploads-10.png" alt="apple"/>Continue with Apple</button>

          <div className="signup">
            Don't have an account?{ " "} <span on onClick={() => navigate("/signup")}>Signup</span>
          </div>

        </div>
      </div>
    </>
  );
}