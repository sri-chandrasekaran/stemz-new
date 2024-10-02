// api/index.js
const app = require('./server');

module.exports = (req, res) => {
  app(req, res); // Hand the request and response to the Express app
};