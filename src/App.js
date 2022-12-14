import { Route,Routes } from 'react-router';
import Homepage from './components/Homepage';
import WelcomeFedex from './components/WelcomeFedex';
import {useState} from 'react'
import Login from './components/Login';
import WelcomeAmazon from './components/WelcomeAmazon';
import Driver from './components/Driver';
import AddDriver from './components/AddDriver';
import Vehicle from './components/Vehicle';
import AddVehicle from './components/AddVehicle';
import { useNavigate } from "react-router-dom";
import AddRoute from './components/AddRoute';
import Route1 from './components/Routes1';
import 'bootstrap/dist/css/bootstrap.min.css';
import { driverList as drl } from './driverList';
import { vehicleList as vcl } from './vehicleList';
import { routeList as rol} from './routeList';
import AddReviewd from './components/AddReviewd';
import axios from 'axios';

function App() {
  const nav = useNavigate()  

  const [type, settype] = useState(-1) // 0 amazon 1 dsp
  const [age, setAge] = useState(0)
  const [trips, setTrips] = useState(0)
  const [safety, setSafety] = useState(0)
  const [milesd, setMilesd] = useState(0)
  const [name, setName] = useState("")
  const [speeding, setSpeeding] = useState(0)
  const [seatbelt, setSeatbelt] = useState(0)
  const [fuel, setFuel] = useState(0)
  const [oil, setOil] = useState(0)
  const [pressuret, setPressuret] = useState(0)
  const [battery, setBattery] = useState(0)
  const [year, setYear] = useState(0)
  const [milesv, setMilesv] = useState(0)
  const [rain, setRain] = useState(0)
  const [wind, setWind] = useState(0)
  const [temprature, setTemprature] = useState(0)
  const [pressurew, setPressurew] = useState(0)
  const [driverList, setDriverList] = useState(drl)
  const [vehicleList, setVehicleList] = useState(vcl)
  const [routeList, setRouteList] = useState(rol)
  const [review, setReview] = useState("")
  const [avg, setAvg] = useState(42.8)

  // const [feedback, setFeedback] = useState('')

  // console.log(rol);
let r = 'nice'
// axios.post('http://localhost:4000/',{r}).then(res => console.log(res['data']['data'])).then(err => console.log(err))

  const driver = {
    setAge: setAge,
    setSafety: setSafety,
    setMiles: setMilesd,
    setName: setName,
    setSeatbelt: setSeatbelt,
    setSpeeding: setSpeeding,
    setTrips: setTrips,
    setReview: setReview
  }

  const calAvg = () => {
    let driveravg = 0, vehicleavg = 0, routeavg = 0
    driverList.forEach(e => driveravg+= (100 - e.safety))
    vehicleList.forEach(e => vehicleavg += (e.riskScore))
    routeList.forEach(e => routeavg += e.riskScore)

    let avg = Number(((driveravg/driverList.length)*0.85 + (vehicleavg/vehicleList.length)*0.1 + (routeavg/routeList.length)*0.05).toFixed(2))
    console.log(avg);
    setAvg(avg)
  }

  const submitDriver = () => {

      let a1 = (age * 8.28335529e-2) 
      let a2 = (trips * -3.48321625e-3)  
      let a3 = (milesd * -4.18064156e-6)  
      let a4 = (speeding * 9.9403103e-2) 
      let a5 = (seatbelt * 7.67409511e-3)
      let c =  56.39158563

      // 4.3073447508 -4.54559720625 -0.10242571822 2.9820930900000002 42.00767409511 56.39158563
      //  52 1305 24500 30 42

      console.log(a1,a2,a3,a4,a5,c)
      console.log(age,trips,milesd,speeding,seatbelt)

      let safety = a1 + a2 + a3 + a4 + a5 + c

    // let feedback = ''
    safety = Number(safety.toFixed(2))
    console.log(review);

    fetch('http://localhost:4000/',{
      headers: {
          'Content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        review : review
      })
    }).then(res => res.json()).then(data => {
      console.log(data);
      driverList.push({
        age: age,
        miles:milesd,
        name:name,
        safety:safety,
        speeding:speeding,
        seatbelt:seatbelt,
        trips:trips,
        safety: safety,
        feedback: data['data']
      })
      calAvg()
      nav('/driver')
    })

    

    console.log(driverList);
  }

  const vehicle = {
    setName:setName,
    setFuel:setFuel,
    setOil:setOil,
    setBattery:setBattery,
    setMiles:setMilesv,
    setPressure:setPressuret,
    setYear:setYear

  }

  const submitVehicle = () => {
    let riskScore = 
    (battery * 3.48875089e-01) +
    (year * -1.68438593e-1) +
    (milesv * 4.33253695e-6) +
    (pressuret * -7.96480786e-1) +  
    (fuel * -8.27616914e-2) +
    (oil * 3.53904422e-2) +
    435.99589843

    // calAvg()
    // console.log(avg);

    vehicleList.push({
      name:name,
      year:year,
      miles:milesv,
      oil:oil,
      fuel:fuel,
      pressure:pressuret,
      battery:battery == -1? "good" : "average",
      riskScore:Number(riskScore.toFixed(2))
    })
    calAvg()

    console.log(vehicleList);
  }

  const route = {
    setName:setName,
    setRain: setRain,
    setPressure: setPressurew,
    setTemprature:setTemprature,
    setWind:setWind
  }

  const submitRoute = () => {
    let riskScore = 
      (rain * -0.03419579) +
      (temprature * 0.05295392) +
      (pressurew * 0.11649792) + 
      (wind * 0.05210126) +
      57.73539292

    routeList.push({
      name:name,
      rain:rain,
      pressure:pressurew,
      temprature:temprature,
      wind:wind,
      riskScore:Number(riskScore.toFixed(2))
    })

    calAvg()

    console.log(routeList);
  }

  const submitReview = (review) =>{
    fetch('http://localhost:4000/',{
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            review : r
        })
    }).then(res => res.json()).then(data => {
       console.log(data);
       setReview(data['data'])
    })


    console.log(review);
  }
  
  // calAvg()

  return (
    <div className="App">
      <Routes>
        {type == -1?
        <Route path='/' element={<Login settype={settype}/>}/>:
        <Route path='/' element={<Homepage type={type} settype={settype}/>}/> 
        }
        {type == 1 ?
        <Route path='/services' element={<WelcomeFedex settype={settype}/>}/> :
        <Route path='/services' element={<WelcomeAmazon avg={avg} settype={settype}/>}/>
        }
        <Route path='/driver' element={<Driver driverList={driverList} settype={settype} />}/>
        <Route path='/addDriver' element={<AddDriver submit={submitDriver} driver={driver} />}/>
        <Route path='/addVehicle' element={<AddVehicle submit={submitVehicle} vehicle={vehicle}/>}/>
        <Route path='/vehicle' element={<Vehicle vehicleList={vehicleList} settype={settype}/>}/>
        <Route path='/addRoute' element={<AddRoute submit={submitRoute} route={route}/>}/>
        <Route path='/route' element={<Route1 routeList={routeList} settype={settype}/>}/>
        <Route path='/driverReview' element={<AddReviewd submit={submitReview} setReview={setReview} review={review}/>}/>
      </Routes>     
    </div>
  );
}

export default App;
