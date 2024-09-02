import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Component/header.css';


function Header() {
   const [isMobile, setIsMobile] = useState(false);
    
        return (
            <nav className="navbar">
                <h3 className="logo">edu<span>LANKA</span></h3>
                <div className={isMobile ? "nav-links-mobile" : "nav-links"}>
                <li><Link to={'/'}>HOME</Link></li>
                <li><Link to={'/about'}>ABOUT</Link></li>
                <li><Link to={'/contact'}>CONTACT US</Link></li>
                <li><Link to={'/sign-up'}>SIGN UP</Link></li>
                </div>
                <button className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
                    {isMobile ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
                </button>
            </nav>
        );
    }
    
    export default Header;
    

