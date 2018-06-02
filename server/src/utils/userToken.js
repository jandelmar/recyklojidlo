const jwt = require('jsonwebtoken')
const secrets = require('../../config/secrets')
const { tokenExpire } = require('../../config')

const getTokenForUser = (user) => {
  return jwt.sign({ sub: user._id }, secrets.jwtSecret, {
    expiresIn: tokenExpire,
  })
}

module.exports = getTokenForUser
