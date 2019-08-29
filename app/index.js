import document from "document";
import * as messaging from "messaging";
import clock from "clock";
import { preferences } from "user-settings";

let clockDisplay = preferences.clockDisplay;
let background = document.getElementById("background");
let colorSelection = 'tomato';
let birthDateSelection = '1991-01-01';
let birthTimeSelection = '00:00:00';
let dayArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

clock.granularity = "seconds";
clock.ontick = (evt) => {
   let mins = evt.date.getMinutes();
   if (mins < 10) {
     mins = '0' + mins;
   }
   let year = evt.date.getYear() + 1900;
   let month = evt.date.getMonth() + 1;
   if (month < 10) {
     month = '0' + month;
   }
   let date = evt.date.getDate();
   if (date < 10) {
     date = '0' + date;
   }
   let hours = evt.date.getHours();
   if (clockDisplay == "12h" && hours > 12) hours-=12;
   if (clockDisplay == "12h" && hours == 0) hours = 12;
   if (hours < 10) {
     hours = '0' + hours;
   }
   document.getElementById("time").text = hours + ":" + mins;
   document.getElementById("day").text = dayArray[evt.date.getDay()];
   document.getElementById("date").text = year + "-" + month + "-" + date;
};

// Message is received
messaging.peerSocket.onmessage = evt => {
  console.log(`App received: ${JSON.stringify(evt)}`);
  if (evt.data.key === "color" && evt.data.newValue) {
    colorSelection = JSON.parse(evt.data.newValue);
    console.log(`New color: ${colorSelection}`);
    // background.style.fill = colorSelection;
  } else if (evt.data.key === "birthDate" && evt.data.newValue) {
    birthDateSelection = (JSON.parse(evt.data.newValue)).name;
    console.log(`New date: ${birthDateSelection}`);
  }
  // else if (evt.data.key === "birthTime" && evt.data.newValue) {
  //   birthTimeSelection = (JSON.parse(evt.data.newValue)).name;
  //   console.log(`New time: ${birthTimeSelection}`);
  // }
  if(isNaN(new Date(birthDateSelection+'T00:00:00').getTime())) {
    birthDateSelection = '1990-01-01';
    birthTimeSelection = '00:00:00';
  }
};

// Message socket opens
messaging.peerSocket.onopen = () => {
  console.log("App Socket Open");
};

// Message socket closes
messaging.peerSocket.onclose = () => {
  console.log("App Socket Closed");
};

function setText() {  
  var diff = new Date().getTime() - new Date(birthDateSelection+'T'+birthTimeSelection).getTime();
  console.log(birthDateSelection+'T'+birthTimeSelection);
  console.log(new Date(birthDateSelection+'T'+birthTimeSelection));
  var days = Math.floor(diff / (3600*24*1000));
  console.log(days);
  document.getElementById("days").text = days;
}

setText();
setInterval(setText, 3000);