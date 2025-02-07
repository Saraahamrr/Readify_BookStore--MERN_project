const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth.js");
const { SendverifyEmail } = require("../controllers/SendverifyEmail.js");
const { VerifyEmail } = require("../controllers/VerifyEmail.js");
const { send } = require("process");


//sign-up route
// localhost:3000/api/v1/sign-up
router.post("/sign-up" , async(req,res)=>{
    try{
        const{username,email,password,address} = req.body;
        //check if name is more than 4 characters
        if(username.length < 4){
            return res
            .status(400)
            .json({msg: "UserName should be more than 4 characters"});
        }
        //check if name already exists
        // mesh fhamaha lesa 
        const userExists = await User.findOne({username: username});
        if(userExists){
            return res
            .status(400)
            .json({msg: "UserName already exists"});
        }
        //check if email already exists
        const emailExists = await User.findOne({email: email});
        if(emailExists){
            return res
            .status(400)
            .json({msg: "Email already exists"});
        }
        //check if password is more than 6 characters
        if(password.length < 6){
            return res.status(400)
            .json({msg: "Password should be more than 6 characters"});
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        //create a new user
        const newUser = new User({
            username : username,
            email   : email,
            address : address,
            password: hashedPassword
        });

        //save the user
        await newUser.save();
        //create a token 
        const token = jwt.sign({ id: newUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: "30d" });
        //save Token in cookie
        res.cookie('token', token, 
            { 
                httpOnly: true,
                secure: false,   
                sameSite: 'none' , // to make it work on another domains
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });
        SendverifyEmail(req,res);
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error"});
    }
});


//sign-in route
// localhost:3000/api/v1/sign-in
router.post("/sign-in" , async(req,res)=>{
    try{
        const{username,password} = req.body;
        //check if name is more than 4 characters
        if(username.length < 4){
            return res
            .status(400)
            .json({msg: "UserName should be more than 4 characters"});
        }
        //check if name already exists
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return res
            .status(400)
            .json({msg: "UserName does not exist"});
        }
        //check if password is more than 6 characters
        if(password.length < 6){
            return res.status(400)
            .json({msg: "Password should be more than 6 characters"});
        }

        //compare the password
        // compare gives a boolean value(0 or 1 or true or false)(search for it)
        await bcrypt.compare(password, existingUser.password,(err, result)=>{
            if(result){
                const authUserdata = {
                name : existingUser.username,
                email: existingUser.email,
                role : existingUser.role
            };
               const token = jwt.sign({id : authUserdata._id},process.env.JWT_SECRET,{expiresIn: "7d"});
              res.cookie('token', token, 
                { 
                    httpOnly: true,
                    secure: false,   
                    sameSite: 'none' , // to make it work on another domains
                    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
                });
                return res
                .status(200)
                .json(
                    {
                        id: existingUser._id, 
                        role : existingUser.role ,
                        token: token,
                        msg : "User signed-in successfully"
                    })

            }
            else{
                return res.status(400).json({msg: "Password is incorrect"});

            }
        });

    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error"});
    }
});

//sign-out route
// localhost:3000/api/v1/sign-out
router.post("/sign-out", (req,res)=>{
    try{
        res.clearCookie('token');
        return res.status(200).json({msg: "User signed-out successfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error"});
    }
});

// user-info route
// localhost:3000/api/v1/userInfo
// bearer ??
router.get("/user-info", authToken , async(req,res)=>{
    try{
    const {id} = req.headers;
    const data = await User.findById(id);
    console.log(data);
    return res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error"});
    }
});

// update-user-info route
// localhost:3000/api/v1/updateUserInfo
router.put("/update-user-info", authToken , async(req,res)=>{
    try{
    const {id} = req.headers;
    const data = await User.findByIdAndUpdate(id, req.body, {new: true});
    return res.status(200).json({msg: "User updated successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error"});
    }
}); 

// send-verify-email route
// localhost:3000/api/v1/send-verify-email
router.post("/send-verify-email", authToken,SendverifyEmail);
router.post("/verify-email", authToken,VerifyEmail);
module.exports = router;
