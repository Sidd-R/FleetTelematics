import React from 'react'
import '../Navbar.css'
import Contact from './Contact'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'

export default function Homepage({type,settype}) {
  return (
    <>
    <Navbar settype={settype}/>
    <div className='homepage'>
      <section className='temp' id="hh" style={{padding:"0px"}}>
        {type == 0 ?
        <img className='homepage-img' src="https://i.gifer.com/Pqhk.gif" style={{width:"100%",marginTop:"-200px",marginBottom:"-320px"}}/>:
        <img className='homepage-img' src="https://mir-s3-cdn-cf.behance.net/project_modules/hd/a9a9f780676505.5ce7c7eee5ff0.gif" style={{width:"100%",marginBottom:"30px",marginTop:"0px",height:"700px",objectFit:"cover"}}/> 
        }
      </section>
      <img src="" alt="" />
      {/* <section className='temp'>
        <img className='homepage-img' src={require("../images/homepage-img1.png")} />
      </section> */}
      <section className='temp' style={{marginTop:"-10px"}}>
        <img className='homepage-img' src={require("../images/section1.png")} />
        
      </section>
      <section className='temp'>
        <img className='homepage-img' src={require("../images/section2.png")} />
      </section>
      <section className="temp">
        <div>
          <div>
            <span className='hp-hd'> Services We Provide</span>
          </div>
          <div className='service-main' style={{paddingLeft:"400px",paddingRight:"400px"}}>
            <div className='service'>
              <Link to='/login'>
                <img className='homepage-img2' src={require("../images/service-1.png")} style={{width:"300px"}}/>
              </Link>
            </div>
            <div className='service'>
              <Link to="/login">
                <img className='homepage-img2' src={require("../images/service-2.png")} style={{width:"300px"}}/>
              </Link>
            </div>
          </div>
          <img className='homepage-img-bottom' src={require("../images/service-bottom.png")} style={{marginTop:"80px"}}/>
        </div>
      </section>
      <section className='temp'>
        <div>
          <img className='homepage-img-last' src={require("../images/homepage-last.png")} />
          <Contact/>
        </div>
      </section>

    </div>
    </>
  )
}
