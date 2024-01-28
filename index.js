// essential imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000

require("dotenv").config();





// routes and functions import
const { client, caseCollection, appointmentCollection } = require('./functions/databaseClient')
const usersRoute = require('./routes/users')
const casesRoute = require('./routes/cases')
const blogsRoute = require('./routes/blogs')
const practiceAreaRoute = require('./routes/practiceArea');
const paymentRoute = require('./routes/payment')
const { ObjectId } = require('mongodb');



// middleware configuration
app.use(express.json());
app.use(cors());



// main function
async function run() {
    try {
      
      app.get('/', (req, res)=>{
          res.send("Welcome to EquiJuris Associate server.");
      })
      app.use('/users', usersRoute)
      app.use('/blogs', blogsRoute)
      app.use('/cases', casesRoute)
      app.use('/practiceAreas', practiceAreaRoute)
      app.use('/pay',paymentRoute)
      app.post('/appointment/insert', async(req, res)=>{
        const apnt = req.body;
        let result = await appointmentCollection.insertOne(apnt);
    res.send({ data: result, success: true, message: "" });
      })
      app.get('/appointment/all', async(req, res)=>{
        let apnt = await appointmentCollection.find({}).toArray();
        apnt.sort((a,b)=> +new Date(a?.createdAt) - +new Date(b?.createdAt))
        res.send({ data: apnt, success: true, message: "" })
      })
     app.put('/appointment/update/:id', async(req, res)=>{
      let id = req.params.id;
      let data = req.body;
      let updateDoc = {
        $set:{
          ...data
        }
      }
      let result = await appointmentCollection.updateOne({_id: new ObjectId(id)}, updateDoc, {upsert:true})
      res.send({ data: result, success: true, message: "" });
     })
    } finally {
      
    }
  }
  run().catch(console.dir);


app.listen(port, async()=>{
    await client.connect();
    // await connectDB();
    await client.db("equiJurisAssociates").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    console.log(`Server is running on port ${port}`);
})





