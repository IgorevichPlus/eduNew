
var data, notificationInited = false;
if (("Notification" in window) && Notification.permission != 'granted') {
	Notification.requestPermission();
}
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/username").once("value").then(function(ds) {
			document.getElementById("signout").innerHTML += " " + ds.val();
			document.getElementById("user_name").innerHTML += " " + ds.val();
		});
		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;
		
	} else window.location.replace("index.html");
});

writeUserData(firebase.auth().currentUser.uid, "Nikolay", firebase.auth().currentUser.email)

function writeUserData(userId, name, email) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email
  });
}