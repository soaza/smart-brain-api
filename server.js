const express  = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'kimguan',
    password : '',
    database : 'smart-brain'
  }
});

app.use(express.json());
app.use(cors());

// app.get('/',(req, res) => {
// 	res.send(database.users);
// })

//signin
app.post('/signin', (req,res) => { signin.handleSignin(req,res,db,bcrypt)})

//register
app.post('/register', (req,res) => { register.handleRegister(req, res , db , bcrypt)})

//profile
app.get('/profile/:id', (req,res) => { profile.handleProfileGet(req,res,db)});

//image
app.put('/image/', (req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})

app.listen(process.env.PORT || 3000,() => {
	console.log(`app is running on port ${process.env.PORT}`)
})



// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/