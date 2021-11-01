const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const oceAuthSchema = require('../../models/oce.models')
const keys = require('../config/keys')

// JWT

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = keys.secretOrKey
module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      oceAuthSchema
        .findById(jwt_payload.id)
        .then(() => {
          if (oceRegisterRouter) {
            return done(null, oceRegisterRouter)
          }
          return done(null, false)
        })
        .catch((err) => console.log(err))
    })
  )
}
