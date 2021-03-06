const express = require('express')
var PORT = process.env.PORT || 6534

const { db } = require('./db')
const taskRoute = require('./routes/task')

const app = express()

app.use('/', express.static(__dirname + '/public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/tasks', taskRoute)

db.sync()
  .then(() => {
    app.listen(PORT)
  })
  .catch((err) => {
    console.error(err)
  })