import React from 'react'
import '../drvh.css'
import { Link } from 'react-router-dom'

function AddDriver({driver,submit}) {
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  return (
    <div className='form' style={{marginTop:"80px",height: "800px",overflowY:"scroll"}}>
         <h1>Add Driver</h1>
      <form >
          <label >Name </label>
          <input type="text" onChange={e => driver.setName(e.target.value)}/>

          <label >Age</label>
          <input type="number" id="fname" name="firstname" onChange={(e) => driver.setAge(Number(e.target.value))}/>
          <br />

          <label >Number of Trips </label>
          <input type="number" onChange={e => driver.setTrips(Number(e.target.value))}/>
          <br />

          <label >Total Miles </label>
          <input type="number" onChange={e => driver.setMiles(Number(e.target.value))}/>

          <label >Speeding: </label>
          <input type="number" onChange={e => driver.setSpeeding(Number(e.target.value))}/>
          <br />

          <label >Seatbelt: </label>
          <input type="number" onChange={e => driver.setSeatbelt(Number(e.target.value))}/>
          
          <label >Review: </label>
          <textarea type="text" onChange={e => driver.setReview(e.target.value)} style={{marginTop:"20px",marginBottom:"20px"}}></textarea>

          <Link to='/driver' >
            <button onClick={submit} id='submit'>Submit</button>    
          </Link>
      </form>
    </div>
  )
}

export default AddDriver