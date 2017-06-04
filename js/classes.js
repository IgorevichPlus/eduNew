// getting data from firebase
window.classesList = {1:{title:"imgay", description:"i'mstraight;"}};
var classesData = firebase.database().ref('classes/');
classesData.on('value', function(snapshot) {
    window.classesList = snapshot.val();
    console.log(snapshot.val());
});

var div = document.getElementById('enterdata');

 console.log(JSON.stringify(classes, null, 2));
classes.forEach(function(element){
  div.innerHTML = div.innerHTML + JSON.stringify(element, null, 2);
});

