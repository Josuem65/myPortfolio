const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());

listeningPort = 3000;
app.listen(listeningPort, () => {
  console.log('Server started on port ' + listeningPort);
});