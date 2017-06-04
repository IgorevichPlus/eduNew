var check = false;
firebase.auth().onAuthStateChanged(function(user) {
	if(check)writeUserData(firebase.auth().currentUser.uid, document.getElementById("reg_name").value, document.getElementById("reg_email").value, document.getElementById("reg_ts").value);
	if (user) window.location.replace("dashboard.html");
	
});
// $(document).ready(function() {
// 	$("#username").on('keyup', function(e) {
// 		if (e.keyCode == 13) {
// 			document.getElementById('password').focus();
// 		}
// 	});
// 	$("#password").on('keyup', function(e) {
// 		if (e.keyCode == 13) {
// 			logIn();
// 		}
// 	});
// });
document.addEventListener('DOMContentLoaded', function() {
	// console.log("test");
	let username = document.getElementById("username"), password = document.getElementById("password");
	username.onkeyup = function(e) {
		e = e || window.event;
		if (e.keyCode == 13) password.focus();
	}
	password.onkeyup = function(e) {
		e = e || window.event;
		if (e.keyCode == 13) logIn();
	}
})

var register = function() {
	
	let username = document.getElementById("reg_email"), password = document.getElementById("reg_pass");
	firebase.auth().createUserWithEmailAndPassword(username.value, password.value)
	 .catch(function (err) {
	   // Handle errors
	 });
	 check = true;

	 
	
}

var logIn = function() {
	// alert("f");
	let username = document.getElementById("username"), password = document.getElementById("password");
	// alert(username.val);
	firebase.auth().signInWithEmailAndPassword(username.value, password.value).catch(function(error) {
		let errCode = error.code;
		let errMsg = error.message;
		let content;
		switch(errCode) {
			case 'auth/invalid-email':
				content = 'The username is not a valid email.';
				break;
			case 'auth/user-disabled':
				content = 'Your account is disabled.';
				break;
			case 'auth/user-not-found':
				content = 'This user does not exist.';
				break;
			case 'auth/wrong-password':
				content = 'This password is incorrect.';
				break;
			default:
				content = errMsg;
				break;
		}
		document.getElementById("error").innerHTML = content;
	});
	
}

function writeUserData(userId, name, email, ts) {
  firebase.database().ref('users/' + userId).set({
    username: name,
    email: email,
    status: ts
  });
  console.log("sucess");
}