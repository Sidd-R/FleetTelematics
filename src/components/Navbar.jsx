import '../Navbar.css'
import { Link } from 'react-router-dom'
import Contact from './Contact'
import WelcomeFedex from './WelcomeFedex'
import Homepage from './Homepage'

const styleLink = {
  textDecoration:"none ",
  color:"#0770D0"

}

export default function Navbar({settype}) {
  return (
    <nav>
        <span className='nav-items'>
          <Link to='/'  style={styleLink}>Home</Link>
        </span>
        <span className='nav-items'>
          <Link to="/services" style={styleLink}>Services</Link>
        </span>
        <span className='nav-items' onClick={() => settype(-1)}>
          <Link to="/" style={styleLink}>Logout</Link>
        </span>
    </nav>
  )
}