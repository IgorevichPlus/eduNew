// getting data from firebase
var classesData = firebase.database().ref('classes/');
var classes = {};
classesData.on('value', function(snapshot) {
    classes = snapshot.val();
});

var div = document.getElementById('enterdata');


classes.forEach(function(element){
  div.innerHTML = div.innerHTML + JSON.stringify(element, null, 2);
});

