import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer bg-dark text-light py-3'>
      <div className="container">
        <div className="row align-items-center">
          {/* Left column */}
          <div className="col-md-4 text-start">
            <Link to="/admin-login" className="text-light me-3">Admin Login</Link>
            <Link to="/delivery-login" className="text-light">Delivery Login</Link>
          </div>

          {/* Center column */}
          <div className="col-md-4 text-center mt-2 mt-md-0">
            <h6 className='m-0'>
              All rights reserved &copy; SUST_CSE_2020
            </h6>
          </div>

          {/* Right column */}
          <div className="col-md-4 text-end mt-2 mt-md-0">
            <Link to="/about" className="text-light me-2">About Us</Link>
            <Link to="/contact" className="text-light me-2">Contact</Link>
            <Link to="/policy" className="text-light">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
