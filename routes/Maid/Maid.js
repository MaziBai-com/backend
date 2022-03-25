const express = require('express'); 
const router = express.Router(); 
const { body, validationResult } = require('express-validator');

const Maids = require('../../models/Maid'); 
const FetchAdmin = require('../FetchAdmin');

// add a maid 



// edit a maid 

// all maids 
router.post('/register',
[
    body('name').isLength({ min: 1 }),
    body('phone').isLength({ min: 1 }),
],
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success:false ,msg: "Phone and Name are Required" })
    }

    let success = false
    try {
        // find if already exists 
        let maid = await Maids.find({phone:req.body.phone}); 
        console.log(maid); 
        if(maid.length!=0){
            return res.status(400).json({success:false,msg:"Maid already Exists with this phone"})
        }
        let {name ,phone,gender,zipcode  , place} = req.body; 
        
        // generating maid id 
        console.log('hello')
        
        let number = await Maids.find(); 
                
        maid = new Maids({
            maid_id:number.length+10000,
            name:name , 
            phone:phone || '',
            gender:gender || '',
            place:place || '',
            zipcode:zipcode || ''
        })
        const newmaid = await maid.save();
        success = true
        res.status(200).json({ success, maid:newmaid });
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
        console.log(error.message)
    }
})

// ROUTE TO EDIT THE FIELDS 
router.put('/edit/:id', FetchAdmin, [
    body('name').isLength({ min: 1 }),
    body('phone').isLength({ min: 1 }),
], async (req, res) => {
    let id = req.params.id; 
    let success = false
    try {
        let maid = await Maids.findByIdAndUpdate(id)
        if (!maid) {            
            return res.status(400).json({ success: false, msg: "Maid Not Found" })
        }
        const { name , gender,  zipcode  , phone , place  } = req.body
        if(name){
            maid.name = name  
        }
        if(gender){
            maid.gender = gender 
        }
        if(zipcode){
            maid.zipcode = zipcode
        }
        if(place){
            maid.street = place 
        }
        if(phone){
            maid.phone = phone 
        }
        const updatedMaid = await maid.save()
        res.status(200).json({ success: true, maid: updatedMaid })
    } catch (error) {
        res.status(401).json({ success, msg: "Internal Server Error" })
    }
})

// route for getting all the user info 
router.get('/getall' ,async (req, res) => {
    try {
        const maids = await Maids.find();
        if (maids) {
            res.status(200).json({success:true,maids:maids});
        }
    } catch (error) {
        res.status(401).json({success:false , msg:"Internal server error "})
    }
})

module.exports = router 
