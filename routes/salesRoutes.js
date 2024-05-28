import express from 'express';
import { addSales, getAllSales } from '../controllers/salesController.js';


const router=express.Router();


router.route('/addsales').post(addSales);
router.route('/').get(getAllSales);


export default router;