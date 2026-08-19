const router = require('express').Router();
const { categories } = require('../controllers/taxonomyController');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', categories.list);
router.post('/', authenticate, authorize('admin', 'editor'), categories.create);
router.delete('/:id', authenticate, authorize('admin'), categories.remove);

module.exports = router;
