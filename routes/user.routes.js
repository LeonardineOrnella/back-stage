const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateToken = require('../middlewares/auth.middleware')
router.get('/',authenticateToken, userController.getAllUsers);
router.get('/:id',authenticateToken, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id',authenticateToken, userController.updateUser);
router.delete('/:id',authenticateToken, userController.deleteUser);
router.get('/info/:email', userController.getUtilByEmail);

module.exports = router;
