const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/',require('./routes/index.route'))
const port = 3000 | process.env.PORT

app.listen(port)