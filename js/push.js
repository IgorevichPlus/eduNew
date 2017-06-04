		writeUserData(firebase.auth().currentUseer.uid, document.getElementById("reg_name").value, document.getElementById("reg_email").value);

		function writeUserData(userId, name, email) {
		  firebase.database().ref('users/' + userId).set({
		    username: name,
		    email: email
		  });
		}