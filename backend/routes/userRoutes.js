import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config({path: "../config.env"})

//For Password encryption
const userRouter = express.Router();
const SALT_ROUNDS = 6

//#1 GET ALL USERS
userRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })  
);

//#2 GET USER BY ID
userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const userId = req.params.id
        const user = await User.findById(userId);
        if(user){
            res.send(user);
        }
        else{
            res.status(404).send({message: 'User not found'});
        }
    })  
);

//#3 CREATE NEW USER
userRouter.post(
    '/create',
    expressAsyncHandler(async (req, res) =>{
        const checkEmail = await User.findOne({email: req.body.email});
        if(checkEmail){
            res.send({message: 'Email is already taken'});
        }
        else{
            const hashed_password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
            const newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hashed_password
            });
            const user = await newUser.save();
            res.send({message: 'User created', user});
        }
    })
)


//#4 UPDATE USER INFORMATION
userRouter.put(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(user){
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.password = req.body.password
            await user.save();
            res.send({message: 'User information updated'});
        }
        else{
            res.status(404).send({message:'User not found'});
        }
    })
)

//#5 DELETE A USER
userRouter.delete(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if(user){
            await user.remove();
            res.send({message: 'User deleted'});
        }
        else{
            res.status(404).send({message: 'User not found'});
        }
    })
)

//#6 LOGIN USER
userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) =>{
        const user = await User.findOne({email: req.body.email});
        
        if(user){
            let confirmation = await bcrypt.compare(req.body.password, user.password);
            if(confirmation){
                const token = jwt.sign({user}, process.env.SECRETKEY, {expiresIn: "1h"})
                res.json({success: true, token})
            }
            else{
                res.json({success:false, message:"Incorrect password"})
            }
        }
        else{
            res.json({success:false, message:"User not found"})
        }

    })
)

export default userRouter
