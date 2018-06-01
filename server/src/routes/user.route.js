const express = require('express')

const userController = require('../controllers/user.controller')

const router = express.Router();

router.post('/register', userController.create)
router.get('/me', userController.check)
router.post('/login', userController.login)


module.exports = router
