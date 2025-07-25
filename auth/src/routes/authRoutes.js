const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');


router.get('/login',authController.login);
router.post('/sign-up',authController.signUp);
router.get('/',authController.home);

module.exports = router;