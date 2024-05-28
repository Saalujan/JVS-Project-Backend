import express from 'express';
import { addSales } from '../controllers/salesController.js';


const router=express.Router();


router.route('/addsales').post(addSales);


export default router;