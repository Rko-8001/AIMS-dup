const jwt = require('jsonwebtoken');
const User = require("../model/userSchema");
const secretkey = "your secret key";

const authenticate = async (req, res, next) => {

    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, secretkey);

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token});

        if(!rootUser){
            throw new Error("User not Found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = authenticate;


/*
        code
        {
            email
            status 
            0
            1
            2 
            3 
            4
        }
*/