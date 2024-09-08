import './Members.css'
import mem1 from './../../assets/mem1.jpg'
import mem2 from './../../assets/mem2.jpg'
import mem3 from './../../assets/mem3.jpg'
import overlay from './../../assets/chalkboard.png'
import React from "react"

const Members = () => {
  return (
    <div className='programs' id='about'>
        <div className="program">
            <img src={mem1} alt="" />
            <div className="caption">
                <img src={overlay} alt=''/>
                <p>Gorge Stewert</p>
            </div>
        </div>
        <div className="program">
            <img src={mem2} alt="" />
            <div className="caption">
                <img src={overlay} alt=''/> 
                <p>Emilia Clarke</p>
            </div>
        </div>
        <div className="program">
            <img src={mem3} alt="" />
            <div className="caption">
                <img src={overlay} alt=''/>
                <p>Jim Carrey</p>
            </div>
        </div>
    </div>
  )
}

export default Members