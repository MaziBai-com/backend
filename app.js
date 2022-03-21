// INTIALISING EXPRESS 
const express = require('express')
const app = express(); 

// MIDDLEWARES 
app.use(express.json())
app.use(express.urlencoded({ extended: true}));
const cors = require('cors')
app.use(cors())
const dotenv = require('dotenv');
dotenv.config(); 

// ROUTES 
const UserAuthRoutes = require('./routes/Auth/UserAuth');
const ReviewRoutes = require('./routes/Reviews/Review');
const BookingRoutes = require('./routes/Bookings/Bookings'); 
const NotificationRoutes = require('./routes/Notifications/Notifications'); 
const PasswordResetRoutes = require('./routes/Otp/Otp'); 
const MaidRoutes = require('./routes/Maid/Maid'); 
const MaidRefer = require('./routes/Extra/MaidRefer'); 
const WantJob = require('./routes/Extra/WantJob');
const PartnerRoutes = require('./routes/Extra/Partner');  
app.use('/api/auth/user',UserAuthRoutes)
app.use('/api/reviews',ReviewRoutes)
app.use('/api/bookings',BookingRoutes); 
app.use('/api/auth/admin',require('./routes/AdminAuth/AdminAuth')); 
app.use('/api/notifications',NotificationRoutes); 
app.use('/api/passwordreset',PasswordResetRoutes)
app.use('/api/maid',MaidRoutes); 
app.use('/api/maidrefer/',MaidRefer); 
app.use('/api/job',WantJob); 
app.use('/api/partner',PartnerRoutes); 

// login user details 
app.use('/api/user/',require('./routes/loginUser/LoginUser'))


// To Upload Image 
app.use('/api/upload',require('./routes/Upload'))
// static images response 
app.use('/uploads',express.static('uploads'))


app.get('/',(req,res)=>{
    res.send('Hello I am Uday')
})


module.exports = app;