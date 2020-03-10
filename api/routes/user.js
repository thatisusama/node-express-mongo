const express = require('express');
const User = require('../controllers/user');
const router = express.Router();

router.get('/me', User.me);

module.exports = router;