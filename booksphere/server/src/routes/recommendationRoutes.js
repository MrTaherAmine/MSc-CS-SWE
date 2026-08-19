import { Router } from 'express';
import {
  createRecommendation,
  listRecommendations
} from '../controllers/recommendationController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', listRecommendations);
router.post('/', requireAuth, createRecommendation);

export default router;
