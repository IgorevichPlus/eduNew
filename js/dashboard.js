
var data, notificationInited = false;


if (("Notification" in window) && Notification.permission != 'granted') {
	Notification.requestPermission();
}
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

		//instance variable printer
		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/username").once("value").then(function(ds) {
			document.getElementById("signout").innerHTML += " " + ds.val();
			document.getElementById("user_name").innerHTML += " " + ds.val();
		});

		//addClass tab added if teacher

		firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/status").once("value").then(function(status) {

			//teacher button function start
			console.log(status.val());
			if (status.val() == "teacher"){
				console.log("hi");
				document.getElementById("addClass").innerHTML += "<a class = \"white-text\" href=\"add_class.html\">" + "Add a Class"  + "</a>"
			}
		});;


		//end of addClass


		//class printing function

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

		writedatatest();
		//end of class printing function

		//teachers

		firebase.database().ref("users/").once("value").then(function(uc){
			k = uc.val();
			console.log(uc.val());
			for(let key in k){
				if(k[key].status == "teacher"){
					printTeacher(k[key].username, k[key].email);
				}

			}
		});

		//end of teachers printing function



		//All classes

		firebase.database().ref("classes/").once("value").then(function(nm){
			nm.val().forEach(function(x){
				firebase.database().ref("classes/" + x).once("value").then(function(nn){
					console.log(nn.val());
				});
			});
		});

		//end of all classes









		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;


	} else window.location.replace("index.html");

});

//function that prints the classes
var printClass = function(title, description, teacher){
	document.getElementById("classlist").innerHTML += title;
	document.getElementById("classlist").innerHTML += teacher;
	document.getElementById("classlist").innerHTML += description;

}
//function that prints the teachers
var printTeacher = function(Name, Email){
	document.getElementById("teacherlist").innerHTML += Name;
	document.getElementById("teacherlist").innerHTML += Email;

}
//prints all of the classes
var printAllClasses = function(title, description, teacher){
	document.getElementById("classlist").innerHTML += title;
	document.getElementById("classlist").innerHTML += teacher;
	document.getElementById("classlist").innerHTML += description;


}

var writedatatest = function(){
	firebase.database().ref('classes/').push({
    username: "name",
    email: "email"
  	});
		console.log("sucess");
}
