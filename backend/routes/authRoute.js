import express from 'express';
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController
} from "../controllers/authController.js";

import { isAdmin, requireSignIn } from './../middlewares/authMiddleware.js';
import { getAllUsersController } from '../controllers/authController.js';
// router object : for routing in separate file
const router = express.Router();


// routing

// REGISTER || METHOD : POST
router.post('/register', registerController);

// LOGIN || METHOD : POST
router.post('/login', loginController);

// Forgot Password || METHOD : POST
router.post('/forgot-password', forgotPasswordController);
// test routes
router.get('/test',requireSignIn,isAdmin,testController);

// Protected Admin route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// Protected user route
router.get('/user-auth', requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// update user profile
router.put('/profile',requireSignIn,updateProfileController);

// Get all users (Admin only)
router.get('/all', requireSignIn, isAdmin, getAllUsersController);
export default router;
