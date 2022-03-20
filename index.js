
const mongoose = require('mongoose'); 
const app = require('./app')

// importing 
const config = require('./config'); 
// mongoose.connect(config.MONGO_URL,config.MONGOOSE_OPTIONS)
mongoose.connect("mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false")
.then(()=>{
    console.log('Connected To Db')
    app.listen( config.PORT, ()=> {
        console.log('Server Started : ',config.PORT); 
    })
})
.catch((err)=> {
    console.log(err.message);
})
