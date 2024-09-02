import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import Home from '../pages/Home';

function Header() {
   const [isMobile, setIsMobile] = useState(false);
    
        return (
            <nav className="navbar">
                <h3 className="logo">mahaloku<span>LMS</span></h3>
                <ul className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)}>
                    <li><a href="/" className="active">Home</a></li>
                    
                    <li><a href="#about" className="active">About</a></li>
                    <li><a href="#contact" className="active">Contact</a></li>
                    <li><Link to={'/'} element={<Home/>}>Home</Link></li>
                    
                </ul>
                <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
                    {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                </button>
            </nav>
        );
    }
    
    export default Header;
    

