const router = require('express').Router();
const { body } = require('express-validator');
const { login, me } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  login
);
router.get('/me', authenticate, me);

module.exports = router;
