const { Router } = require ('express');
const router = Router();
const usersController = require('../controllers/usersController');

// Loga usuario e retorna token jwt
router.post('/login', usersController.login);

module.exports = router;