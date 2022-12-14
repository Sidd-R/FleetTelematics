import '../drvh.css'
import Contact from './Contact'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';

function Vehicle({vehicleList,settype}) {
  console.log(vehicleList,"hello")
  return (
    <div className="main" >
        <Navbar settype={settype}/>
        {/* <img className='top-img' src={require("../images/vehicle-top.png")} alt="" /> */}
        <div className="introfed">Get all The Vehicle Updates!</div>
        <div className="table">
          <Table striped bordered hover responsive >
            <thead>
              <tr>
                <th width="30px">#</th>
                <th width="150px" ><span>Name</span></th>                
                <th width="100px"><span>Year</span></th>
                <th width="100px"><span>Total Miles</span></th>
                <th width="100px"><span>Battery</span></th>                
                <th width="150px"><span>Tyre Pressure</span></th>
                <th width="100px"><span>Oil Level</span></th>
                <th width="100px"><span>Fuel Level</span></th>
                <th width="100px"><span>Risk Score</span></th>
              </tr>
            </thead>
            <tbody>{
              vehicleList.map((e,i) => {
              return  <tr>
                        <td>{i+1}</td>
                        <td>{e.name}</td>
                        <td>{e.year}</td>
                        <td>{e.miles}</td>
                        <td>{e.battery}</td>
                        <td>{e.pressure}</td>
                        <td>{e.oil}</td>
                        <td>{e.fuel}</td>
                        <td>{e.riskScore}</td>
                      </tr>
              })
            }
              
            </tbody>
          </Table>
        </div>
        <Link to='/addVehicle' className='mid-img-link'>
            <img className='mid-img' src={require("../images/addvehicle.png")} alt=""  />
        </Link>
        {/* <Contact/> */}
    </div>
  )
}

export default Vehicle