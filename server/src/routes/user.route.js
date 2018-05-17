const express = require('express')

const userController = require('../controllers/user.controller')

const router = express.Router();
router.post('/', userController.create)


module.exports = router
