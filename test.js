
var ref = new Firebase("https://newcomer-2bfb0.firebaseio.com/");
var db = firebase.database();
var dbref = db.ref("server/data")
var usersRef = dbref.child("Users");
usersRef.set({
  alanisawesome: {
    date_of_birth: "June 23, 1912",
    full_name: "Alan Turing"
  },
  gracehop: {
    date_of_birth: "December 9, 1906",
    full_name: "Grace Hopper"
  }
});
