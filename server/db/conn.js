const mongoose = require('mongoose');
const DB = ''

mongoose.connect(DB).then( () => {
    console.log("Connection Success..");
}).catch((err) => {
    console.log("Connection Failed..");
});
