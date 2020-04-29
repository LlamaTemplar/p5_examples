"use strict";
// template for firebase

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = "chatMessages"; // name of folder you create in db
let input;
let sendBtn;

function setup() {

  noCanvas();

  input = select("#input");
  sendBtn = select("#sendBtn");

  sendBtn.mousePressed(sendMessage);

  // Initialize firebase
  // support for Firebase Realtime Database 4 web here: https://firebase.google.com/docs/database/web/start
  // Copy and paste your config here (replace object commented out)
  // ---> directions on finding config below

  let config = {
    apiKey: "AIzaSyBwosZuIsBOdctCPsI3MKEL5mVX2H6wvNw",
    authDomain: "bottle-test-75a52.firebaseapp.com",
    databaseURL: "https://bottle-test-75a52.firebaseio.com",
    projectId: "bottle-test-75a52",
    storageBucket: "bottle-test-75a52.appspot.com",
    messagingSenderId: "1062277668452",
    appId: "1:1062277668452:web:646365d35c1a01f5980971",
    measurementId: "G-K6EP78M5FE"
  };

  firebase.initializeApp(config);

  database = firebase.database();

  // this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  // **** folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);


  // ---> To find your config object:
  // They will provide it during Firebase setup
  // or (if your project already created)
  // 1. Go to main console page
  // 2. Click on project
  // 3. On project home page click on name of app under project name (in large font)
  // 4. Click the gear icon --> it's in there!
}

function draw() {

}

function sendMessage() 
{
  let timestamp = Date.now();
  let chataObject = {
    message: input.value(),
    timestamp: timestamp,
  }

  createNode(folderName, timestamp, chataObject);
}

function displayChat()
{
  let length = fbDataArray.length

  createP(fbDataArray[length-1].message);


  input.value('');
  /*
  for(let i = 0; i < length; i++)
  {
    createP(fbDataArray[i].message);
  }
  */
}
