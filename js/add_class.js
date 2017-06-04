    document.getElementById("submitButton").addEventListener("click", function(){
      createClass(firebase.auth().currentUser.uid, document.getElementById("title").value, document.getElementById("description").value);
    });
    window.key = null;
    function createClass(userId, title, description) {

       firebase.database().ref("classes/").once("value").then(function(dc) {
         window.key = dc.val();
         console.log(window.key);
          firebase.database().ref('classes/' + window.key.length).set({
            teacher: firebase.auth().currentUser.uid,
            title: title,
            description: description
          }); 
		    });
      window.location.assign("classes.html");
    }
     