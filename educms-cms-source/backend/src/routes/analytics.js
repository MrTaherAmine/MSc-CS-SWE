const router = require('express').Router();
const { summary } = require('../controllers/analyticsController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/summary', authenticate, authorize('admin', 'editor'), summary);

module.exports = router;
