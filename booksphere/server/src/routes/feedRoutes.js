import { Router } from 'express';
import { personalizedFeed } from '../controllers/feedController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, personalizedFeed);

export default router;
