import express from 'express';
import { addSales, deleteSales, getAllSales, updateSales } from '../controllers/salesController.js';


const router=express.Router();


router.route('/addsales').post(addSales);
router.route('/').get(getAllSales);
router.route('/:id').delete(deleteSales);
router.route('/:id').put(updateSales);


export default router;