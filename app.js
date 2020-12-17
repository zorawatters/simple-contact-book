//using nodemon in dev so I don't have to restart server 
//using pre ES6 imports but trying to use ES5 principles like arrow functions and const/let
const express = require('express');
const mongoose = require('mongoose');
// firebase = require('firebase');
const passport = require('passport');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoPass = require('m_connect.js');
require('./controllers/passportStrategies');

const app = express();
const PORT = process.env.PORT || 3000; 
//fetching routes
const regRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const abRoute = require('./routes/addressbook');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use('/register', regRoute);
app.use('/login', loginRoute);
app.use('/addressbook', abRoute);

//connect to mongodb atlas
//not worried about password rn
mongoose.connect(mongoPass.connect,
    { useNewUrlParser: true, useUnifiedTopology: true });
//set database variable
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'failed to connect to mongodb:'));
db.once('open', () => {
  console.log('connected to mongodb')
});

//firebase - not relevant
// const firebaseConfig = {
//     apiKey: "",
//     authDomain: "",
//     databaseURL: "",
//     projectId: "",
//     storageBucket: "",
//     messagingSenderId: "",
//     appId: "",
//     measurementId: ""
//   };

// firebase.initializeApp(firebaseConfig);
// //connect to realtime db
// const fb = firebase.database();
// //and create contact listener for it
// const contacts = fb.ref('contacts');
  


//middleware


//routes
app.get('/', (req, res) => {
    res.send(`<h1>hello world</h1>`);
})

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT} baybee !!`)); //using arrow callback