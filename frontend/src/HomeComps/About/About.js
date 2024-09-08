import './About.css'
import pic from './../../assets/gallery-1.png'
import React from "react"

const About = () => {
  return (
    <div className='about'>
        <div className="about-left">
            <img src={pic} alt='' className='about-img'/>
        </div>
        <div className="about-right">
            <h3>The Learning Management System</h3>
            <h2>Manage and deliver online courses</h2>
            <p>A Learning Management System (LMS) is a software application that allows organizations to manage and deliver online courses and training programs. It provides a centralized platform for instructors to create and organize course content, track student progress, and facilitate communication and collaboration.</p>
            <p>With an LMS, students can access course materials, complete assignments, participate in discussions, and take assessments online. It offers features such as grading, analytics, and reporting to help instructors monitor student performance and assess the effectiveness of their teaching.</p>
            <p>Whether you're a school, university, or corporate training provider, implementing an LMS can streamline your learning processes and enhance the learning experience for your students or employees.</p>
        </div>
    </div>
  )
}

export default About