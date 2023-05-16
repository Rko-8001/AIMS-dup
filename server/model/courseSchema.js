const mongoose = require('mongoose');
const secretkey = "hello,myselfteam12.. hellohellomictestinghellohello";

const courseSchema = new mongoose.Schema({
    courseID:{
        type: "String",
        required: "true"
    },
    statusInfo: [String]
});

const Course = mongoose.model('COURSE', courseSchema);

module.exports = Course;