const express = require('express')

const { requireAuth } = require('../middlewares/passport')
const userController = require('../controllers/user.controller')

const router = express.Router();

router.get('/all', requireAuth, userController.getAll)
router.get('/refreshToken', requireAuth, userController.refreshToken)
router.get('/testToken', requireAuth, userController.test)
router.get('/:id', requireAuth, userController.getOne)
router.patch('/:id', requireAuth, userController.update)
router.delete('/:id', requireAuth, userController.delete)
router.post('/register', userController.create)
router.post('/login', userController.login)


module.exports = router
