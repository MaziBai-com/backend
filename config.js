const dotenv = require('dotenv'); 
dotenv.config()
module.exports = {
    PORT: process.env.PORT ,
    MONGO_URL: process.env.MONGO_URL ,
    MONGO_CLUSTER_URL: process.env.MONGO_CLUSTER_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGOOSE_OPTIONS: {
        useNewUrlParser:true 
    },
    NODEMAILER_EMAIL:process.env.NODEMAILER_EMAIL ,
    NODEMAILER_PASSWORD:process.env.NODEMAILER_PASSWORD ,
    GOOGLE_CLIENT_ID: "746130167111-n7o5qnpn9gns3m0nf75dk72tfton7239.apps.googleusercontent.com"
}
