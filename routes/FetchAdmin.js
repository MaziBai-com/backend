
const Admin = require('../models/Admin');

const FetchAdmin = async (req,res,next)=>{
    // GET USER FROM JWT TOKEN 
    try {
        const email = req.header('Admin');
        let admin = await Admin.find(); 
        if(email === admin[0].email){  
            next()
        }else{
            res.status(400).json({success:false,msg:"you are not an admin"})
        }
    } catch (error) {
        res.status(401).json({success:false,msg:"Internal Server Error"})
    }
    
}
module.exports = FetchAdmin 