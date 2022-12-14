import React from 'react'
import { Link } from 'react-router-dom'
import '../welFedex.css'
import Contact from './Contact'
import Navbar from './Navbar'

function WelcomeFedex({settype}) {
  return (
    <div>
        <Navbar settype={settype}/>
        <div className="welFe">
        {/* <section className='section1'> */}
            <img className='section1-img' src={require("../images/welFedex-section1.png")} />
        {/* </section> */}
        <section className='section2'>
            <Link to='/vehicle' className='sec2il'>
              <img className='section2-img' src={require("../images/vehicleupdates.png")} />
            </Link>
            <Link to='/driver' className='sec2il'>
              <img className='section2-img' src={require("../images/driverupdates.png")} />
            </Link>
            <Link to='/route' className='sec2il'>
              <img className='section2-img' src={require("../images/routes.png")} />
            </Link>

            {/* <img className='section2-img' src={require("../images/addvehicle.png")} /> */}
            {/* <img className='section2-img' src={require("../images/adddriver.png")} /> */}
        </section>
        </div>
        {/* <Contact/> */}
    </div>
  )
}

export default WelcomeFedex