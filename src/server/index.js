const express = require('express');
const MetaAuth = require('meta-auth');

const app = express();
const metaAuth = new MetaAuth();

app.use(express.static('dist'));

app.get('/', (req, res) => {
    res.send('hello')
})
app.get('/auth/:MetaAddress', metaAuth, (req, res) => {
  if (req.metaAuth && req.metaAuth.challenge) {
    res.send(req.metaAuth.challenge)
  }
});

app.get('/auth/:MetaMessage/:MetaSignature', metaAuth, (req, res) => {
  if (req.metaAuth && req.metaAuth.recovered) {
    res.send(req.metaAuth.recovered);
  } else {
    res.status(400).send();
  };
});


app.listen(8080, () => console.log('Listening on port 8080!'));
