import express from 'express';

import { registerUser,authUser } from '../controllers/userController.js';


const router=express.Router();


router.route('/register').post(registerUser);
router.route('/auth').post(authUser);

export default router;