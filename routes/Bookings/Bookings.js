const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
// middleware to fetch user 
const FetchUser = require('../FetchUser')
const FetchAdmin = require('../FetchAdmin')
// importing the model 
const Bookings = require('../../models/Booking'); 
const User = require('../../models/User'); 

// maid booking 
router.post('/book',
[
    body('phone', 'Invalid Phone').isLength({min:5})
],
async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({ success:false , msg: "Invalid Mobile Number" })
    }
    try {
            let booking = new Bookings({
                name:req.body.name, 
                email: req.body.email,
                preferGender:req.body.preferGender,
                phone:req.body.phone,
                service:req.body.service,
                place:req.body.place,
                text:req.body.text, 
                zipcode:req.body.zipcode, 
                status:'Booked'
            })
            const newBooking = await booking.save();
            success = true
            res.status(200).json({ success, newBooking});
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
    }
    
})

// edit route for the status updates 
router.put('/edit/:id', FetchAdmin,async (req,res)=>{
    // fetch admin to be added 
    const id = req.params.id;
    try {
        if(!req.body.status){
            res.status(200).json({success:false,msg:"Status Required"}); 
        }
        let booking = await Bookings.findByIdAndUpdate(id);
        if(booking){
            booking.status = req.body.status;
            let update = await booking.save(); 
            res.status(200).json({success:true,update}); 
        }else{
            res.status(400).json({success:false,msg:"There is no booking with this id"})
        }
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
    }
})
// get all bookings 
router.get('/allbookings',FetchAdmin ,async (req,res)=>{
    // need to include fetch adming for these type of routes 
    try {
        let bookings = await Bookings.find().sort({date:-1})
        if(bookings){
            res.status(200).json({success:true,bookings});
        }
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
    }
})
router.get('/userbookings',FetchUser ,async (req,res)=>{
    // need to include fetch adming for these type of routes 
    try {
        let user = await User.findById(req.user.id); 
        let bookings = await Bookings.find({email:user.email}).sort({date:-1})
        if(bookings){
            res.status(200).json({success:true,bookings});
        }
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
    }
})
router.delete('/delete/:id' ,async (req,res)=>{
    // need to include fetch adming for these type of routes 
    try {
        const id = req.params.id;
        let booking = await Bookings.findByIdAndDelete(id);
        if(booking){
            res.status(200).json({success:true,booking});
        }else{
            res.status(400).json({success:false,msg:"Booking Not Available"})
        }
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
    }
})

module.exports = router ; 
