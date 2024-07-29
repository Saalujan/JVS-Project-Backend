import express from 'express';
import { authEmployee, changeEmployeePassword, deleteEmployee, getAllEmployees, getEmployeeInfo, getEmployeeProfile, logoutEmployee, registerEmployee, updateEmployeeProfile } from '../controllers/employeeController.js';
import { protect } from '../middleware/authMiddleware.js';




const router=express.Router();


router.route('/register').post(registerEmployee);
router.route('/auth').post(authEmployee);
router.route('/logout').post(logoutEmployee);
router.route('/').get(getAllEmployees);
router.get("/currentemployee", protect, getEmployeeInfo);
router.put("/changepassword",protect,changeEmployeePassword);
router.route('/:id').get(getEmployeeProfile).put(updateEmployeeProfile);
router.route('/:id').delete(deleteEmployee)

export default router;