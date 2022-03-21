const express = require('express'); 
const router = express.Router(); 

const {body , validationResult } = require('express-validator'); 

// model 
const MaidRefer = require('../../models/MaidRefer'); 

// ADD A REFER 
router.post('/refer',
[
    body('referee_name','Invalid Name').isLength({min:3}),
    body('referee_phone','Invalid Phone').isLength({min:6}),
    body('referer_name','Invalid Phone').isLength({min:3}),
    body('referer_phone','Invalid Phone').isLength({min:6}),
]
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false ,msg: "Phone and Name are Required" })
    }
    try {
        let refer = new MaidRefer({
            referee_name:req.body.referee_name,
            referee_phone:req.body.referee_phone,
            referer_name:req.body.referer_name,
            referer_phone:req.body.referer_phone
        })
        let newRefer = await refer.save(); 
        res.status(200).json({success:true,refer:refer}); 
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
        console.log(error.message)
    }
})

router.get('/getall',async(req,res)=>{
    try {
        let refers = await MaidRefer.find(); 
        res.status(200).json({ success:true, refers:refers})
    } catch (error) {
        res.status(401).json({ success:false, msg: "Internal Server Error" })
        console.log(error.message)
    }
})

module.exports = router 