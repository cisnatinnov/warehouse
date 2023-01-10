const { Joi } = require('celebrate')

const emailSchema = Joi.object().keys({
  email: Joi.string().max(64).required()
}).unknown(true)

const passwordSchema = Joi.object().keys({
  email: Joi.string().max(64).required(),
  password: Joi.string().min(8).required()
}).unknown(true)

const createSchema = Joi.object().keys({
  email: Joi.string().max(64).required(),
  username: Joi.string().max(64).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required()
}).unknown(true)

const updateSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  email: Joi.string().max(64).required(),
  username: Joi.string().max(64).required()
}).unknown(true)

const changePasswordSchema = Joi.object().keys({
  user_id: Joi.string().required(),
  email: Joi.string().max(64).required(),
  password: Joi.string().min(8).required(),
  confirmPassword: Joi.string().min(8).required()
}).unknown(true)

const userIdSchema = Joi.object().keys({
  user_id: Joi.string().required()
}).unknown(true)

module.exports = {
  emailSchema,
  passwordSchema,
  createSchema,
  updateSchema,
  changePasswordSchema,
  userIdSchema
}