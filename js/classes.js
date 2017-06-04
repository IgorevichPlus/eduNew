firebase.auth().onAuthStateChanged(function(user) {
	if (user) {

		firebase.database().ref("users/" + firebase.auth().currentUser.uid + "/username").once("value").then(function(ds) {
			document.getElementById("signout").innerHTML += " " + ds.val();
			document.getElementById("user_name").innerHTML += " " + ds.val();
		});
		
		firebase.database().ref("classes/").once("value").then(function(dc) {
		  div = document.getElementById("all_classes");
		  var window.columns = 0;
		  var window.row = 0;
		  console.log(dc.val())
			dc.val().forEach(function(x){
			  if(columns = 0){
			    div.innerHTML += '\
			    <div class="row" id ="row'+ window.row +'">\
			      <div class="col s2">\
			        <div class="card pink">\
			          <div class="card-content white-text">\
			            <span class="card-title>' + x.title +'</span>\
			          </div>\
			        </div>\
			      </div> \
			    '
			  } else {
			    
			  }
			  
			  if(columns <7){
			   columns++;
			  } else {
			    row++;
			    columns = 0;
			  }
			});
		});
		
		document.getElementById("user_email").innerHTML += " " + firebase.auth().currentUser.email;
		

	} else window.location.replace("index.html");

}); 