const express = require('express')
const app = express()
const response = require('../middlewares/response')

app.get('/', (req, res) => {
  response.success(res, 'Welcome to Restful API', {})
})

module.exports = app