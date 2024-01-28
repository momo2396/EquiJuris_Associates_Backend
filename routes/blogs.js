const express = require('express')
const router = express.Router()

// functions import
const roleCheck = require('../functions/roleCheck')
const genToken = require('../functions/genToken')
const { blogCollection } = require('../functions/databaseClient')
const { ObjectId } = require('mongodb')

router.get('/all-blogs', async (req, res) => {
    let blogs = await blogCollection.find({}).sort({createdDate: -1}).toArray();
    res.send({ data: blogs, success: true, message: "" })
})

router.get('/single-blog/:id', async (req, res) => {
    let id = req.params.id
    let query = {
        _id  : new ObjectId(id)
    }
    let blog = await blogCollection.findOne(query)
    res.send({ data: blog, success: true, message: "" })
})

router.post('/insert-blog', async (req, res) => {
let newBlog = req.body
let result = await blogCollection.insertOne(newBlog)
res.send({ data: result, success: true, message: "" })    
})


router.delete('/delete-blog/:id', async(req, res) =>{
    let id = req.params.id
    let query = {
     _id: new ObjectId(id)
    }
    let result = await blogCollection.deleteOne(query)
    res.send({ data: result, success: true, message: "" })
 })

module.exports = router