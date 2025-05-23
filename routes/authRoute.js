import express from 'express';
import {registerController,loginController} from '../controllers/authController.js';

// router object : for routing in separate file
const router = express.Router();


// routing

// REGISTER || METHOD : POST
router.post('/register', registerController);

// LOGIN || METHOD : POST
router.post('/login', loginController);



export default router;