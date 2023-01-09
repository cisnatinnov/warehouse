const response = require('../middlewares/response')
const query = require('../middlewares/query')
const { genBcript, validateEmail, validPassword } = require('../middlewares/security')
const { dt } = require('../middlewares/dateFormat')
const { PostgreSQL } = require('../configs/connection')
const uuid = require("uuid").v4

const read = (res, param, condition, join) => {
  try {
    let page = 1, limit = 100
    if(condition.page) {
      page = condition.page
      delete condition.page
    }
    if(condition.limit) {
      limit = condition.limit
      delete condition.limit
    }
    let objParam = Object.assign(param, { limit: limit, page: page })
    let sql = query.select(objParam, condition, join)
    PostgreSQL.query(sql, (error, result) => {
      let all = query.select(param, condition, join)
      PostgreSQL.query(all, (errAll, resultAll) => {
        if (errAll) response.error(res, error)
        else {
          let obj = {
            total: resultAll.rowCount,
            total_page: Math.ceil(resultAll.rowCount/limit),
            data: result.rows
          }
          response.success(res, `User data found ${result.rowCount}`, obj)
        }
      })
    })
  } catch (error) {
    response.error(res, error)
  }
}

const create = (req, res, data) => {
  try {
    if (!validateEmail(data.email)) {
      response.notAllowed(res, `Email ${data.email} is not valid`)
      return
    }
    if (!validPassword(data.password)) {
      response.notAllowed(res, 'Please use minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number and 1 special character!')
      return
    }
    if (data.confirmPassword) delete data.confirmPassword
    let password = genBcript(data.password)
    let selectEmail = {
      table: 'tb_m_users',
      select: 'email'
    },
    conditionEmail = {
      email: data.email
    },
    joinEmail = [],
    queryEmail = query.select(selectEmail, conditionEmail, joinEmail)
    PostgreSQL.query(queryEmail, (errEMail, resultEmail) => {
      if (errEMail) response.error(res, errEMail)
      else {
        if (resultEmail.rowCount > 0) response.notAllowed(res, `Email ${data.email} already registered`)
        else {
          let selectUsername = {
            table: 'tb_m_users',
            select: 'username'
          },
          conditionUsername = {
            username: data.username
          },
          joinUsername = [],
          queryUsername = query.select(selectUsername, conditionUsername, joinUsername)
          PostgreSQL.query(queryUsername, (errUsername, resultUsername) => {
            if (errUsername) response.error(res, errUsername)
            else {
              if (resultUsername.rowCount > 0) response.notAllowed(res, `Username ${data.username} already registered`)
              else {
                let insert = [], objData = Object.assign(data, { user_id: uuid(), password: password,created_dt: dt(), created_by: req.session.user_id })
                insert.push(objData)
                let queryInsert = query.insert('tb_m_users', insert)
                PostgreSQL.query(queryInsert, (errInsert, resultInsert) => {
                  if (errInsert) return response.error(res, errInsert)
                  response.success(res, 'User successfuly inserted', resultInsert.rows)
                })
              }
            }
          })
        }
      }
    })
  } catch (error) {
    response.error(res, error)
  }
}

const update = (req, res, data, id) => {
  try {
    if (!validateEmail(data.email)) return response.notAllowed(res, `${email} is not valid`)
    if (data.confirmPassword) {
      if (!validPassword(data.password)) {
        response.notAllowed(res, 'Please use minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number and 1 special character!')
        return
      }
      let password = genBcript(data.password)
      delete data.password
      delete data.confirmPassword
      data.password = password
    }
    let objData = Object.assign(data, {updated_dt: dt(), updated_by: req.session.user_id})
    let condition = { user_id: id }
    let update = query.update('tb_m_users', objData, condition)
    PostgreSQL.query(update, (err, rows) => {
      if (err) return response.error(res, err)
      response.success(res, 'User successfully updated', rows.rows)
    })
  } catch (error) {
    response.error(res, error)
  }
}

const del = (req, res, id) => {
  try {
    let objData = {status: 0, updated_dt: dt(), updated_by: req.session.user_id}
    let condition = { user_id: id }
    let update = query.update('tb_m_users', objData, condition)
    PostgreSQL.query(update, (err, rows) => {
      if (err) return response.error(res, err)
      response.success(res, 'User successfully deleted', rows.rows)
    })
  } catch (error) {
    response.error(res, error)
  }
}

const delPermanent = (res, id) => {
  try {
    let condition = { user_id: id }
    let del = query.del('tb_m_users', condition)
    PostgreSQL.query(del, (err, rows) => {
      if (err) return response.error(res, err)
      response.success(res, 'User successfully deleted', rows.rows)
    })
  } catch (error) {
    response.error(res, error)
  }
}

module.exports = {
  read,
  create,
  update,
  del,
  delPermanent
}