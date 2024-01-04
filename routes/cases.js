const express = require('express')
const router = express.Router()

// functions import
const roleCheck = require('../functions/roleCheck')
const { caseCollection } = require('../functions/databaseClient')
const { ObjectId } = require('mongodb')


router.get('/', async (req, res) => {
    let cases = await caseCollection.find({}).toArray()
    res.send({ data: cases, success: true, message: "" })
})

router.get('/my-cases', async (req, res) => {
  let email = req.query.email
  let cases = await caseCollection.find({lawyerEmail: email}).toArray()
  let sortedCases = cases.sort((a,b) => +new Date(b?.createdAt)  - +new Date(a?.createdAt) )
  res.send({ data: sortedCases, success: true, message: "" })
})

router.get('/single-case/:id', async (req, res) => {
  let id = req.params.id
  let query = {
      _id  : new ObjectId(id)
  }
  let singleCase = await caseCollection.findOne(query)
  res.send({ data: singleCase, success: true, message: "" })
})

router.post("/insert-case", async (req, res) => {
    let newCase = req.body;
    let result = await caseCollection.insertOne(newCase);
    res.send({ data: result, success: true, message: "" });
  });

module.exports = router