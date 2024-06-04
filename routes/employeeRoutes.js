import express from 'express';
import { authEmployee, deleteEmployee, getAllEmployees, getEmployeeProfile, logoutEmployee, registerEmployee, updateEmployeeProfile } from '../controllers/employeeController.js';




const router=express.Router();


router.route('/register').post(registerEmployee);
router.route('/auth').post(authEmployee);
router.route('/home').post(logoutEmployee);
router.route('/').get(getAllEmployees);
router.route('/:id').get(getEmployeeProfile).put(updateEmployeeProfile);
router.route('/:id').delete(deleteEmployee)

export default router;