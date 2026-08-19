import { Router } from 'express';
import {
  getProfile,
  toggleFollow,
  updateMyPreferences
} from '../controllers/profileController.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = Router();

router.patch('/me/preferences', requireAuth, updateMyPreferences);
router.get('/:userId/profile', optionalAuth, getProfile);
router.put('/:userId/follow', requireAuth, toggleFollow);

export default router;
