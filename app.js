// modules
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Rating = require('./routes/rating.router')
const User = require('./routes/user.router')
// initialization
const app = express()
const port = 5000

// middlewares
app.use(express.static('public'))
app.use(express.json())
app.use(
  cors({
    origin: '*',
  })
)
app.use('/rating', Rating)
app.use('/user', User)

// DB
mongoose
  .connect('mongodb://localhost/Course-Management')
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

//   routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// App listen
app.listen(port, function () {
  console.log(`Server listening on port ${port}`)
})
