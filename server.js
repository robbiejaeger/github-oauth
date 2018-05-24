const express = require('express');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

app.set('port', process.env.PORT || 3000);
app.use(express.static('public'));
app.use(bodyParser.json());


app.get('/login', (request, response) => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  // redirect URI, using the defualt callback URL in app registration
  const scope = 'repo';
  const state = process.env.GITHUB_STATE;

  response.json({clientID, scope, state}).status(200);
});

app.get('/callback', (request, response) => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = request.query.code;
  const state = request.query.state;

  if (state === process.env.GITHUB_STATE) {
    getUserToken(response, clientID, clientSecret, code);
  } else {
    return response.redirect('/');
  }
});

const getUserToken = (response, clientID, clientSecret, code) => {
  fetch(`https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      return response.redirect('/'); // create a session here?
    })
    .catch(err => console.log(err));
};

app.listen(app.get('port'), () => {
  console.log('Practice OAuth server for GitHub running.');
});