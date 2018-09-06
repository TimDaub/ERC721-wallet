const express = require('express')
const session = require('express-session')
const MetaAuth = require('meta-auth')
const bodyParser = require('body-parser')

const users = require('./users')

const app = express()
const metaAuth = new MetaAuth({
  banner: 'Cinemarket, sign to login'
})

app.use(express.static('dist'))
app.use(bodyParser.json());
app.use(session({ secret: 'example', resave: false, saveUninitialized: true, }))

// Authentication and Authorization Middleware
let auth = function(req, res, next) {
  if (req.session && req.session.success && req.session.account) {
    return next()
  } else {
    return res.sendStatus(403)
  }
}

app.get('/', auth, (req, res) => {
  res.send(req.session)
})
app.get('/auth/:MetaAddress', metaAuth, users.sendChallenge)
app.get('/auth/:MetaMessage/:MetaSignature', metaAuth, users.checkSignature)
app.post('/users', users.signUp)
app.get('/logout', users.logout)


app.listen(8080, () => console.log('Listening on port 8080!'))
