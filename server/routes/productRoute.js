import express from 'express';
import { createProduct } from '../controllers/productController.js';
import { getProducts } from '../controllers/productController.js';
import { isAuthenticatedUser } from '../utils/isAuthenticated.js';

const router = express.Router();

router.post('/uploadProduct', isAuthenticatedUser, createProduct);
router.get('/getProducts', getProducts);

export default router;
