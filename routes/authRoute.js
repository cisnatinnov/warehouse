const express = require('express')
const app = express()
const response = require('../middlewares/response')
const { emailSchema, passwordSchema } = require('../middlewares/schema')
const { ceckEmail, checkPassword } = require('../models/authModel')
const { celebrate } = require("celebrate")

app.post('/checkEmail', celebrate({ body: emailSchema }), (req, res) => {
  try {
    let param = req.body;
    ceckEmail(res, param.email)
  } catch (error) {
    response.error(res, error)
  }
})

app.post('/checkPassword', celebrate({ body: passwordSchema }), (req, res) => {
  try {
    let param = req.body;
    checkPassword(res, param)
  } catch (error) {
    response.error(res, error)
  }
})

module.exports = app