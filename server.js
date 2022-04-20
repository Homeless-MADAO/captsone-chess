const express = require("express");
const redirectToHTTPS = require("express-http-to-https").redirectToHTTPS;
const http = require("http");
const app = express();
const fetch = require("node-fetch");

// Redirect HTTP to HTTPS,
app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (request, response) => {
  response.sendFile(__dirname + "/public/index.html");
});

// needed to prevent CORS errors
app.use((req, res, next) => {
  console.log("CORS Error Check");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// Followed glitch instructions to send json back and forth between server and client
// I don't know what body parser is, but my server cannot interpret fetch POST without it.
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Using your secure key example, I send my firebase configuration to client end
// after retriving it from .env from server
app.get("/getConfig", fetchConfig);

function fetchConfig(req, response) {
  // Get my firebase apiKey and app ID
  var config = {
    apiKey: process.env.FIREBASE_KEY,
    authDomain: "dason-chess.firebaseapp.com",
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.APP_ID,
    storageBucket: process.env.APP_ID + ".appspot.com",
    appId: process.env.FIREBASE_ID
  };
  response.json(config);
}

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
