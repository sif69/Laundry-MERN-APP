import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_.png";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function Navbar() {
  const [auth, setAuth] = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="bg-white px-4 py-4 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Suds Laundry" className="h-8 w-8" />
          <span className="text-xl font-semibold text-cyan-600">Suds Laundry</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex space-x-6 font-medium text-gray-700 items-center">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/order" className="hover:text-blue-600">Order</Link>
          <Link to="/services" className="hover:text-blue-600">Service</Link>
          <Link to="/locations" className="hover:text-blue-600">Location</Link>

          {!auth.user ? (
            <Link to="/signin" className="hover:text-blue-600">Sign In</Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="hover:text-blue-600 focus:outline-none"
              >
                {auth?.user?.name || "User"} ⌄
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-10">
                  <Link
                    to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/SignIn"
                    className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
                  >
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        
      </div>
    </nav>
  );
}