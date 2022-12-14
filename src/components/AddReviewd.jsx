import React from 'react'
import '../drvh.css'
import { Link } from 'react-router-dom'

function AddReviewd({review,submit}) {
  return (
    <div className='form' style={{marginTop:"180px",width:"600px"}}>
         <h1>Add Driver</h1>
    <form >
        <textarea type="text" id="lname" name="lastname" onChange={e => review.setReview(e.target.value)} style={{height:"300px",width:"500px",marginTop:"50px",marginBottom:"50px"}}></textarea>

        <Link to='/driver'>
          <button onClick={() => submit()} id='submit'>Submit</button>    
        </Link>
    </form>
    </div>
  )
}
 
export default AddReviewd