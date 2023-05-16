const express = require('express');
const { findOne } = require('../model/userSchema');


const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");
const Course = require("../model/courseSchema");

// instructor logic
router.post('/abouti', async (req, res) => {

    const { courseID, email } = req.body;
    // console.log(courseID);
    // console.log(email);
    if (!courseID || !email) {
        return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
    }
    try {

        const loginuser = await User.findOne({ email: email });
        // console.log(loginuser.role);
        if (!loginuser || loginuser.role !== "Prof") {
            console.log("nopes");
            return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
        }
        const course = new Course({ courseID });
        await course.save();
        return res.status(201).json({ message: "Add ho gaya course" });

    } catch (error) {
        console.log(error);
        return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
    }
});

router.get('/abouti', async (req, res) => {
    try {

        const courses = await Course.find();


        const course = courses.map(course => ({
            courseID: course.courseID
        }));

        // console.log(course);

        return res.status(200).json(course);
    } catch (error) {
        console.log(error);
        return res.status(422).json({ message: "fuck off" });
    }

});




// student logic
router.get('/abouts', async (req, res) => {

    try {

        const courses = await Course.find();


        const course = courses.map(course => ({
            courseID: course.courseID
        }));

        // console.log(course);

        return res.status(200).json(course);
    } catch (error) {
        console.log(error);
        return res.status(422).json({ message: "fuck off" });
    }

});

router.post('/abouts', async (req, res) => {
    const { courseID, email } = req.body;

    if (!courseID || !email) {
        return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
    }
    // console.log(courseID);
    // console.log(email);
    try {

        const loginuser = await User.findOne({ email: email });
        // console.log(loginuser.role);
        if (!loginuser || loginuser.role !== "Student") {
            return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
        }

        const courseData = await Course.findOne({ courseID: courseID });
        if (!courseData) {
            return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
        }

        var statusInfo = "0" + email;
        await Course.findOneAndUpdate({ courseID: courseID },
            {
                $push: {
                    statusInfo: statusInfo
                },
            });

        return res.status(201).json({ message: "Advisor Pending.." });

    } catch (error) {
        console.log(error);
        return res.status(422).json({ error: "Unable to Enroll in course.." });
    }
});



//              ADVISOR
router.post('/abouta', async (req, res) => {

    const { courseID, email, studentID, toDo } = req.body;

    // console.log(email);  console.log(courseID);    console.log(studentID); console.log(toDo);

    if (!courseID || !email || !studentID || !toDo) {
        return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
    }
    try {

        const loginuser = await User.findOne({ email: email });
        if (!loginuser || loginuser.role !== "Advisor") {
            return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
        }

        const courseData = await Course.findOne({ courseID: courseID });
        if (!courseData) {
            return res.status(422).json({ error: "Not instuctror. Can't make changes to it" });
        }

        var statusInfo = "0" + studentID;
        if (toDo == "Approved") {

            var statusInfoU = "2" + studentID;
            const courseData = await Course.findOne({ courseID: courseID });

            await Course.updateMany(
                { courseID: courseID },
                { $set: { "statusInfo.$[element]": statusInfoU } },
                { arrayFilters: [{ element: statusInfo }] }
            )
            return res.status(202).json({ message: " Aprroved.." });
        }
        else {
            var statusInfoU = "1" + studentID;
            const courseData = await Course.findOne({ courseID: courseID });

            await Course.updateMany(
                { courseID: courseID },
                { $set: { "statusInfo.$[element]": statusInfoU } },
                { arrayFilters: [{ element: statusInfo }] }
            )
            return res.status(201).json({ message: "Rejected.." });
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({ error: "Can't make changes to it" });
    }

});

router.get('/abouta', async (req, res) => {
    try {

        const courses = await Course.find();

        // console.log(courses);
        const course = courses.map(course => ({
            courseID: course.courseID,
            statusInfo: course.statusInfo[0]
        }));

        // console.log(course);

        return res.status(200).json(course);
    } catch (error) {
        console.log(error);
        return res.status(422).json({ message: "fuck off" });
    }
 
});

module.exports = router;