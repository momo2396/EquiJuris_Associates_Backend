const express = require("express");
const router = express.Router();

const roleCheck = require("../functions/roleCheck");
const { practiceAreaCollection } = require("../functions/databaseClient");

router.get("/", async (req, res) => {
  let practiceAreas = await practiceAreaCollection.find({}).toArray();
  res.send({ data: practiceAreas, success: true, message: "" });
});
router.post("/insert-practiceArea", async (req, res) => {
  let newArea = req.body;
  let result = await practiceAreaCollection.insertOne(newArea);
  res.send({ data: result, success: true, message: "" });
});
module.exports = router;
