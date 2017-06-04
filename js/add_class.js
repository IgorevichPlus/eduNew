    document.getElementById("submitButton").addEventListener("click", function(){
      createClass(firebase.auth().currentUser.uid, document.getElementById("title").value, document.getElementById("description").value);
    
      window.location.assign("classes.html");      
    });
    
    function createClass(userId, title, description) {
      window.newClassesKey = 0;
        var classkey = firebase.database().ref('classes/');
        classkey.on('value', function(snapshot) {
            window.newClassesKey = snapshot.val().length
        });
        console.log(window.newClassesKey);
        firebase.database().ref('classes/' + newClassesKey).set({
        teacher: firebase.auth().currentUser.uid,
        title: title,
        description: description
      });
      
    }
     