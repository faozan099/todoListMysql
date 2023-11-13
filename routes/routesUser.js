const authenticateToken = require('../middleware/check')
const { register, login, getAllUsers, getdetailUsers } = require('../services/userController')
const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
router.get('/users', authenticateToken, getAllUsers)
router.get('/users/:userId', authenticateToken, getdetailUsers)

module.exports = router