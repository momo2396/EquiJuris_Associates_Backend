const express = require('express')
const router = express.Router()

// functions import
const roleCheck = require('../functions/roleCheck')
const genToken = require('../functions/genToken')
const { userCollection } = require('../functions/databaseClient')
const { ObjectId } = require('mongodb')


router.get('/all-users', async (req, res) => {
    let users = await userCollection.find({}).toArray()
    res.send({ data: users, success: true, message: "" })
})
router.get('/single-user', async (req, res) => {
    let email = req.query.email
    console.log(req.query)
    let query = {
        email: email
    }
    let user = await userCollection.findOne(query)
    res.send({ data: user, success: true, message: "" })
})
router.post('/insert-user', async (req, res) => {
    let newUser = req.body.user

    let query = {
        email: newUser.email
    }

    let existUser = await userCollection.findOne(query)

    if(existUser){
        res.send({data: null, success:false, message: "Email Already Exist"})
    }

    else{
        let result = await userCollection.insertOne(newUser)
        res.send({ data: result, success: true, message: "" })
    }
    // console.log(existUser)
})

router.delete('/delete-user', async(req, res) =>{
   let id = req.query.id
   let query = {
    _id: new ObjectId(id)
   }
   let result = await userCollection.deleteOne(query)
   res.send({ data: result, success: true, message: "" })
})

module.exports = router