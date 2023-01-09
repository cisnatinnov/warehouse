const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const response = require('./response')
require('dotenv').config();

const genBcript = (password) => {
  try {
    let pass = bcrypt.hashSync(password, 8)
    return pass
  } catch (error) {
    console.log(error)
    return false
  }
}

const compare = (pass, password) => {
  try {
    let result = bcrypt.compareSync(password, pass);
    return result;
  } catch (error) {
    console.log(error)
    return false
  }
}

const genJwt = (payload) => {
  try {
    let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 86400 });
    return token
  } catch (error) {
    console.log(error)
    return false
  }
}

const verifyJwt = (req, res, next) => {
  try {
    let authorization = req.headers["authorization"];

    if (!authorization) {
      return response.notAllowed(res, 'No token provide')
    }
    let token = authorization.split(" ")[1];
    if (!token) return response.notAllowed(res, 'No token provide');
    let secret = process.env.JWT_SECRET;
    let decoded = jwt.verify(token, secret);
    req.session = decoded
    next()
  } catch (error) {
    return response.error(res, error)
  }
}

const validateEmail = (email) => {
  let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return res.test(email);
}

const validPassword = (password) => {
  let res = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return res.test(password);
}

module.exports = {
  genBcript,
  compare,
  genJwt,
  verifyJwt,
  validateEmail,
  validPassword
}