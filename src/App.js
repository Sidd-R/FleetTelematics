import { Route,Routes } from 'react-router';
import Homepage from './components/Homepage';
import WelcomeFedex from './components/WelcomeFedex';
import {useState,useEffect} from 'react'
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
  const [type, settype] = useState(-1) // 0 amazon 1 dsp
  const [age, setAge] = useState(0)
  const [trips, setTrips] = useState(0)
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
  const [review, setReview] = useState("")
  const [avg, setAvg] = useState()
  const [pdsp, setPdsp] = useState([])
  const [driverList, setDriverList] = useState(drl)
  const [vehicleList, setVehicleList] = useState(vcl)
  const [routeList, setRouteList] = useState(rol)
  const [coeffv, setCoeffv ] = useState([])
  const [coeffr, setCoeffr ] = useState([])
  const [coeffd, setCoeffd ] = useState([])

  const nav = useNavigate()  

  useEffect(() => {
    axios.get('http://localhost:4000/vehicle').then(res => {
      let x = (res['data']['data'].split(" ").map(e => e = Number(e)))
      // setCoeffv([...x])
      coeffv.push(...x)
      console.log(x,'vehicle coeff');

      vehicleList.forEach(e => {
        // console.log(coeffv,"oo");
        e.riskScore = 
        ((e.battery == "good"? -1 : 1) * coeffv[0]) +
        (e.year * coeffv[2]) +
        (e.miles * coeffv[3]) +
        (e.pressure * coeffv[4]) +  
        (e.fuel * coeffv[5]) +
        (e.oil * coeffv[6]) +
        coeffv[7]
        e.riskScore = Number(e.riskScore.toFixed(2))
      })
    })

    axios.get('http://localhost:4000/route').then(res => {
      let x = (res['data']['data'].split(" ").map(e => e = Number(e)))
      // setCoeffr([...x])
      coeffr.push(...x)
      console.log(x,'route coeff');

      routeList.forEach(e => {
        e.riskScore = 
        (e.rain * coeffr[0]) +
        (e.temprature * coeffr[1]) +
        (e.pressure * coeffr[2]) + 
        (e.wind * coeffr[3]) +
        coeffr[4]

        e.riskScore = Number(e.riskScore.toFixed(2))
      })
    })

    axios.get('http://localhost:4000/driver').then(res => {
      let x = (res['data']['data'].split(" ").map(e => e = Number(e)))
      // setCoeffd([...x])
      coeffd.push(...x)
      console.log(x,'driver coeff');

      driverList.forEach(e => {
        e.safety =
        (e.age * coeffd[0]) +
        (e.trips * coeffd[1])  +
        (e.miles * coeffd[2])  +
        (e.speeding * coeffd[3]) +
        (e.seatbelt * coeffd[4]) +
        coeffd[5]

        e.safety = Number(e.safety.toFixed(2))
      })
    })

  }, [avg])

  useEffect( () => {
    calAvg()
  }, [])
  
  let r 
  // axios.post('http://localhost:4000/',{r}).then(res => console.log(res['data']['data'])).then(err => console.log(err))

  const driver = {
    setAge: setAge,
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
    console.log(coeffd,'lll')

      let a1 = (age * coeffd[0]) 
      let a2 = (trips * coeffd[1])  
      let a3 = (milesd * coeffd[2])  
      let a4 = (speeding * coeffd[3]) 
      let a5 = (seatbelt * coeffd[4])
      let c =  coeffd[5]

      console.log(a1,a2,a3,a4,a5,c)
      console.log(age,trips,milesd,speeding,seatbelt)

      let safety = a1 + a2 + a3 + a4 + a5 + c

    safety = Number(safety.toFixed(2))
    // console.log(review);

    fetch('http://localhost:4000/feedback',{
      headers: {'Content-type': 'application/json'},
      method: 'POST',
      body: JSON.stringify({review : review})
    }).then(res => res.json()).then(data => {
      let x = {
        age: age,
        miles:milesd,
        name:name,
        safety:safety,
        speeding:speeding,
        seatbelt:seatbelt,
        trips:trips,
        safety: data['data'] == 'Positive feedback'? Number((safety + 5).toFixed(2))  : Number((safety - 5).toFixed(2)),
        feedback: data['data']
      }
      driverList.push(x)
      calAvg()
      nav('/driver')

      axios.post('http://localhost:4000/addDriver',{x}).then(res => console.log(res)).then(err => console.log(err))
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
    (battery * coeffv[0]) +
    (year * coeffv[2]) +
    (milesv * coeffv[3]) +
    (pressuret * coeffv[4]) +  
    (fuel * coeffv[5]) +
    (oil * coeffv[6]) +
    coeffv[7]


    let x = {
      name:name,
      year:year,
      miles:milesv,
      oil:oil,
      fuel:fuel,
      pressure:pressuret,
      battery:battery == -1? "good" : "average",
      riskScore:Number(riskScore.toFixed(2))
    }

    vehicleList.push(x)
    calAvg()

    axios.post('http://localhost:4000/addVehicle',{x}).then(res => console.log(res)).then(err => console.log(err))

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
      (rain * coeffr[0]) +
      (temprature * coeffr[1]) +
      (pressurew * coeffr[2]) + 
      (wind * coeffr[3]) +
      coeffr[4]

    let x = {
      name:name,
      rain:rain,
      pressure:pressurew,
      temprature:temprature,
      wind:wind,
      riskScore:Number(riskScore.toFixed(2))
    }

    routeList.push(x)

    calAvg()

    axios.post('http://localhost:4000/addRoute',{x}).then(res => console.log(res)).then(err => console.log(err))

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
  
  return (
    <div className="App">
      <Routes>
        {type == -1?
        <Route path='/' element={<Login settype={settype}/>}/>:
        <Route path='/' element={<Homepage type={type} settype={settype}/>}/> 
        }
        {type == 1 ?
        <Route path='/services' element={<WelcomeFedex settype={settype} type ={type}/>}/> :
        <Route path='/services' element={<WelcomeAmazon settype={settype} pdsp={pdsp} avg={avg}/>}/>
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
