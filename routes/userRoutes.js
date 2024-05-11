import express from 'express';

import { registerUser,authUser,logoutUser,getAllUsers,getUserProfile,updateUserProfile,deleteUser } from '../controllers/userController.js';


const router=express.Router();


router.route('/register').post(registerUser);
router.route('/auth').post(authUser);
router.route('/home').post(logoutUser);
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser)

export default router;