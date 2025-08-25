const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller')

router.post('/register', AuthController.inscription);
router.post('/login', AuthController.connexion);

module.exports = router;