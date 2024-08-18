const mongoose = require("mongoose");
const { Car } = require("./schema/Car.js");
const cors = require("cors");
const express = require('express')
const app = express()
const port = 3000
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile('views/index.html', {root: __dirname })
})
app.use(cors())
const middle = express.urlencoded({
   extended: false,
   limit: 10000,
   parameterLimit: 2,
});
app.use(express.json());
app.get('/register', (req, res) => {
  res.sendFile('views/register.html', {root: __dirname })
})
app.post('/register', middle, async (req, res) => {
  const data = await req.body;
  const find = await Car.findOne({ carNumber: data.carNum });
  if (find) {
    res.send({ task: 'exists' })
    return;
  }
  const car = new Car({
    carNumber: data.carNum,
    phoneNumber: data.phNum,
  })
  await car.save().catch(err => {console.log(err); res.send({ task: 'error' }); return;})
  res.send({ task: 'success' })
})
app.get('/search', (req, res) => 
  {
    res.sendFile('views/search.html', {root: __dirname })
})
app.post('/search', middle, async (req, res) => {
  const data = await  req.body;
  const find = await Car.findOne({ carNumber: data.search });
  if (find) {
    res.send({ task: 'success', data: { carNumber: find.carNumber, phoneNumber: find.phoneNumber } })
  } else {
    res.send({ task: 'not found', data: null })
  }
})
mongoose.connect(process.env["MONGO_URI"]).then(async ()=>{
  console.log("✅ Connected to databse")
}).catch((e)=>{ console.error(e)})
app.listen(port, () => {
  console.log(`🌐 App listening on port ${port}`)
})