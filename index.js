const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Import uuid to generate unique IDs
const e = require('express');
require('dotenv').config()

//Simulate MongoDB with an array
let users = []

app.use(cors())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});


app.get('/api/users', (req, res) => {
  res.json(users.map(user => ({ _id: user._id, username: user.username })));
});

app.post('/api/users', (req, res) => {
  let user = {
    username: req.body.username,
    _id: uuidv4() 
  };
  users.push(user); 
  res.json(user);
});

app.get('/api/users/:_id/logs', (req, res) => {
  const _id = req.params._id;
  const usr = users.find(user => user._id === _id);
  if (!usr) {
    return res.json({ error: 'User not found.' });
  }
  const { from, to, limit } = req.query;
  let logs = usr.exercises ? usr.exercises : [];
  if (from) {
    logs = logs.filter(log => new Date(log.date) >= new Date(from));
  }
  if (to) {
    logs = logs.filter(log => new Date(log.date) <= new Date(to));
  }
  if (limit) {
    logs = logs.slice(0, limit);
  }
  res.json({
    _id,
    username: usr.username,
    count: logs.length,
    log: logs
  });
});


app.post('/api/users/:_id/exercises', (req, res) => {
  const { description, duration, date } = req.body;
  const _id = req.params._id;
  if (description === '' || duration === '') {
    return res.json({ error: 'Description and duration are required.' });
  }
  const usr = users.find(user => user._id === _id);
  let exercise = {
    date: date ? new Date(date).toDateString() : new Date().toDateString(),
    description,
    duration: parseInt(duration)
  };
  usr.exercises = usr.exercises ? [...usr.exercises, exercise] : [exercise];
  res.json({
    _id: usr._id,
    username: usr.username,
    ...exercise
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
