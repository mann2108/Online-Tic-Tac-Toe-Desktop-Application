var firebaseConfig = {
  apiKey: "AIzaSyDHA9ysxFtoUId4YDofrHDa1JvBHcF6boE",
  authDomain: "tic-tac-toe-6eeaf.firebaseapp.com",
  databaseURL: "https://tic-tac-toe-6eeaf.firebaseio.com",
  projectId: "tic-tac-toe-6eeaf",
  storageBucket: "tic-tac-toe-6eeaf.appspot.com",
  messagingSenderId: "144342691802",
  appId: "1:144342691802:web:940d64ea3dd5600d0f1ae3"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
var roomId = "none";
var user = "none";
var opponent = "none";
var myChoice = "none";
var button1 = "Q";
var button2 = "Q";
var button3 = "Q";
var button4 = "Q";
var button5 = "Q";
var button6 = "Q";
var button7 = "Q";
var button8 = "Q";
var button9 = "Q";

function roomCreated() {
  var user1 = document.getElementById("user1").value;
  var user2 = document.getElementById("user2").value;

  var roomIdTemp = firebase
    .database()
    .ref("rooms")
    .push().key;

  firebase
    .database()
    .ref("/rooms/" + roomIdTemp)
    .set({
      resetButton: { value: 0 },
      login: "false",
      user1: user1,
      user2: user2,
      lastButton: "null",
      button1: "Q",
      button2: "Q",
      button3: "Q",
      button4: "Q",
      button5: "Q",
      button6: "Q",
      button7: "Q",
      button8: "Q",
      button9: "Q",
      lastSign: "O"
    })
    .then(function() {
      document.getElementById("note").innerHTML =
        "INVITATION CODE (ONLY ONE TIME LOGIN) : " + roomIdTemp;
      user = user1;
      opponent = user2;
      roomId = roomIdTemp;
      myChoice = "O";
      document.getElementById("page1").style.display = "none";
      document.getElementById("page2").style.display = "none";
      document.getElementById("page3").style.display = "none";
      document.getElementById("page4").style.display = "block";
      document.getElementById("backButton").style.display = "block";
    })
    .catch(function(error) {
      document.getElementById("page1").style.display = "block";
      document.getElementById("page2").style.display = "none";
      document.getElementById("page3").style.display = "none";
      document.getElementById("page4").style.display = "none";
      document.getElementById("backButton").style.display = "none";
    });

  return false;
}

function roomJoined() {
  var inviteCode = document.getElementById("inviteCode").value;
  var inviteCodeRef = firebase.database().ref("rooms/" + inviteCode);
  inviteCodeRef.on("value", function(snapshot) {
    if (snapshot.exists() && snapshot.val().login == "false") {
      document.getElementById("note2").innerHTML = "";
      roomId = inviteCodeRef.key;
      user = snapshot.val().user2;
      opponent = snapshot.val().user1;
      myChoice = "X";
      firebase
        .database()
        .ref("rooms/" + roomId)
        .update({ login: "true" });
      document.getElementById("note").innerHTML = "Invited Code : " + roomId;
      document.getElementById("page1").style.display = "none";
      document.getElementById("page2").style.display = "none";
      document.getElementById("page3").style.display = "none";
      document.getElementById("page4").style.display = "block";
      document.getElementById("backButton").style.display = "block";
    } else {
      document.getElementById("note2").innerHTML =
        "INVITATION CODE IS INVALID or EXPIRED !!";
    }
  });

  return false;
}
function checkwin() {
  if (button1 == button2 && button2 == button3 && button1 != "Q") {
    makeDisable();
    if (button1 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
  if (button1 == button4 && button4 == button7 && button1 != "Q") {
    makeDisable();
    if (button1 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
  if (button1 == button5 && button5 == button9 && button1 != "Q") {
    makeDisable();
    if (button1 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
  if (button2 == button5 && button5 == button8 && button2 != "Q") {
    makeDisable();
    if (button2 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
  if (button3 == button6 && button6 == button9 && button3 != "Q") {
    makeDisable();
    if (button3 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
  if (button3 == button5 && button5 == button7 && button3 != "Q") {
    makeDisable();
    if (button3 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
  if (button4 == button5 && button5 == button6 && button4 != "Q") {
    makeDisable();
    if (button4 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
  if (button7 == button8 && button8 == button9 && button7 != "Q") {
    makeDisable();
    if (button7 == myChoice) {
      document.getElementById("note").innerHTML = "YOU WIN";
    } else {
      document.getElementById("note").innerHTML = "YOU LOSE";
    }
  }
}
function onClickButton1() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button1", button1: myChoice, lastSign: myChoice });
}
function onClickButton2() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button2", button2: myChoice, lastSign: myChoice });
}
function onClickButton3() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button3", button3: myChoice, lastSign: myChoice });
}
function onClickButton4() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button4", button4: myChoice, lastSign: myChoice });
}
function onClickButton5() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button5", button5: myChoice, lastSign: myChoice });
}
function onClickButton6() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button6", button6: myChoice, lastSign: myChoice });
}
function onClickButton7() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button7", button7: myChoice, lastSign: myChoice });
}
function onClickButton8() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button8", button8: myChoice, lastSign: myChoice });
}
function onClickButton9() {
  checkwin();
  firebase
    .database()
    .ref("rooms/" + roomId)
    .update({ lastButton: "button9", button9: myChoice, lastSign: myChoice });
}

function makeDisable() {
  document.getElementById("button9").disabled = true;
  document.getElementById("button8").disabled = true;
  document.getElementById("button7").disabled = true;
  document.getElementById("button6").disabled = true;
  document.getElementById("button5").disabled = true;
  document.getElementById("button4").disabled = true;
  document.getElementById("button3").disabled = true;
  document.getElementById("button2").disabled = true;
  document.getElementById("button1").disabled = true;
}
function makeEnable() {
  if (button1 == "Q") {
    document.getElementById("button1").disabled = false;
  }
  if (button2 == "Q") {
    document.getElementById("button2").disabled = false;
  }
  if (button3 == "Q") {
    document.getElementById("button3").disabled = false;
  }
  if (button4 == "Q") {
    document.getElementById("button4").disabled = false;
  }
  if (button5 == "Q") {
    document.getElementById("button5").disabled = false;
  }
  if (button6 == "Q") {
    document.getElementById("button6").disabled = false;
  }
  if (button7 == "Q") {
    document.getElementById("button7").disabled = false;
  }
  if (button8 == "Q") {
    document.getElementById("button8").disabled = false;
  }
  if (button9 == "Q") {
    document.getElementById("button9").disabled = false;
  }
}

firebase
  .database()
  .ref("rooms")
  .on("child_changed", function(snapshot) {
    var temp = snapshot.val().lastButton;

    if (temp == "null") {
    } else {
      if (temp == "button1") {
        button1 = snapshot.val().lastSign;
      }
      if (temp == "button2") {
        button2 = snapshot.val().lastSign;
      }
      if (temp == "button3") {
        button3 = snapshot.val().lastSign;
      }
      if (temp == "button4") {
        button4 = snapshot.val().lastSign;
      }
      if (temp == "button5") {
        button5 = snapshot.val().lastSign;
      }
      if (temp == "button6") {
        button6 = snapshot.val().lastSign;
      }
      if (temp == "button7") {
        button7 = snapshot.val().lastSign;
      }
      if (temp == "button8") {
        button8 = snapshot.val().lastSign;
      }
      if (temp == "button9") {
        button9 = snapshot.val().lastSign;
      }
    }
    setInnerHTMLOfButtons();
    if (snapshot.val().lastSign == myChoice) {
      checkwin();
      makeDisable();
    } else {
      checkwin();
      makeEnable();
    }
  });

function setInnerHTMLOfButtons() {
  document.getElementById("button1").innerHTML = button1;
  document.getElementById("button2").innerHTML = button2;
  document.getElementById("button3").innerHTML = button3;
  document.getElementById("button4").innerHTML = button4;
  document.getElementById("button5").innerHTML = button5;
  document.getElementById("button6").innerHTML = button6;
  document.getElementById("button7").innerHTML = button7;
  document.getElementById("button8").innerHTML = button8;
  document.getElementById("button9").innerHTML = button9;
}
firebase
  .database()
  .ref("rooms/" + roomId + "/resetButton")
  .on("value", function(snapshot) {
    console.log("hiiRESETCLICK");
  });
function reset() {
  firebase
    .database()
    .ref("rooms/" + roomId + "/resetButton")
    .update({ value: Math.random() });
}
// button1 = "Q";
// button2 = "Q";
// button3 = "Q";
// button4 = "Q";
// button5 = "Q";
// button6 = "Q";
// button7 = "Q";
// button8 = "Q";
// button9 = "Q";
// firebase
//   .database()
//   .ref("rooms/" + roomId)
//   .update({
//     button1: "Q",
//     button2: "Q",
//     button3: "Q",
//     button4: "Q",
//     button5: "Q",
//     button6: "Q",
//     button7: "Q",
//     button8: "Q",
//     button9: "Q"
//   })
//   .then(function() {
//     console.log("RESET");
//   })
//   .catch(function(error) {
//     console.log("NOT RESET - " + error);
//   });
// setInnerHTMLOfButtons();
// firebase
//   .database()
//   .ref("rooms/" + roomId)
//   .on("value", function(snapshot) {
//     if (snapshot.val().user1 == user) {
//       makeEnable();
//     } else {
//       makeDisable();
//     }
//   });
//}
