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

function createClass() {
	var class_title = document.getElementById("class_title").value;
	var class_description = document.getElementById("class_description").value;
	var class_teacher_uid = toFirebaseFormat(firebase.auth().currentUser.uid);
	var newRef = firebase.database().ref('classes/').push({
    classtitle: class_title,
    classdescription: class_description,
		teacher: class_teacher_uid
  	}).then(function(snapshot) {
    var key = snapshot.key; // null
    var childKey = snapshot.child("classes/").key; // "ada"
		assignClass(key, class_teacher_uid);

  });

}

function assignClass(key, teacher){
	console.log(key, teacher);
	firebase.database().ref("users/" + teacher + "/classes"  + key).push({});
	console.log("sucess");

}
