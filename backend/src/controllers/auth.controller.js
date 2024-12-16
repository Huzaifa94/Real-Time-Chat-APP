import generateToken from "../lib/utils.js";
import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const  signup = async (req,res) => {

    const { email,fullName,password} = req.body;

    try {
        if(password.length < 6)
        { 
            return res.status(400).json({error: 'Password must be at least 6 characters long'});
        }
        const user = await User.findOne({email})
        if(user)  return res.status(400).json({message:"Email already Exists"})


            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({

        email,
        fullName,
        password: hashedPassword
    })

    if(newUser){
        
        generateToken(newUser._id,res)

        await newUser.save();
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilepic
        })
    }else{
        res.status(400).json({error: 'Invalid User data'})
    }


    } catch (error) {
        
        console.error("Error in signUP Controller",error.message);
        res.status(500).json({ message: "internal error"})
    }
};

export const signin = async (req,res) =>{

    const {email, password} = req.body;
try {
   const user = await User.findOne({ email: email});
   
   if(!user) return res.status(400).json({message: "User Not Found"})
    const isMatch = await bcrypt.compare(password, user.password);
   if(!isMatch) return res.status(400).json({message: "Invalid Password"})
    generateToken(user._id,res)
    res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilepic
    })
    
    
    } catch (error) {
        
    console.error("Error in signin Controller",error.message);
    res.status(500).json({ message: "internal error"})
    
 

    
}
 
};


export const signout = (req,res) =>{

    try {
        
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "User signed out Successfully"})
    } catch (error) {
        
    }
};

export const updateprofile = async (req,res) => {

    try {
        
     const { profilePic } = req.body;
     const userId = req.user._id;
    if (!profilePic){

        res.status(400).json({message: "Profile Pic is Required"})

    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const UpdateUser = await User.findByIdAndUpdate(userId, {profilePic: uploadResponse.secure_url}, {new: true})
    res.status(200).json(UpdateUser)
        
    } catch (error) {
        
        console.log("error in update profile",error);
        
    }

}

export const checkAuth = async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {

        console.error("Error in checkAuth", error);
        res.status(500).json({ message: "internal errorrrr" });
        
    }
}