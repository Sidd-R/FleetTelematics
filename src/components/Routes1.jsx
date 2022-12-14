import '../drvh.css'
import Contact from './Contact'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const Route1 = ({routeList,settype}) => {
    return (
        <div className="main">
        <Navbar settype={settype}/>
        {/* <img className='top-img' src={require("../images/route.png")} alt="" /> */}
        <div className="introfed">Get all The Route Updates!</div>
        <div className="table">
          <Table striped bordered hover responsive>
            <thead >
              <tr>
                <th width="30px">#</th>
                <th width="150px"><span>Name</span></th>                
                <th width="100px"><span>Rain</span></th>
                <th width="100px"><span>Temprature</span></th>
                <th width="100px"><span>Pressure</span></th>
                <th width="100px"><span>Wind Speed</span></th>
                <th width="100px"><span>Risk Score</span></th>
              </tr>
            </thead>
            <tbody>{
              routeList.map((e,i) => {
              return  <tr>
                        <td>{i+1}</td>
                        <td>{e.name}</td>
                        <td>{e.rain}</td>
                        <td>{e.temprature}</td>
                        <td>{e.pressure}</td>
                        <td>{e.wind}</td>
                        <td>{e.riskScore}</td>
                      </tr>
              })}
              
            </tbody>
          </Table>
        </div>
        <Link to='/addRoute' className='mid-img-link'>
            <img className='mid-img' src={require("../images/addRoute.png")} alt=""  style={{width: "40%",marginTop:"0px",marginBottom:"60px"}}/>
        </Link>
        {/* <Contact/> */}
    </div>
      );
}
 
export default Route1;