import { Router } from 'express';
import {
  createRecommendation,
  listRecommendations
} from '../controllers/recommendationController.js';
import {
  createComment,
  listComments,
  recordShare,
  toggleLike
} from '../controllers/interactionController.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', optionalAuth, listRecommendations);
router.post('/', requireAuth, createRecommendation);
router.put('/:recommendationId/like', requireAuth, toggleLike);
router.get('/:recommendationId/comments', listComments);
router.post('/:recommendationId/comments', requireAuth, createComment);
router.post('/:recommendationId/share', requireAuth, recordShare);

export default router;
