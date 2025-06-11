import React from 'react';
import { Link } from 'react-router-dom';
import Contact from './../../pages/Contact';
const Footer = () =>{

    return(
        <div className='footer'>
        <h1 className='text-center mt-3'>
            All rights reserved &copy; SUST_CSE_2020
        </h1>
        <p className='text-center mt-3'>
            <Link to="/about" >About Us</Link> 
            |
            <Link to="/contact">Contact</Link> 
            |
            <Link to="/policy">Privacy Policy</Link>
            </p>
      
        </div>         
    )
}
export default Footer;