const express = require('express');
const mongoose = require('mongoose');

//port needed for api application to work
const app = express();
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

//mongodb connection to the application
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-networkDB', {
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

//listening to port
app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);