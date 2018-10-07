import * as functions from 'firebase-functions';
import * as express from 'express';
import * as proxy from 'http-proxy-middleware';
const cors = require('cors');

// https://us-central1-ng-pwa-lunch.cloudfunctions.net/api
// firebase functions:config:get > .runtimeconfig.json
// firebase functions:config:set ngpwalunch.key=""

const app = express();

app.use(cors({ origin: true }));
app.use('/maps', proxy({
  changeOrigin: true,
  target: 'https://maps.googleapis.com',
  pathRewrite: (path, req) => {
    return `${path}&key=${functions.config().ngpwalunch.key}`
  }
}));

app.get('/hi', (request, response) => {
  response.send('hello world!')
});

const api = functions.https.onRequest(app);

module.exports = { api };
