const mongoose = require('mongoose');
const url = process.env.DB_BASE_URL;
const DB_NAME = process.env.DB_NAME;

mongoose.connect(url, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false}, 
    (err) => {
        if(!err){
            console.log(`Database ${DB_NAME} is up...`);
        } else {
            console.log(`Database is not connected error:${err}`);
        }
    }
);

module.exports = mongoose;