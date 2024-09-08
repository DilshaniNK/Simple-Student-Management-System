import './About.css'
import rayray from '../../assest/R3.jpg'
import React from "react"

const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={rayray} alt='' className='about-img'/>
        </div>
        <div className="about-right">
            <h3>Welcome to EduSphere,</h3>
            <h2>The all-in-one school management system designed to simplify and enhance the educational experience</h2>
            <p>the all-in-one school management system designed to simplify and enhance the educational experience for administrators, teachers, students, and parents. EduSphere leverages cutting-edge technology to provide a seamless, user-friendly platform that manages every aspect of school operations. From attendance tracking to grading, communication, and resource management, EduSphere ensures that your school runs smoothly, allowing educators to focus on what matters most—delivering quality education.</p>
            <p>At EduSphere, we believe in the power of education to transform lives. Our mission is to empower educational institutions with the tools they need to operate efficiently, foster collaboration, and promote student success.</p>
        </div>
    </div>
  )
}

export default About