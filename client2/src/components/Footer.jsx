import React from "react";

export default function Footer() {
  return (
    <footer className="bg-blue-50 py-12 px-4 text-sm text-gray-700">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
        <div>
          <h5 className="font-bold mb-2">About us</h5>
          <ul>
            <li>About us</li>
            <li>Creators</li>
            <li>Philosophy</li>
            <li>Contact us</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">Company</h5>
          <ul>
            <li>Our team</li>
            <li>Terms</li>
            <li>How it works</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">Services</h5>
          <ul>
            <li>Pickup</li>
            <li>Drop off</li>
            <li>Laundry</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-2">Check us out</h5>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12">
        <p className="text-blue-600 font-bold text-lg">Suds Laundry</p>
      </div>
    </footer>
  );
}