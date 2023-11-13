const authenticateToken = require('../middleware/check')
const taskController = require('../services/taskController')
const router = require('express').Router()

router.get('/todos', authenticateToken, taskController.getAllTask)
router.get('/todos/:todoId', authenticateToken, taskController.getDetailTask)
router.post('/todos', authenticateToken, taskController.postTask)
router.patch('/todos/:todoId', authenticateToken, taskController.updateTask)
router.delete('/todos/:todoId', authenticateToken, taskController.deleteTask)

module.exports = router