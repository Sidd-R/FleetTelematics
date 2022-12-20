const express = require('express')
const app = express()
const spawner = require('child_process').spawn
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csv = require('csv-parser')
const fs = require('fs')
const port = 4000

app.use(require('cors')())
app.use(express.json())

app.post('/feedback', (req, res) => {
    const result = feedback(req.body.review)
    console.log(req.body.review);
    result.then(data => res.json({data:data}))
    // res.send('Hello World!')
})

app.get('/vehicle',(req,res) => {
    const result = vehicleCoeff()
    // console.log(result)
    result.then(data => res.json({data:data}))
})

app.get('/route',(req,res) => {
    const result = routeCoeff()
    console.log(result)
    result.then(data => res.json({data:data}))
})

app.get('/driver',(req,res) => {
    const result = driverCoeff()
    // console.log(result)
    result.then(data => res.json({data:data}))
})

app.post('/addRoute',(req,res) => {
    // console.log(req.body);
    const {x} = req.body
    const route = {
        DESTINATIONS: '',
        AVG_RISK_SCORE: x.riskScore,
        RAIN: x.rain,
        TEMP: x.temprature,
        PRESSURE: x.pressure,
        WIND_SPEED: x.wind,
        WIND_DIRECTION: ''
    }

    addRoute(route);
    res.json("success")
    console.log(x);
})

app.post('/addVehicle',(req,res) => {
    const {x} = req.body
    const vehicle = {
        SAFETY_SCORE: x.riskScore,
        YEAR: x.year,
        TOTAL_MILES_DONE: x.miles,
        BATTERY_HEALTH: x.battery == 'good' ? 'GOOD':'AVERAGE',
        TYRE_PRESSURE: x.pressure,
        FUEL_LEVEL: x.fuel,
        OIL_LEVEL: x.oil
    }

    addVehicle(vehicle);
    res.json("success")
    console.log(x,route);
})

app.post('/addDriver',(req,res) => {
    const {x} = req.body
    const driver = {
        AGE: x.age,
        NUMBER_OF_TRIPS: x.trips,
        TOTAL_MILES_DONE: x.miles,
        SPEEDING: x.speeding,
        SEATBELT: x.seatbelt,
        SAFETY_SCORE: x.safety,
    }

    addDriver(driver);
    res.json("success")
    console.log(x,driver);
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// adding data to csv files
const route_csv = createCsvWriter({ //route
    path: './routeF.csv',
    header: [
        {id: 'DESTINATIONS', title: 'DESTINATIONS'},
        {id: 'AVG_RISK_SCORE', title: 'AVG_RISK_SCORE'},
        {id: 'RAIN', title: 'RAIN'},
        {id: 'TEMP', title: 'TEMP'},
        {id: 'PRESSURE', title: 'PRESSURE'},
        {id: 'WIND_SPEED', title: 'WIND_SPEED'},
        {id: 'WIND_DIRECTION', title: 'WIND_DIRECTION'},
    ]
});

async function addRoute(x) {
    const results = [];
    await fs.createReadStream('./routeF.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results,'gg');
        results.push(x)
        console.log(results,'kk');
        route_csv.writeRecords(results).then(() => console.log('routes updated'));
  });
}

const vehicle_csv = createCsvWriter({ // vehicle
    path: './vehicleH.csv',
    header: [
        {id: 'SAFETY_SCORE', title: 'SAFETY_SCORE'},
        {id: 'YEAR', title: 'YEAR'},
        {id: 'TOTAL_MILES_DONE', title: 'TOTAL_MILES_DONE'},
        {id: 'BATTERY_HEALTH', title: 'BATTERY_HEALTH'},
        {id: 'TYRE_PRESSURE', title: 'TYRE_PRESSURE'},
        {id: 'FUEL_LEVEL', title: 'FUEL_LEVEL'},
        {id: 'OIL_LEVEL', title: 'OIL_LEVEL'},
    ]
});

async function addVehicle(x) {
    const results = [];
    await fs.createReadStream('./vehicleH.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        console.log(results,'vehicle');
        vehicle_csv.writeRecords(results).then(() => console.log('vehicle updated'));
    });
}

const driver_csv = createCsvWriter({ // driver
    path: './ddF.csv',
    header: [
        {id: 'AGE', title: 'AGE'},
        {id: 'NUMBER_OF_TRIPS', title: 'NUMBER_OF_TRIPS'},
        {id: 'TOTAL_MILES_DONE', title: 'TOTAL_MILES_DONE'},
        {id: 'SPEEDING', title: 'SPEEDING'},
        {id: 'SEATBELT', title: 'SEATBELT'},
        {id: 'SAFETY_SCORE', title: 'SAFETY_SCORE'},
    ]
});

async function addDriver(x) {
    const results = [];
    await fs.createReadStream('./ddF.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
        // console.log(results,'gg');
        results.push(x)
        console.log(results[results.length-1],'kk');
        driver_csv.writeRecords(results).then(() => console.log('driver updated'));
  });
}


//connecting py file to node
async function feedback (review)  {
    try {
        const result = await new Promise((res,rej) => {
            const process = spawner('python',['./nlp2f.py',review])
            let temp = null

            process.stdout.on('data',(data) => {
                temp = data.toString()
                console.log(temp);
                res(temp)
                
            })  
        })
        return result        
    } catch (err) {
        console.log(new Error(err).message)
    }    
}

async function vehicleCoeff ()  {
    try {
        const result = await new Promise((res,rej) => {
            const process = spawner('python',['./vehicle_.py'])
            let temp = null

            process.stdout.on('data',(data) => {
                temp = data.toString()
                console.log(temp,'vehicle');
                res(temp)
            })  
        })
        return result        
    } catch (err) {
        console.log(new Error(err).message)
    }    
}

async function driverCoeff ()  {
    try {
        const result = await new Promise((res,rej) => {
            const process = spawner('python',['./driver_.py'])
            process.stdout.on('data',(data) => {
                console.log(data.toString(),'driver');
                res(data.toString())
            })    
        })
        return result        
    } catch (err) {
        console.log(new Error(err).message)
    }    
}

async function routeCoeff ()  {
    try {
        const result = await new Promise((res,rej) => {
            const process = spawner('python',['./route.py'])
            process.stdout.on('data',(data) => {
                console.log(data.toString(),'route');
                res(data.toString())
            })  
        })
        return result        
    } catch (err) {
        console.log(new Error(err).message)
    }    
}