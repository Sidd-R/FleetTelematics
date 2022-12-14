import '../drvh.css'
import Contact from './Contact'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
// import { driverList } from '../driverList';


function Driver({driverList,settype}) {

  console.log(driverList)
  return (
    <div className="main">
        <Navbar settype={settype}/>
        {/* <img className='top-img' src={require("../images/driver.png")} alt="" /> */}
        <div className="introfed">Get all The Driver Updates!</div>
        <div className="table" >
          <Table striped bordered hover responsive >
            <thead>
              <tr>
                <th width="30px">#</th>
                <th width="150px"><span>Name</span></th>                
                <th width="100px"><span>Age</span></th>
                <th width="100px"><span>No. of Trips</span></th>
                <th width="100px"><span>Total Miles</span></th>
                <th width="100px"><span>Speeding</span></th>
                <th width="100px"><span>Seatbelt</span></th>
                <th width="100px"><span>feedback</span></th>
                <th width="100px"><span>Safety Score</span></th>
              </tr>
            </thead>
            <tbody>{
              driverList.map((e,i) => {
              return  <tr>
                        <td>{i+1}</td>
                        <td>{e.name}</td>
                        <td>{e.age}</td>
                        <td>{e.trips}</td>
                        <td>{e.miles}</td>
                        <td>{e.speeding}</td>
                        <td>{e.seatbelt}</td>
                        <td>{e.feedback}</td>
                        <td>{e.safety}</td>
                      </tr>
              })}
              
            </tbody>
          </Table>
        </div>
        <Link to='/addDriver' className='mid-img-link'>
            <img className='mid-img' src={require("../images/adddriver.png")} alt=""  />
        </Link>
        {/* <Link to='/driverReview' className='mid-img-link'>
            <img className='mid-img' src={require("../images/addReviewd.png")} alt=""  />
        </Link> */}
        
        {/* <Contact/> */}
    </div>
  )
}

export default Driver