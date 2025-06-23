import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // 👈 Import icons

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 state to toggle
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //http://localhost:8080
      const res = await axios.post("https://laundry-mern-app-backend.onrender.com/api/v1/auth/login", {
        email,
        password,
      });
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        if (res.data.user.role === 1) {
          navigate("https://laundry-mern-app-backend.onrender.com/dashboard/admin");
        } else if (res.data.user.role === 2) {
          navigate("https://laundry-mern-app-backend.onrender.com/dashboard/user/orders");
        } else {
          navigate("https://laundry-mern-app-backend.onrender.com/dashboard/user");
        }
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Login - Laundry Service"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className="title">LOGIN FORM</h4>

          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter your Email"
              required
            />
          </div>

          {/* Password Input with Eye Toggle */}
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter your Password"
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y pe-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Forgot Password Button */}
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-link px-0"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            LOGIN
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
