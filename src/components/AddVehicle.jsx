import React from 'react'
import '../drvh.css'
import { Link } from 'react-router-dom'

function addvehicle({submit,vehicle}) {
    const sty = {
        display: "flex",
        // backgroundColor: "black"
        color: "black"
    }
  return (
    <div className='form' style={{marginTop:"85px"}}>
         <h1>Add Vehicle</h1>
    <form >
        <label >Name</label>
        <input type="text" id="fname" name="firstname" onChange={e => vehicle.setName(e.target.value)}/>
        <br />
        <label >Year</label>
        <input type="number" id="fname" name="firstname" onChange={e => vehicle.setYear(Number(e.target.value))}/>
        <br />

        <label >Battery: </label>
        <input  type="radio" name="battery" value="yes" onClick={() => {
          vehicle.setBattery(-1)
          }}/>
        <label>good </label>
        <input  type="radio" name="battery" value="no" onClick={() => {
          vehicle.setBattery(1)
          }}/>
        <label> average </label>
        <br />
        <br />

        <label >Tyre pressure </label>
        <input type="number" id="lname" name="lastname" onChange={e => vehicle.setPressure(Number(e.target.value))}/>
        <br />

        <label >Oil level </label>
        <input type="number" id="lname" name="lastname" onChange={e => vehicle.setOil(Number(e.target.value))}/>
        <br />

        <label >Fuel level </label>
        <input type="number" id="lname" name="lastname" onChange={e => vehicle.setFuel(Number(e.target.value))}/>
        <br />

        <label >Total Miles </label>
        <input type="number" id="lname" name="lastname" onChange={e => vehicle.setMiles(Number(e.target.value))}/>

        <Link to='/vehicle' >
            <button id='submit' value="Submit" onClick={submit}>submit</button>
        </Link>
    </form>
    </div>
  )
}

export default addvehicle