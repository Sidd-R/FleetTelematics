import React from 'react'
import '../Login.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// let type = 0

// const [type, settype] = useState(0)


const Login = ({settype}) => {
  const nav = useNavigate()
  const check = () => {
    if (email == "fedex" && password == "123"){
       settype(1)
       nav('/')
      }
    else if (email == "amazon" && password == "456") {
      settype(0)
      nav('/')
    }
    else setInvalid("Invalid Credentials!!")

  }

  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  const [invalid, setInvalid] = useState('')

  return (
    <div className='login-main'>
    <span id='a1'>Fleet Telematics</span>
    <div className='login-box'>
        <div className='login-txt'>Login</div>
        <div className='input'>
            User Id: 
            <input type="text" className='text-box' onChange={(e) => setemail(e.target.value)}/>
        </div>
        <div className='input'>
            Password: 
            <input type="password" className='text-box' onChange={(e) => setpassword(e.target.value)}/>
        </div>
        <div className='lg-btn'>
          <button className='login-submit' onClick={() => check()}>Submit</button>
          <h3>{invalid}</h3>
        </div>
    </div>
    </div>
  )
}

export default Login