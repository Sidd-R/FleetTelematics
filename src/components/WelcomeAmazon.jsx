import React from 'react'
import '../welFedex.css'
import Contact from './Contact'
import Navbar from './Navbar'
import {useState} from 'react'

function WelcomeAmazon({settype,avg,pdsp}) {
  const [add, setAdd] = useState(0)
  const [value, setValue] = useState()
  const [d, setD] = useState(0)
  const [u, setU] = useState(0)

  const dhl = (
    <div className="s3">
      <img className='section3img' src={require("../images/amazonDhl.png")} />
      <div className="crs">Risk Score: 51.37%</div>
    </div>
  )

  const ups = (
    <div className="s3">
      <img className='section3img' src={require("../images/amazonUps.png")} />
      <div className="crs">Risk Score: 37.66%</div>
    </div>
  )

  const addsp = () => {
    console.log(value,"kk");
    if (value == 'dhl') {
      pdsp.push(dhl)
      setD(1)
    } else if (value == 'ups') {
      pdsp.push(ups)
      setU(1)
    }
  }

  return (
    <div>
        <Navbar settype={settype}/>
        <div className="welAm">
          {/* <section className='section1'> */}
              <img className='section1-img' src={require("../images/amazon.png")} style={{}}/>
          {/* </section> */}
          <section className='section3'>
            <div className="s3">
              <img className='section3img' src={require("../images/amazonFed.png")} />
              <div className="crs">Risk Score: {avg }%</div>
            </div>
            <div className="s3">
              <img className='section3img' src={require("../images/amazonBlu.png")} />
              <div className="crs">Risk Score: 54.32%</div>
            </div>
            {pdsp.map(e => {return e})}
          </section>
          <div className="add">
          <button onClick={() => {
            if (add == 1)  {
              setAdd(0)
              addsp()
            }  else {
              setAdd(1)
            }}}>Add</button>
          {add == 0? null:
            <select className="dropd"  value={value} onChange={(e) => setValue(e.target.value)}>
              <option value="none">select-</option>
              ({d == 0 ?<option value="dhl">DHL</option>:null})
              ({u == 0 ?<option value="ups">UPS</option>:null})

          </select>
          }
          </div>
        </div>
    </div>
  )
}

export default WelcomeAmazon