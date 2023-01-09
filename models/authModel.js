const response = require('../middlewares/response')
const query = require('../middlewares/query')
const { genJwt, genBcript, compare, validateEmail, validPassword } = require('../middlewares/security')
const { PostgreSQL } = require('../configs/connection')

const ceckEmail = (res, email) => {
  try {
    if (validateEmail(email)) {
      let param = { select: 'tb_m_users', select: 'email' }
      let condition = { email: email }
      let join = []
      let user = query.select(param, condition, join)
      PostgreSQL.query(user, (err, results) => {
        if (err) {
          console.log(err)
          response.error(res, 'Internal server error')
        }
        else {
          if (results.rowCount > 0) {
            let email = results.rows[0].email
            response.success(res, 'Email registered', email)
          }
          else response.notFound(res, 'Email not found')
        }
      })
    }
    else response.notAllowed(res, `${email} is not valid`)
  } catch (error) {
    console.log(error)
    response.error(res, 'Internal server error')
  }
}

const checkPassword = (res, data) => {
  try {
    if (!validateEmail(data.email)) {
      response.notAllowed(res, `${data.email} is not valid`)
      return
    }
    if (!validPassword(data.password)) {
      response.notAllowed(res, 'Please use minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number and 1 special character!')
      return
    }
    let param = { table: 'tb_m_users', select: '*' }
    let condition = { email: data.email }
    let join = []
    let queryUser = query.select(param, condition, join)
    PostgreSQL.query(queryUser, (err, results) => {
      if (err) {
        console.log(err)
        response.error(res, 'Internal server error')
      }
      else {
        if (results.rowCount > 0) {
          let user = results.rows[0]
          let pass = compare(user.password, data.password)
          if (pass) {
            let token = genJwt(user)
            let jwt_payload = {}
            if (token) {
              jwt_payload = Object.assign(user, {token:token})
              response.success(res, 'Login successfully', jwt_payload)
            }
            else response.error(res, 'Error during generate token')
          }
          else response.notAllowed(res, 'Wrong Password')
        }
        else response.notFound(res, 'Email not found')
      }
    })
  } catch (error) {
    console.log(error)
    response.error(res, 'Internal server error')
  }
}

module.exports = {
  ceckEmail,
  checkPassword
}