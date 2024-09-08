import React from 'react';
import './About.css';
import img from '../assets/gallery-1.png';

const About = () => {
    return (
        <div className="about-container">
            <div className="about-content">
                <h1>About ChalkBoard LMS</h1>
                <p>
                    Welcome to <strong>ChalkBoard LMS</strong>, a dynamic learning platform designed to 
                    revolutionize the way students and teachers collaborate. 
                    Our mission is to provide seamless educational experiences and foster growth 
                    through innovative technologies.
                </p>
                <p>
                    Whether you're a student looking to enhance your skills or a teacher looking for 
                    an engaging way to share knowledge, ChalkBoard LMS is your ultimate destination for 
                    learning and development.
                </p>
                <div className="team-section">
                    <h2>Our Vision</h2>
                    <p>To empower students and educators with the tools to succeed in a digital world.</p>
                </div>
            </div>
            <div className="about-image">
                <img src={img} alt="Learning" />
            </div>
        </div>
    );
};

export default About;
