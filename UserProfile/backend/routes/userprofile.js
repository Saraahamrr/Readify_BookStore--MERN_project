import express from "express";
const router = express.Router();
import User from "../ModelsSchemas/users.js";


router.post("/sign-up" , async(req,res)=>{
    try{
        const{email,password, username,address} = req.body;
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
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);


        //create a new user
        const newUser = new User({
            username : username,
            email   : email,
            address : address,
            password: password
        });
        //save the user
        await newUser.save();
        return res.status(200).json({msg: "User has been saved successfully"});



    }catch(err){
        console.log(err);
        res.status(500).json({msg: "Internal server error"});
    }
});


export default router;

// import express from "express";
// const router = express.Router();
// import User from "../ModelsSchemas/users.js";

// router.post("/sign-up", async (req, res) => {
//     console.log("🔵 Received sign-up request:", req.body);

//     try {
//         const { email, password, username, address } = req.body;

//         if (!username || !email || !password || !address) {
//             console.log("🟡 Missing required fields");
//             return res.status(400).json({ msg: "All fields are required" });
//         }

//         console.log("✅ All fields provided");

//         // Check if username exists
//         const userExists = await User.findOne({ username });
//         if (userExists) {
//             console.log("🟡 Username already exists");
//             return res.status(400).json({ msg: "Username already exists" });
//         }

//         // Check if email exists
//         const emailExists = await User.findOne({ email });
//         if (emailExists) {
//             console.log("🟡 Email already exists");
//             return res.status(400).json({ msg: "Email already exists" });
//         }

//         console.log("🔵 Hashing password...");
//         const hashedPassword = password; // TODO: Replace with bcrypt hash later

//         console.log("🔵 Creating new user...");
//         const newUser = new User({ username, email, address, password: hashedPassword });

//         console.log("🔵 Saving user to database...");
//         await newUser.save();

//         console.log("✅ User saved successfully");
//         return res.status(201).json({ msg: "User has been saved successfully" });

//     } catch (err) {
//         console.error("❌ Error in /sign-up:", err);
//         return res.status(500).json({ msg: "Internal server error" });
//     }
// });

// export default router;
