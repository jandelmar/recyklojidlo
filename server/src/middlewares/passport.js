const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const { Strategy, ExtractJwt } = require('passport-jwt')
const { User } = require('../models')
const secrets = require('../../config/secrets')

const localLogin = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username })

    if (!user) {
      return done(null, false, { message: 'Incorrect username' })
    }
    if (!user.passwordMatches(password)) {
      return done(null, false, { message: 'Incorrect password' })
    }
    return done(null, user)
  } catch (err) {
    return done(err)
  }
})

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('x-access-token'),
  secretOrKey: secrets.jwtSecret,
}

const jwtLogin = new Strategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.sub)
    return done(null, user || false)
  } catch (err) {
    return done(err, false)
  }
})

passport.use(jwtLogin)
passport.use(localLogin)

module.exports = {
  requireSignIn: passport.authenticate('local', { session: false }),
  requireAuth: passport.authenticate('jwt', { session: false }),
}
