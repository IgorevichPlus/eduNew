
var data, notificationInited = false;
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
    });

    firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/birthdate").once("value").then(function(birthdate) {
      document.getElementById("profile_dBirth").placeholder = " " + birthdate.val();
    });

    firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/dateJoined").once("value").then(function(joined) {
      document.getElementById("profile_dJoined").placeholder = " " + joined.val();
    });

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/phonenumber").once("value").then(function(phonenumber) {
			document.getElementById("profile_pNumber").placeholder = phonenumber.val();
		});


		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;
    document.getElementById("profile_email").placeholder = " " + firebase.auth().currentUser.email;





	} else window.location.replace("index.html");

});

function pushInfo() {
	var dJoined;
	var dBirth;
	var gender;
	var pNumber;
	var email;
	if(document.getElementById("profile_dJoined") != null){
		dJoined = document.getElementById("profile_dJoined");

	}else {
		firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/dateJoined").once("value").then(function(joined) {
      dJoined = joined.val();
    });
	}
	if(document.getElementById("profile_dBirth") != null){
		dBirth = document.getElementById("profile_dBirth");

	}else {
		firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/birthdate").once("value").then(function(birthdate) {
			dBirth = birthdate.val();
		});
	}

	if(document.getElementById("profile_pNumber") != null){
		pNumber = document.getElementById("profile_pNumber");

	}else {
		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/phonenumber").once("value").then(function(phonenumber) {
			pNumber =  phonenumber.val();
		});
	}
	if(document.getElementById("profile_gender") != null){
		gender = document.getElementById("profile_gender");

	}else {
		firebase.database().ref("users/"  + toFirebaseFormat(firebase.auth().currentUser.uid) + "/gender").once("value").then(function(gender) {
      gender = gender.val();
    });
	}
	writeUserData(firebase.auth().currentUser.uid, dJoined, dBirth, gender, pNumber);
}

function writeUserData(userId, dJoined, dBirth, gender, pNumber) {
  firebase.database().ref('users/' + userId).push({
    dateJoined: dJoined,
    phonenumber: pNumber,
		gender: gender,
		birthdate: dBirth
  });
  console.log("sucess");
}
