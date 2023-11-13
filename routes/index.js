const router = require('express').Router() 
const todos = require('./routesTask')
const users = require('./routesUser')

router.get('/', (req, res) => {
    res.json({
        message: 'Selamat Datang Di ToDo Apps'
    })
})

router.use(todos)
router.use(users)


module.exports = router