// app.js
const express = require('express');
const app = express();
const port = 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files
app.use(express.static('public'));

// Use the router
const mainRouter = require('./routes/index');
app.use('/', mainRouter);

// Middleware example
app.use((req, res, next) => {
  console.log(`Request received at ${new Date()}`);
  next();
});

// Define a route
app.get('/', (req, res) => {
  res.render('index', { username: 'YourUsername', message: 'Hello, this is your web server!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
