const express = require('express')
const router = express.Router()

// functions import
const roleCheck = require('../functions/roleCheck')
const { caseCollection } = require('../functions/databaseClient')


router.get('/', async (req, res) => {
    let cases = await caseCollection.find({}).toArray()
    res.send({ data: cases, success: true, message: "" })
})

router.post("/insert-case", async (req, res) => {
    let newCase = req.body;
    let result = await caseCollection.insertOne(newCase);
    res.send({ data: result, success: true, message: "" });
  });

module.exports = router