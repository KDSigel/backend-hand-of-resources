const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/bikes', require('./controllers/bikes'));
app.use('/api/v1/art', require('./controllers/artworks'));
app.use('/api/v1/spirits', require('./controllers/spirits'));
app.use('/api/v1/myths', require('./controllers/myths'));
// app.use('/api/v1/smells', require('./controllers/smells'));
// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
