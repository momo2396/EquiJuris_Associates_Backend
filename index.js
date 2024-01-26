// essential imports
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000

require("dotenv").config();





// routes and functions import
const { client, caseCollection } = require('./functions/databaseClient')
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





