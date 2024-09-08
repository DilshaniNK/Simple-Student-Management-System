import './Kingdom.css'
import left from './../../assets/left-arrow.png'
import right from './../../assets/right-arrow.png'
import c1 from './../../assets/tes1.jpg'
import c2 from './../../assets/tes2.jpg'
import c3 from './../../assets/tes3.jpg'
import c4 from './../../assets/tes4.jpg'
import c5 from './../../assets/tes5.jpg'
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
                                                    <div>
                                                        <img src={c1} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3>John Doe</h3>
                                                        <span>Grade 12</span>
                                                    </div>
                                            </div>
                                            <p>Studying at this university has been a life-changing experience. The professors are knowledgeable and supportive, and the campus environment is vibrant and inclusive.</p>
                                    </div>
                            </li>
                            <li>
                                    <div className='slide'>
                                            <div className="user-info">
                                                    <div>
                                                        <img src={c2} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3>Jane Smith</h3>
                                                        <span>Grade 11</span>
                                                    </div>                                                    
                                            </div>
                                            <p>I am grateful for the opportunities provided by this university. The practical approach to learning and the emphasis on real-world skills have prepared me well for my future career.</p>
                                    </div>
                            </li>
                            <li>
                                    <div className='slide'>
                                            <div className="user-info">
                                                    <div>
                                                        <img src={c3} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3>Michael Johnson</h3>
                                                        <span>Grade 10</span>
                                                    </div>    
                                            </div>
                                            <p>Being part of this university community has been an enriching experience. The diverse student body and the range of extracurricular activities have helped me grow both academically and personally.</p>
                                    </div>
                            </li>
                            <li>
                                    <div className='slide'>
                                            <div className="user-info">
                                                    <div>
                                                        <img src={c4} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3>Sarah Williams</h3>
                                                        <span>Grade 9</span>
                                                    </div>
                                            </div>
                                            <p>I am proud to be a student at this university. The quality of education and the supportive faculty have empowered me to pursue my passions and achieve my goals.</p>
                                    </div>
                            </li>
                            <li>
                                    <div className='slide'>
                                            <div className="user-info">
                                                    <div>
                                                        <img src={c5} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3>David Brown</h3>
                                                        <span>Grade 8</span>
                                                    </div>
                                            </div>
                                            <p>This university has provided me with a solid foundation for my future. The rigorous curriculum and the opportunities for research and internships have helped me develop valuable skills and knowledge.</p>
                                    </div>
                            </li>
                    </ul>
            </div>
    </div>
)
}

export default Kingdom