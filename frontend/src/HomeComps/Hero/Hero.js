import './Hero.css'
import ReadMoreIcon from '@mui/icons-material/ReadMore'
import React , { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Hero = () => {
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleMenu = () => {
    setMobileMenu(!mobileMenu);
  };
  
  return (
    <div className='hero container'>
        <div className="hero-text">
            <h1>Learning Management System</h1>
            <p>
            A Learning Management System (LMS) is a software application for the administration, documentation, tracking, reporting, and delivery of educational courses, training programs, or learning and development programs. It provides an online platform for educators to create, manage, and deliver content, as well as for learners to access and engage with the content.
            </p>
            <div onClick={toggleMenu}>
            <NavLink exact to="/about" onClick={() => setMobileMenu(false)}>
            <button className='btn'>Explore More <div className='btnSetup'><ReadMoreIcon /></div></button>
            </NavLink>
            </div>
            
        </div>
    </div>
  )
}

export default Hero