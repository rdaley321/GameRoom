// require in all the things!
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport')
const bodyParser = require('body-parser')

// requiring in router
const router = require('./router/routes')

// declaring express as app
const app = express();

// you need bodyParser in order to parse the body of requests for POST requests.
// cors() on the backend will allow you to avoid any CORS errors on the frontend.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
app.use(bodyParser.json())
app.use(cors())
router(app)

const server = http.createServer(app)
const port = 5000

// the string passed into mongoose.connect() can be changed to whatever you want your database name to be. If it doesn't exist, MongoDB automatically creates it for you.
console.log('Connecting to Local Database.');
mongoose.connect('mongodb://127.0.0.1:27017/GAMEROOM')

server.listen(port)
console.log(`NodeJS Server running on port ${port}.`);
