const express = require('express'); 
const router = express.Router(); 

const {body , validationResult } = require('express-validator'); 

// model 
const WantJob = require('../../models/WantJob');

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
            address:{
                zipcode: req.body.zipcode,
                state:req.body.state, 
                place:req.body.place 
            }    
        })
        job = await job.save(); 
        res.status(200).json({success:true,job:job}); 
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
        console.log(error.message)
    }
})

router.get('/getall',async(req,res)=>{
    try {
        let jobs = await WantJob.find(); 
        res.status(200).json({ success:true, jobs:jobs})
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
        console.log(error.message)
    }
})



module.exports = router 
