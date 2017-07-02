
var data, notificationInited = false;
var g_gender;
var g_birthdate;
var g_joined;
var g_phonenumber;
var g_status;
var g_username;

if (("Notification" in window) && Notification.permission != 'granted') {
	Notification.requestPermission();
}
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/username").once("value").then(function(ds) {
			document.getElementById("signout").innerHTML += " " + ds.val();
			document.getElementById("user_name").innerHTML += " " + ds.val();
      document.getElementById("profile_username").placeholder = " " + ds.val();
		});

    firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/gender").once("value").then(function(gender) {
      document.getElementById("profile_gender").placeholder = " " + gender.val();
			g_gender = gender.val();
    });

    firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/birthdate").once("value").then(function(birthdate) {
      document.getElementById("profile_dBirth").placeholder = " " + birthdate.val();
			g_birthdate = birthdate.val();
    });

    firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/dateJoined").once("value").then(function(joined) {
      document.getElementById("profile_dJoined").placeholder = " " + joined.val();
			g_joined = joined.val();
    });

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/phonenumber").once("value").then(function(phonenumber) {
			document.getElementById("profile_pNumber").placeholder = phonenumber.val();
			g_phonenumber = phonenumber.val();
		});

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/status").once("value").then(function(status) {
			g_status = status.val();

		});;

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/username").once("value").then(function(username) {
			g_username = username.val();
		});


		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;
    document.getElementById("profile_email").placeholder = " " + firebase.auth().currentUser.email;

		//addClass tab added if teacher

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/status").once("value").then(function(status) {

			//teacher button function start
			console.log(status.val());
			if (status.val() == "teacher"){
				console.log("hi");
				document.getElementById("addClass").innerHTML += "<a class = \"white-text\" href=\"#!\">" + "Add a Class"  + "</a>"
			}
		});;


		//end of addClass





	} else window.location.replace("index.html");

});

function pushInfo() {
	var dJoined;
	var dBirth;
	var gender;
	var pNumber;
	var email;
	var status = g_status;
	var username = g_username;
	if(document.getElementById("profile_dJoined").value != ""){
		dJoined = document.getElementById("profile_dJoined").value;
		console.log("changed");

	}else {
		dJoined = g_joined;
	}
	if(document.getElementById("profile_dBirth").value != ""){
		dBirth = document.getElementById("profile_dBirth").value;

	}else {
		dBirth = g_birthdate;
	}

	if(document.getElementById("profile_pNumber").value != ""){
		pNumber = document.getElementById("profile_pNumber").value;

	}else {
		pNumber = g_phonenumber;
	}
	if(document.getElementById("profile_gender").value != ""){
		gender = document.getElementById("profile_gender").value;

	}else {
		gender = g_gender;
	}

	console.log(document.getElementById("profile_gender").value);
	console.log(dJoined + " " + dBirth + " " + gender + " " + pNumber);
	writeUserData(firebase.auth().currentUser.uid, dJoined, dBirth, gender, pNumber, username, status);
}


function writeUserData(userId, dJoined, dBirth, gender, pNumber, username, status) {
	console.log(userId + " " + dJoined + " " + dBirth + " " + gender + " " + pNumber);
  firebase.database().ref('users/' + userId).set({
    dateJoined: dJoined,
    phonenumber: pNumber,
		gender: gender,
		birthdate: dBirth,
		username: username,
		status: status
  });
  console.log("sucess");
}
