const express = require('express')
const session = require('express-session')
const MetaAuth = require('meta-auth')

const app = express()
const metaAuth = new MetaAuth({
  banner: 'Cinemarket, sign to login'
})

app.use(express.static('dist'))
app.use(session({ secret: 'example', resave: false, saveUninitialized: true, }))

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
  if (req.session && req.session.success) {
    return next()
  } else {
    return res.sendStatus(403)
  }
}

app.get('/', auth, (req, res) => {
  res.send(req.session)
})
app.get('/auth/:MetaAddress', metaAuth, (req, res) => {
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge)
  }
})

app.get('/auth/:MetaMessage/:MetaSignature', metaAuth, (req, res) => {
  if (req.metaAuth && req.metaAuth.recovered) {
    req.session.success = true
    req.session.account = req.metaAuth.recovered
    res.send(req.metaAuth.recovered)
  } else {
    res.status(400).send()
  }
})

app.get('/logout', (req, res) => {
  delete req.session.success
  res.send(200)
})


app.listen(8080, () => console.log('Listening on port 8080!'))
