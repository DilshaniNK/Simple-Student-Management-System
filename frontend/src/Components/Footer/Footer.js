import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import  facebook_icon  from '../../assests/facebook_icon.png'
import  twitter_icon  from '../../assests/twitter_icon.png'
import  linkedin_icon  from '../../assests/linkedin_icon.png'

const Footer = () => {
return (
    <div className='footer' id='footer'>
        <div className='footer-content'>
            <div className='footer-content-left'>
                <p>EduSphere</p>
                <p>To create a robust, intuitive, and scalable school management system that <br />enhances the educational experience.</p>
                <div className='footer-social-icons'>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebook_icon} alt='' /></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitter_icon} alt='' /></a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><img src={linkedin_icon} alt='' /></a>
                </div>
            </div>

            <div className='footer-content-center'>
                <h2>Institute</h2>
                <ul>
                    <li><Link to={'/dashboard'} target="_blank" rel="noopener noreferrer">DASHBOARD</Link></li>
                    <li><Link to={'/about'} target="_blank" rel="noopener noreferrer">ABOUT</Link></li>
                    <li><Link to={'/contact'} target="_blank" rel="noopener noreferrer">CONTACT US</Link></li>
                </ul>

            </div>
            <div className='footer-content-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>071-7511510</li>
                    <li>edusphere@org.email.com</li>

                </ul>

            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 @ EduSphere.com - All Right Reserved.</p>

    </div>
)
}

export default Footer
