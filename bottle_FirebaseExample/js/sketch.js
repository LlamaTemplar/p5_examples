//https://bottle-test-75a52.firebaseio.com/
'use strict'

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in db
let messageInput;
let sendMessageButton;
let receiveMessageButton;
let receivedMessage;
let respondButton;
let receivedDiv, sendDiv;

function setup() {
  //createCanvas(400, 400);
  noCanvas();

  // Access DOM elements
  messageInput = document.querySelector("#msgInput");
  sendMessageButton = document.querySelector("#sendMsgBtn");
  receiveMessageButton = document.querySelector("#receiveMsgBtn");
  receivedMessage = document.querySelector("#receivedMsg");
  receivedDiv = document.querySelector("#receivedDiv");
  respondButton = document.querySelector('#respondBtn');
  sendDiv = document.querySelector("#sendDiv");

  sendMessageButton.addEventListener('click', sendMessage);
  receiveMessageButton.addEventListener('click', receiveMessage);
  respondButton.addEventListener('click', respond);

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

function sendMessage()
{
  if(messageInput.value)
  { 
    let timestamp = Date.now();
    
    nodeData = {
      messageText: messageInput.value,
      timestamp: timestamp,
      received: false
    }
    
    createNode(folderName, timestamp, nodeData);

    createP(`Sent message: ${nodeData["messageText"]}`);

    messageInput.value = '';

    sendDiv.style.display = 'none';
    receivedDiv.style.display = 'block';
  }
    
}

function receiveMessage()
{

  shuffleArray(fbDataArray);

  // recieve all messages that haven't been recieved
  for(let i = 0; i < fbDataArray.length; i++)
  {
    if(fbDataArray[i].received === false)
    {      
      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {
        received: true
      });  

      receiveMessageButton.style.display = 'none';
      respondButton.style.display = 'block';

      break;
    } else {
      console.log("no more messages")
    }
    
  }
}

function respond()
{
  receivedDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}

function shuffleArray(array)
{
  // iterate backwards through an array
for (let i = array.length - 1; i > 0; i--) {

  // grab random index from 0 to i
  let randomIndex = Math.floor(Math.random() * (i + 1));

  // swap elements array[i] and array[j]
  [array[i], array[randomIndex]] = [array[randomIndex], array[i]]; // using "destructuring assignment" syntax

  // same can be written as:
  // let arrayItem = array[i]; // array item in original position array[i]
  // array[i] = array[randomIndex]; // overwrite array[i] with new item at random index
  // array[randomIndex] = arrayItem; // now move array item from original position into random position

}
}