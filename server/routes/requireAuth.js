// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { signUp, login, logout } = require('../controllers/userController');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout)

module.exports = router;
