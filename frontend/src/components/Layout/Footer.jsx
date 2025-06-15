import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer-custom text-light py-4' >
      <div className="container" >
        <div className="row">
          
          {/* Left column */}
          <div className="col-md-4 text-start mb-3 mb-md-0">
            <div className="d-flex flex-column">
              <Link to="/admin-login" className="footer-link">Admin Login</Link>
              <Link to="/delivery-login" className="footer-link mt-3">Delivery Login</Link>
            </div>
          </div>

          {/* Center column */}
          <div className="col-md-4 text-center mb-3 mb-md-0">
            <h6 className='m-0'>All rights reserved &copy; SUST_CSE_2020</h6>
            <div className="mt-2">
              <Link to="/about" className="text-light mx-2">About Us</Link>
              <Link to="/contact" className="text-light mx-2">Contact</Link>
              <Link to="/policy" className="text-light mx-2">Privacy Policy</Link>
            </div>
          </div>

          
          <div className="col-md-4 text-end">
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
