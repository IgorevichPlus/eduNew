firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

		firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/username").once("value").then(function(ds) {
			document.getElementById("signout").innerHTML += " " + ds.val();
			document.getElementById("user_name").innerHTML += " " + ds.val();
		});
		
		firebase.database().ref("classes/").once("value").then(function(dc) {
			dc.val().forEach(function(x){
			  console.log(x);
			});
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
		
		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;
		

	} else window.location.replace("index.html");

}); 