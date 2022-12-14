import React from 'react'
import '../drvh.css'
import { Link } from 'react-router-dom'

function AddRoute({route,submit}) {
  return (
    <div className='form'>
         <h1>Add Route</h1>
    <form >
        <label >Name</label>
        <input type="text" id="fname" name="firstname"  onChange={e => route.setTemprature(e.target.value)}/>

        <br />

        <label >Temprature </label>
        <input type="number" id="lname"  onChange={e => route.setTemprature(Number(e.target.value))}/>

        <br />

        <label >Rain </label>
        <input type="number" id="lname" name="lastname" onChange={e => route.setRain(Number(e.target.value))}/>

        <br />

        <label >Pressure </label>
        <input type="number" id="lname" name="lastname" onChange={e => route.setPressure(Number(e.target.value))}/>

        <label >Wind Speed </label>
        <input type="number" id="lname" name="lastname" onChange={e => route.setWind(Number(e.target.value))}/>

        <br />
        <br />
       
        <Link to='/route' >
            <button id='submit' onClick={submit}>submit</button>
        </Link>
    </form>
    </div>
  )
}

export default AddRoute