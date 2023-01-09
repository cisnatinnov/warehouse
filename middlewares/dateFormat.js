const moment = require('moment')

const day = (date) => {
  return moment(date).format('dddd')
},
dt = (date) => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = {
  day,
  dt
}