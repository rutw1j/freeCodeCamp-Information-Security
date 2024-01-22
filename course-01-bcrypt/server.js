"use strict";
const express = require("express");
const bodyParser = require("body-parser");

/* 12 Understanding BCrypt Hashes */
const bcrypt = require("bcrypt");
/* 12 Understanding BCrypt Hashes */

const fccTesting = require("./freeCodeCamp/fcctesting.js");
const app = express();
fccTesting(app);
const saltRounds = 12;
const myPlaintextPassword = "sUperpassw0rd!";
const someOtherPlaintextPassword = "pass123";


/* 13 Hash and Compare Passwords Asynchronously */
//START_ASYNC -do not remove notes, place code between correct pair of notes.
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  console.log(hash);
  bcrypt.compare(myPlaintextPassword, hash, (err, res) => {
    console.log(res);
  });
});
//END_ASYNC
/* 13 Hash and Compare Passwords Asynchronously */


/* 14 Hash and Compare Passwords Synchronously */
//START_SYNC
var hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log(hash);

var result = bcrypt.compareSync(myPlaintextPassword, hash);
console.log(result);
//END_SYNC
/* 14 Hash and Compare Passwords Synchronously */


app.listen(process.env.PORT || 3000, () => {});