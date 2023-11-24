// routes/index.js
const express = require('express');
const router = express.Router();

// Define a route
router.get('/', (req, res) => {
  res.render('index', { message: 'Hello, this is your web server!'});
});

module.exports = router