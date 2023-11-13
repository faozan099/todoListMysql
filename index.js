const express = require('express')
const app = express()
const routes = require('./routes/index')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3306
const cors = require('cors')
require("dotenv").config();


app.use(bodyParser.urlencoded( { extended: true } ))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)
app.listen(port, () => {
    console.log(`app connected on localhost:${port}`)
})