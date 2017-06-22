
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


		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/classes" +"/registered").once("value").then(function(dc) {

			firebase.database().ref("classes/" + dc.val() + "/title").once("value").then(function(dt){
				document.getElementById("class-title").innerHTML += " " + dt.val();

			});

			firebase.database().ref("classes/" + dc.val() + "/teacher").once("value").then(function(dts){
				firebase.database().ref("users/" + toFirebaseFormat(dts.val()) + "/username").once("value").then(function(dn) {
					document.getElementById("class-teacher").innerHTML += " " + dn.val();
				});

			});

			firebase.database().ref("classes/" + dc.val() + "/description").once("value").then(function(dd){
				document.getElementById("class-description").innerHTML += " " + dd.val();

			});
		});

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/classes" +"/registered").once("value").then(function(rg) {
			rg.val().forEach(function(x){
				var users;
				var dess;
				var title;
				//goes through the databse of classes and teachers, then calls the print function
				firebase.database().ref("classes/" + x + "/teacher").once("value").then(function(nmd){
					firebase.database().ref("users/" + toFirebaseFormat(nmd.val() ) + "/username").once("value").then(function(udd){
							users = udd.val();
						firebase.database().ref("classes/" + x + "/description").once("value").then(function(dd){
								dess = dd.val();
								firebase.database().ref("classes/" + x + "/title").once("value").then(function(tt){
										title = tt.val();
										printClass(title, dess, users);
								});
							});
						});
					});
				});
		});

		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;


	} else window.location.replace("index.html");

});

//function that prints
var printClass = function(title, description, teacher){
	document.getElementById("classlist").innerHTML += title;
	document.getElementById("classlist").innerHTML += "<div class=\"col s12 m7 blue white-text\">";
	document.getElementById("classlist").innerHTML += "<h2 class=\"header blue white-text\">" + title + "</h2>";
	document.getElementById("classlist").innerHTML += "<div class=\"card horizontal \">";
	document.getElementById("classlist").innerHTML += "<div class=\"card-stacked\">";
	document.getElementById("classlist").innerHTML += "<div class=\"card-content \">";
	document.getElementById("classlist").innerHTML += "<p>" + description + "</p>";
	document.getElementById("classlist").innerHTML += "</div>";
	document.getElementById("classlist").innerHTML += "<div class=\"card-action\">";
	document.getElementById("classlist").innerHTML += "<a href=\"#\">This is a link</a>";
	document.getElementById("classlist").innerHTML += "</div>";
	document.getElementById("classlist").innerHTML += "</div>";
	document.getElementById("classlist").innerHTML += "</div>";
	document.getElementById("classlist").innerHTML += "</div>";



}
