import './Kingdom.css'
import left from '../../assests/left-arrow.png'
import right from '../../assests/right-arrow.png'
import c1 from '../../assest/std1.jpg'
import c2 from '../../assest/std2.jpg'
import c3 from '../../assest/std3.jpg'
import c4 from '../../assest/std4.jpg'
import c5 from '../../assest/std5.jpg'
import React , { useRef } from 'react'

const Kingdom = () => {
    const slider = useRef()
    let tX = 0;

    const slideForward = () =>{
        if(tX > -50){
            tX -= 40
        }
        slider.current.style.transform = `translateX(${tX}%)`
    }
    const slideBackward = () =>{
        if(tX < 0){
            tX += 40
        }
        slider.current.style.transform = `translateX(${tX}%)`
    }
  return (
    <div className='kingdom'>
        <img src={left} alt='' className='prev-btn' onClick={slideBackward}></img>
        <img src={right} alt='' className='next-btn' onClick={slideForward}></img>
        <div className="slider">
            <ul ref={slider}>
                <li>
                    <div className='slide'>
                        <div className="user-info">
                            <img src={c1} alt="" />
                            <div className='user-info-col'>
                                <h3>Sarah L</h3>
                                <span>Grade 10</span>
                            </div>
                        </div>
                        <p>"EduSphere has transformed my school experience. The platform is super user-friendly, and I love how I can access all my assignments and grades in one place. It keeps me organized and helps me stay on top of my studies."</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className="user-info">
                            <img src={c2} alt="" />
                            <div className='user-info-col'>
                                <h3>Michael T</h3>
                                <span>Grade 12</span>
                            </div>
                        </div>
                        <p>"Preparing for college applications was stressful until I started using EduSphere. The system keeps all my academic records neatly organized, and communicating with teachers has never been easier. It's been a real lifesaver!"</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className="user-info">
                            <img src={c3} alt="" />
                            <div className='user-info-col'>
                                <h3>Emily R</h3>
                                <span>Grade 9</span>
                            </div>
                        </div>
                        <p>"I used to forget assignment deadlines all the time, but with EduSphere's reminders and calendar features, I'm always on track. It's like having a personal assistant for school!"</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className="user-info">
                            <img src={c4} alt="" />
                            <div className='user-info-col'>
                                <h3>Daniel K</h3>
                                <span>Grade 11</span>
                            </div>
                        </div>
                        <p>"The mobile app for EduSphere is fantastic! I can check my schedule, submit assignments, and even collaborate with classmates right from my phone. It's made learning so much more accessible."</p>
                    </div>
                </li>
                <li>
                    <div className='slide'>
                        <div className="user-info">
                            <img src={c5} alt="" />
                            <div className='user-info-col'>
                                <h3>Jasmine M</h3>
                                <span>Grade 8</span>
                            </div>
                        </div>
                        <p>"EduSphere makes group projects so much easier. The collaboration tools let us work together even when we're not at school. Plus, getting feedback from teachers is quick and straightforward."</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Kingdom