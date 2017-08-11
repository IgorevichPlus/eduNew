
var data, notificationInited = false;


if (("Notification" in window) && Notification.permission != 'granted') {
	Notification.requestPermission();
}
firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
    firebase.database().ref("users/" + toFirebaseFormat(firebase.auth().currentUser.uid) + "/classes").once("value").then(function(getUserClasses){
      C = getUserClasses.val();
      console.log(getUserClasses.val());
      for(let key in C){
        //test
        console.log(C[key]);

        //post-test
        firabase.database().ref("classes/" + C[key]).once("value").then(function(retrieveClassInfo1){
          var info1  = retrieveClassInfo1.val();

          firebase.database().ref("classes/" + C[key]).once("value").then(function(retrieveClassInfo2){
            var info2 = retrieveClassInfo2.val();

            firebase.database().ref("clases" +  C[key]).once("value").then(function(retrieveClassInfo3){
              var info3 = retrieveClassInfo3.val();

              firebase.database().ref("classes" + C[key]).once("value").then(function(retrieveClassInfo4){
                var info4 = retrieveClassInfo4.val();

                postingClassData(info1, info2, info3, info4);


              });
            });
          });
        });

      }
    });



	} else window.location.replace("index.html");

});

postingClassData(info1, info2, info3, info4){
  
}
