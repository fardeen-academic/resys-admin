var db = firebase.firestore();
var uid;
var role = "student";
var user = firebase.auth().currentUser;
firebase.auth().onAuthStateChanged(function(user){
    if(user){
        var uid = user.uid;
        console.log("UID = "+uid);
        window.location = 'admin.html';
    };
});

function login(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("Logging in");
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error: "+errorMessage);
        console.log("Error");
    });
}