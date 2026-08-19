import { Router } from 'express';
import { searchBooks } from '../controllers/bookController.js';

const router = Router();

router.get('/search', searchBooks);

export default router;
