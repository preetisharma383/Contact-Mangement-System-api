import express from 'express'
import { Auth, Login, Register } from '../controller/user.controller.js';
const router=express.Router();
import { body } from 'express-validator';
import { verifyUser } from '../middleware/verifyUser.middleware.js';

//Register end point
router.post('/register', [
    body('name').trim().notEmpty().withMessage("Name should not be empty"),
    body('email').trim().notEmpty().withMessage("Email should not be empty")
    .isEmail().withMessage("Invalid Email!!"),
    body('password').trim().notEmpty().withMessage("Password should not be empty").isLength({min:5,max:20})
    .withMessage("Password length should be 5-20")

], Register)
router.post('/login', [
    body('email').trim().notEmpty().withMessage("Email should not be empty")
    .isEmail().withMessage("Invalid Email!!"),
    body('password').trim().notEmpty().withMessage("Password should not be empty").isLength({min:5,max:20})
    .withMessage("Password length should be 5-20")

], Login)
router.get('/verify',verifyUser, Auth)

export {router as Router}