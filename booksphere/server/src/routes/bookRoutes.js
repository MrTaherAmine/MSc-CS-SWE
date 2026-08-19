import { Router } from 'express';
import {
  getBookDetails,
  rateBook,
  searchBooks
} from '../controllers/bookController.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/search', searchBooks);
router.get('/:bookId', optionalAuth, getBookDetails);
router.put('/:bookId/rating', requireAuth, rateBook);

export default router;
