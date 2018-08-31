const fs = require('fs');
const path = require('path');
let uploadDir = "";
let url = "";
let port = "";
if(process.env.NODE_ENV == "production"){
    uploadDir = path.join(__dirname,'..','upload');
    port = 8080;
    url = '';
} else {
    uploadDir = path.join(__dirname,'..','upload');
    port = 8081;
    url = 'mongodb://localhost:27017/test'
}

if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

module.exports = {
    name: 'API',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || port,
    upload_dir : uploadDir,
    db: {
        uri: url,
    },
};

