const express = require('express')
const app = express()
const response = require('../middlewares/response')
const { read, create, update, del, delPermanent } = require('../models/userModel')
const { celebrate } = require("celebrate")
const { userCreateSchema, userUpdateSchema, changePasswordSchema, userIdSchema } = require('../middlewares/schema')
const { verifyJwt } = require('../middlewares/security')

app.get('/users', verifyJwt, (req, res) => {
  try {
    let param = { table: 'tb_m_users', select: '*' }
    let condition = req.query
    let join = []
    read(res, param, condition, join)
  } catch (error) {
    response.error(res, error)
  }
})

app.post('/users', [verifyJwt, celebrate({body: userCreateSchema})], (req, res) => {
  try {
    let data = req.body
    create(req, res, data)
  } catch (error) {
    response.error(res, error)
  }
})

app.put('/users', [verifyJwt, celebrate({body: userUpdateSchema})], (req, res) => {
  try {
    let data = req.body
    update(req, res, data, data.user_id)
  } catch (error) {
    response.error(res, error)
  }
})

app.put('/users/password', [verifyJwt, celebrate({body: changePasswordSchema})], (req, res) => {
  try {
    let data = req.body
    update(req, res, data, data.user_id)
  } catch (error) {
    response.error(res, error)
  }
})

app.put('/users/delete', [verifyJwt, celebrate({body: userIdSchema})], (req, res) => {
  try {
    let data = req.body
    del(req, res, data.user_id)
  } catch (error) {
    response.error(res, error)
  }
})

app.delete('/users', [verifyJwt, celebrate({body: userIdSchema})], (req, res) => {
  try {
    let data = req.body
    delPermanent(res, data.user_id)
  } catch (error) {
    response.error(res, error)
  }
})

module.exports = app