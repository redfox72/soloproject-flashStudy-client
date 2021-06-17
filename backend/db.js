const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/flashDB', (err) => {
    if(!err){
        console.log('connected omg yay');
    } else {
        console.log('Error connecting : ' + JSON.stringify(err, undefined, 2));
    }
});

module.exports = mongoose;