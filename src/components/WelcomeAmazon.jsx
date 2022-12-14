import React from 'react'
import '../welFedex.css'
import Contact from './Contact'
import Navbar from './Navbar'

function WelcomeAmazon(props) {
  return (
    <div>
        <Navbar settype={props.settype}/>
        <div className="welAm">
        {/* <section className='section1'> */}
            <img className='section1-img' src={require("../images/amazon.png")} style={{}}/>
        {/* </section> */}
        <section className='section3'>
            {/* <div className="img3seca"> */}
              <img className='section3img' src={require("../images/amazonFed.png")} style={{borderRight:"2px solid lightgrey "}}/>
            {/* </div> */}
            {/* <div className="img3seca"> */}
              <img className='section3img' src={require("../images/amazonBlu.png")} />
            {/* </div> */}
            {/* <img className='section2-img' src={require("../images/addvehicle.png")} /> */}
            {/* <img className='section2-img' src={require("../images/adddriver.png")} /> */}
        </section>
        <section className='section3'>
            <div className="crs">Risk Score: {props.avg }%</div>
            <div className="crs">Risk Score: 54.32%</div>
        </section>

        </div>
        {/* <Contact/> */}
    </div>
  )
}

export default WelcomeAmazon