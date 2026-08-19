const router = require('express').Router();
const { tags } = require('../controllers/taxonomyController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', tags.list);
router.post('/', authenticate, authorize('admin', 'editor'), tags.create);
router.delete('/:id', authenticate, authorize('admin'), tags.remove);

module.exports = router;
