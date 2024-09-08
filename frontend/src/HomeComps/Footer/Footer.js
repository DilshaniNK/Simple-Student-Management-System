import React from 'react'
import './Footer.css'
import logo from '../../assets/chalkboard.png'
import twitter_icon from '../../assets/twitter.png'
import facebook_icon from '../../assets/facebook.png'
import linkedin_icon from '../../assets/linkedin.png'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
      <div className='footer' id='footer'>
        <div className='footer-content'>
          <div className='footer-content-left'>
            <div className='footer-content-left-row'>
              <img className='images' src={logo} alt='' />
              <h2>ChalkBoard</h2>
            </div>
            <p>Our Learning Management System (LMS) provides a comprehensive platform for managing and delivering educational content.</p>
            <div className='footer-social-icons'>
              <img className='images' src={facebook_icon} alt='' />
              <img className='images' src={twitter_icon} alt='' />
              <img className='images' src={linkedin_icon} alt='' />
            </div>
          </div>

          <div className='footer-content-center'>
            <h2>For More</h2>
            <ul>
              <li><Link to='/'>Sign Up</Link></li>
              <li><Link to='/about'>About us</Link></li>
              <li><Link to='/contact'>Contact Us</Link></li>
            </ul>
          </div>

          <div className='footer-content-right'>
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>071-7511510</li>
              <li>chalkboard@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
    )
}

export default Footer