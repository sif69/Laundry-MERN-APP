import React from "react";
import { useNavigate } from 'react-router-dom';
import washingMachine from "../assets/washing-machine.png";
import Navbar from './Navbar';
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const [auth,setAuth] = useAuth();

  return (
    <div className="bg-blue-50 min-h-screen">
      <Navbar />
      <pre>{JSON.stringify(auth,null,4)}</pre>
      {/* Hero Section */}
      <header className="px-4 py-12 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto">
      <div className="max-w-xl" data-aos="fade-down-right">
  <h1 className="text-3xl md:text-4xl font-bold leading-tight text-center md:text-left">
    <span className="text-green-600">Best </span>
    <span className="text-blue-700">Wash and Iron service</span><br />
    <span className="text-green-600">in your doorstep...</span>
  </h1>

  <p className="mt-4 text-gray-700 text-center md:text-left">
    Suds Laundry is an Online Laundry Platform with the latest technology in washing, dry cleaning and laundry.
    Our services combine our expertise and experience acquired over a period of time to provide you with clean laundry 
    in the shortest possible turnaround time.
  </p>

  
</div>

        <img
          src={washingMachine}
          alt="Washing Machine"
          className="max-w-sm mt-10 md:mt-0" data-aos="fade-down-left"
        />
      </header>
    </div>
  );
}
