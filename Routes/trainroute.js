const express=require("express")
const router=express.Router()


const {createTrain,trainAvailability,trainBooking,getBookingDetails}=require("../Controller/train.controller")
const {auth}=require("../Middleware/auth.middleware")


router.post("/createTrain",auth,createTrain)
router.get("/trains/availability",trainAvailability)
router.post("/trains/book/:trainid",trainBooking)
router.get("/bookings/:bookingid",getBookingDetails)

module.exports = router;