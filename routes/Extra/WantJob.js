const express = require('express'); 
const router = express.Router(); 

const {body , validationResult } = require('express-validator'); 

// model 
const WantJob = require('../../models/WantJob');
// const FetchAdmin = require('../FetchAdmin');

// add job 
router.post('/wantjob',
[
    body('name','Invalid Name').isLength({min:3}),
    body('phone','Invalid Phone').isLength({min:6}),
]
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false ,msg: "Phone and Name are Required" })
    }
    try {
        let job = new WantJob({
            name:req.body.name,
            phone:req.body.phone,
            zipcode:req.body.zipcode,
            place:req.body.place   
        })
        job = await job.save(); 
        res.status(200).json({success:true,job:job}); 
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
    }
})

router.get('/getall', async(req,res)=>{
    try {
        let jobs = await WantJob.find().sort({date:-1}); ; 
        res.status(200).json({ success:true, jobs:jobs})
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
    }
})



module.exports = router 
