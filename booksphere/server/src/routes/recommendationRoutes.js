import { Router } from 'express';
import { createRecommendation, listRecommendations } from '../controllers/recommendationController.js';
const router = Router();
router.get('/', listRecommendations);
router.post('/', createRecommendation);
export default router;
