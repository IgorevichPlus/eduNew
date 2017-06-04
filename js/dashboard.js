
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
			  firebase.database().ref("classes/" + x + "/teacher").once("value").then(function(nmd){
			  	
			  	firebase.database().ref("users/" + nmd.val() + "/username").once("value").then(function(xd){
			  		console.log(xd.val());
			  	});
			  	
			  });
			  firebase.database().ref("classes/" + x + "/description").once("value").then(function(desc){
				console.log(desc.val());
				
			});
			});
			
			
		});
		
		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;
		

	} else window.location.replace("index.html");

});
var addTo = function(){
$('#class-list').prepend("<div class=\"row\">\
				<div class = \"card\">\
				<div class = \"card-image blue\"\
				<span class = \"card-title\"> Request from " + realName + "Headed to " + request.to + "</span>\
				<a class= \"btn-floating halfway-fab waves-effect waves-light blue lighten-2\"><i class=\"small material-icons\">done</i></a>\
				<div class = \"card-content\"\
				<div class = \"card-content\">\
				<p>" + request.reason + "</p>\
				</div>\
				<br>\
				<button class = \"btn blue\" accept=true>Accept</button>\
				<button class = \"btn blue\" accept=false>Reject</button>\
				</div>\
				</div>")
}