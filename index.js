const express = require('express')
const app = express()
const spawner = require('child_process').spawn
const port = 4000

app.use(require('cors')())
app.use(express.json())


app.post('/', (req, res) => {
    const result = mlModel(req.body.review)
    console.log(req.body.review);
    result.then(data => res.json({data:data}))
    // res.send('Hello World!')
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

//connecting py file to node
async function mlModel (review)  {
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