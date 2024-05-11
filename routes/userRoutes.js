import express from 'express';

import { registerUser,authUser,logoutUser,getAllUsers,getUserProfile } from '../controllers/userController.js';


const router=express.Router();


router.route('/register').post(registerUser);
router.route('/auth').post(authUser);
router.route('/home').post(logoutUser);
router.route('/allusers').get(getAllUsers);
router.route('/profile/:id').get(getUserProfile);

export default router;