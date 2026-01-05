import express from 'express'
import { UserModel } from '../models/user.model.js'
import { validationResult } from 'express-validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config({path:"./config/.env"})

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { name, email, password } = req.body;
  email = email.toLowerCase();

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        errors: [{ msg: "User already exists" }],
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashPassword });
    const result = await newUser.save();

    const { password: _, ...userData } = result._doc;

    return res.status(201).json({
      success: true,
      ...userData,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      errors: [{ msg: "Internal server error" }],
    });
  }
};

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { email, password } = req.body;
  email = email.toLowerCase();

  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({
        errors: [{ msg: "User not Registered !" }],
      });
    }

    const isPasswordOk = await bcrypt.compare(password, userExist.password);
    if (!isPasswordOk) {
      return res.status(400).json({
        errors: [{ msg: "Incorrect Password !" }],
      });
    }
    const token =jwt.sign({_id:userExist._id},process.env.JWT_SECRET_KEY,{expiresIn:"3d"})

    const user={...userExist._doc,password:undefined}
    return res.status(201).json({success:true,user,token})

   
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      errors: [{ msg: "Internal server error" }],
    });
  }
};
const Auth=(req,res)=>{
    return res.status(200).json({success:true,user:{...req.user}})
}
export {Register,Login,Auth}