import './Members.css'
import mem1 from '../../assest/mem1.jpg'
import mem2 from '../../assest/mem2.jpg'
import mem3 from '../../assest/mem3.jpg'
import overlay from '../../assest/e.png'
import React from "react"

const Members = () => {
  return (
    <div className='programs' id='about'>
        <div className="program">
            <img src={mem2} alt="" />
            <div className="caption">
                <img src={overlay} alt=''/>
                <p>Patric Stewart</p>
            </div>
        </div>
        <div className="program">
            <img src={mem1} alt="" />
            <div className="caption">
                <img src={overlay} alt=''/> 
                <p>Elina Kettenbough</p>
            </div>
        </div>
        <div className="program">
            <img src={mem3} alt="" />
            <div className="caption">
                <img src={overlay} alt=''/>
                <p>Gorge Winsley</p>
            </div>
        </div>
    </div>
  )
}

export default Members