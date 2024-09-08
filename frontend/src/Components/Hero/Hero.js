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
            <h1>School's Central Hub Or Managing Every Aspect Of The Educational Experience</h1>
            <p>
            To create a robust, intuitive, and scalable school management system that enhances the educational experience for all stakeholders, making school administration and learning processes more efficient and effective.
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