
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
				var xu;
				var dx;
			  firebase.database().ref("classes/" + x + "/teacher").once("value").then(function(nmd){
			  	
			  	firebase.database().ref("users/" + nmd.val() + "/username").once("value").then(function(xd){
			  		xu = xd.val();
			  	});
			  	
			  });
			  firebase.database().ref("classes/" + x + "/description").once("value").then(function(desc){
					dx = desc.val()
				
			});
			addTo(xu, dx, "NIkolay");
			});
			
			
		});
		
		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;
		

	} else window.location.replace("index.html");

});
var addTo = function(title, description, teacher){
console.log(title + " " + description + " " + teacher);
}