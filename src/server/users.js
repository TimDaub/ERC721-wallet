const nano = require('nano')('http://localhost:5984');

function signUp(req, res) {
  const cm = nano.db.use('cinemarket');
  cm.insert(req.body, req.session.account)
    .then(body => {
      console.log(body)
    })
}

function sendChallenge(req, res) {
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge)
  }
}

function checkSignature(req, res) {
  if (req.metaAuth && req.metaAuth.recovered) {
    req.session.success = true
    req.session.account = req.metaAuth.recovered
    res.send(req.metaAuth.recovered)
  } else {
    res.status(400).send()
  }
}

function logout(req, res) {
  delete req.session.success
  res.send(200)
}

module.exports = {
  signUp,
  sendChallenge,
  checkSignature,
  logout
}
