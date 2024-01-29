const express = require('express')
const router = express.Router()

// functions import
const roleCheck = require('../functions/roleCheck')
const genToken = require('../functions/genToken')
const {paymentCollection, caseCollection} = require('../functions/databaseClient')
const { ObjectId } = require('mongodb')
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = process.env.STORE_ID
const store_passwd = process.env.STORE_PASS
const is_live = false
const transactionID = new ObjectId().toString();

router.post('/', async (req,res)=>{
    const cases = await caseCollection.findOne({_id: new ObjectId(req.body.caseID)})
    const pay = req.body
    const data = {
      total_amount: cases?.caseMoney,
      currency: 'BDT',
      tran_id: transactionID, 
      success_url: `https://equi-juris-associates-backend.vercel.app/pay/success/${transactionID}`,
      fail_url: 'http://localhost:5173/fail',
      cancel_url: 'http://localhost:3030/cancel',
      ipn_url: 'http://localhost:3030/ipn',
      shipping_method: 'Courier',
      product_name: pay?.caseID,
      product_category: 'Electronic',
      product_profile: 'general',
      cus_name: pay?.name,
      cus_email: pay?.email,
      cus_add1: 'Dhaka',
      cus_add2: 'Dhaka',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1000',
      cus_country: 'Bangladesh',
      cus_phone: '01711111111',
      cus_fax: '01711111111',
      ship_name: pay?.name,
      ship_add1: 'Dhaka',
      ship_add2: 'Dhaka',
      ship_city: 'Dhaka',
      ship_state: 'Dhaka',
      ship_postcode: 1000,
      ship_country: 'Bangladesh',
  };
  let paidCaseInfo;
  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
  sslcz.init(data).then(apiResponse => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL
      res.send({url:GatewayPageURL})

       paidCaseInfo = {
        caseID: pay?.caseID, 
        transactionID: transactionID,
        paidStatus: true,
        paidByName: pay?.name,
        paidByEmail: pay?.email,
        paidAt: new Date()
      }
  });

  router.post("/success/:tranID", async(req, res)=>{
    const result =await paymentCollection.insertOne(paidCaseInfo);
    let updateDoc = {
      $set:{
        isPaid: "paid"
      }
    }
    await caseCollection.updateOne({_id: new ObjectId(pay?.caseID)}, updateDoc, {upsert:true})
    res.redirect("https://equijuris-associates.vercel.app/dashboard/client/myCases")
  })
  });

  router.get('/view-payment/:id', async(req, res)=>{
  const id = req.params.id;
  const result = await paymentCollection.findOne({caseID: id})
  res.send({ data: result, success: true, message: "" })
  })

module.exports = router