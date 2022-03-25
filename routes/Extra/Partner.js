const express = require('express'); 
const router = express.Router(); 

const {body , validationResult } = require('express-validator'); 

// model 
const Partner = require('../../models/Partner');

// add job 
router.post('/collab',
[
    body('name','Invalid Name').isLength({min:3}),
    body('phone','Invalid Phone').isLength({min:6}),
    body('email','Invalid Email').isEmail()
]
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false ,msg: "check the details"})
    }
    try {
        let partner = new Partner({
            name:req.body.name,
            phone:req.body.phone,
            email:req.body.email,
            service:req.body.service   
        })
        partner = await partner.save(); 
        res.status(200).json({success:true,partner:partner}); 
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
        console.log(error.message)
    }
})

router.get('/getall',async(req,res)=>{
    try {
        let partners = await Partner.find().sort({date:-1}); 
        res.status(200).json({ success:true, partners:partners})
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
        console.log(error.message)
    }
})



module.exports = router 
