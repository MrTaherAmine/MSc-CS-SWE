const router = require('express').Router();
const ctrl = require('../controllers/postController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', authenticate, authorize('admin', 'editor', 'author'), ctrl.create);
router.put('/:id', authenticate, authorize('admin', 'editor', 'author'), ctrl.update);
router.delete('/:id', authenticate, authorize('admin', 'editor'), ctrl.remove);

module.exports = router;
