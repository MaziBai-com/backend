const dotenv = require('dotenv'); 
dotenv.config()
module.exports = {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_CLUSTER_URL: process.env.MONGO_CLUSTER_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGOOSE_OPTIONS: {
        useNewUrlParser:true 
    },
    NODEMAILER_EMAIL:process.env.NODEMAILER_EMAIL,
    NODEMAILER_PASSWORD:process.env.NODEMAILER_PASSWORD 
}



// booking 
