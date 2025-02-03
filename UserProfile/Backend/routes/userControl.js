const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authToken} = require("./userAuth.js");


//sign-up route
// localhost:3000/api/v1/sign-up
router.post("/sign-up" , async(req,res)=>{
    try{
        const{username,email,password,address} = req.body;
        //check if name is more than 4 characters
        if(username.length < 4){
            return res
            .status(400)
            .json({msg: "Name should be more than 4 characters"});
        }
        //check if name already exists
        // mesh fhamaha lesa 
        const userExists = await User.findOne({username: username});
        if(userExists){
            return res
            .status(400)
            .json({msg: "Name already exists"});
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
        return res.status(200).json({msg: "User signed-up successfully"});



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
            .json({msg: "Name should be more than 4 characters"});
        }
        //check if name already exists
        // mesh fhamaha lesa 
        const existingUser = await User.findOne({username});
        if(!existingUser){
            return res
            .status(400)
            .json({msg: "Name does not exist"});
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
                const authClaims = {
                name : existingUser.username,
                email: existingUser.email,
                role : existingUser.role
            };
                const token = jwt.sign({authClaims},"bookstore123",{expiresIn: "30d"});   

                return res.status(200).json(
                    {id: existingUser._id, role : existingUser.role ,token: token});
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


// user-info route
// localhost:3000/api/v1/userInfo
// bearer ??
router.get("/user-info", authToken , async(req,res)=>{
    try{
    const {id} = req.headers;
    const data = await User.findById(id);
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

module.exports = router;
