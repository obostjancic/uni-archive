const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('api router');
});

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/protected', authController.protectedRoute);

module.exports = router;
