const router = require('express').Router();
const ctrl = require('../controllers/mediaController');
const upload = require('../middleware/upload');
const { authenticate, authorize } = require('../middleware/auth');

router.get('/', authenticate, ctrl.list);
router.post('/', authenticate, authorize('admin', 'editor', 'author'), upload.single('file'), ctrl.upload);

module.exports = router;
