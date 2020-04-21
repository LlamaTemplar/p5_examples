//https://bottle-test-75a52.firebaseio.com/
'use strict'

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db

function setup() {
  //createCanvas(400, 400);
  noCanvas();

  // Web app's Firebase configuration
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
}

function draw() {
  background(220);
}