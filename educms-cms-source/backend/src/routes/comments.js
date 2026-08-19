const router = require('express').Router();
const ctrl = require('../controllers/commentController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, authorize('admin', 'editor'), ctrl.list);
router.post('/', authenticate, ctrl.create);
router.patch('/:id/status', authenticate, authorize('admin', 'editor'), ctrl.setStatus);

module.exports = router;
