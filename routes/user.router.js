const express = require('express')
const router = express.Router()

const { login, register } = require('../controller/user.controller')

router.get('/', (req, res) => {
  res.send('Hello World! this is user router')
})

router.post('/register', register)

router.post('/login', login)

module.exports = router
