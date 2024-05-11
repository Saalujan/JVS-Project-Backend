import asyncHandler from 'express-async-handler';
import generateToken from "../utils/generateToken.js";
import User from "../models/userModal.js";




const registerUser = asyncHandler(async (req,res)=>{
    const{name,email,password,phoneNumber,profilePic,role}=req.body;

    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400);
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,email,password,phoneNumber,profilePic,role
    });

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profilePic: user.profilePic,
            creationDate: user.creationDate,
        })
    }else{
        res.status(400);
        throw new Error('Invalid user Data')
    }
});

export {registerUser};



