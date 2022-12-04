const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

//port needed for api application to work
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//listening to port
db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT} at http://localhost:${PORT} !`);
    });
  });