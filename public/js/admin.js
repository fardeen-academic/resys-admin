var db = firebase.firestore();
var uid;
var user = firebase.auth().currentUser;


var s = document.getElementById("students");
var a = document.getElementById("addstudent");
var c = document.getElementById("construction");
var pagetitle = document.getElementById("pagetitle")
s.style.display = "block";
c.style.display = "none";
a.style.display = "none";
    

function students(){
    s.style.display = "block";
    c.style.display = "none";
    a.style.display = "none";
    document.getElementById("pagetitle").innerHTML = "Students";
 
}
function addstudent(){
    s.style.display = "none";
    a.style.display = "block";
    document.getElementById("pagetitle").innerHTML = "Add Student";

}

var header = document.getElementById("menu");
var btns = header.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
  var current = document.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}


firebase.auth().onAuthStateChanged(function(user){
    if(user){
        uid = user.uid;
        db.collection('admin').doc(user.uid).get()
        .then(doc=>{
        var name = doc.data().Name;
        document.getElementById("name").innerHTML = name;
        })
    }
});


var docRef = db.collection("student").doc(uid).get()

function logout(){
    console.log("logout");
    firebase.auth().signOut().then(() => {
        window.location = '/?logout=true';
        console.log("Logged out");
      }).catch((error) => {
        console.log("Error logging out");
      });
}


const studentlist = document.querySelector('#studentlist');

//Create Element and render student list

function renderstudent(doc){
    let li= document.createElement('li');
    let name = document.createElement('span');
    let studentid = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().Name;
    studentid.textContent = doc.data().studentID;
    
    li.appendChild(name);
    li.appendChild(studentid);

    studentlist.appendChild(li);    
}
/*
db.collection('student').get().then((snapshot)=>{
    snapshot.docs.forEach(doc=>{
        renderstudent(doc);
    })
})
*/

db.collection('student').get().then((onSnapshot)=>{
    onSnapshot.docs.forEach(doc=>{
        renderstudent(doc);
    })
})


const registerform = document.querySelector('#registerstudent');
registerform.addEventListener('submit',(e)=>{
    e.preventDefault();
    const semail = registerform['semail'].value;
    const spass = registerform['spass'].value;
    const sname = registerform['sname'].value;
    const sid = registerform['sid'].value;
    firebase.auth().createUserWithEmailAndPassword(semail,spass)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // ...
        console.log(user.uid);
        registerform.reset();
        db.collection('student').doc(user.uid).set({
            Name: sname,
            studentID : sid,
        })
        window.alert("Student Added Successfully");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error "+errorCode+": "+errorMessage)
        registerform.reset();
        // ..
      });
    
    
})

var preloader = document.getElementById('preloader');
            var name = document.getElementById('name');
            function interval(){
                setInterval(loaderfunc, 0000);
            }
            function loaderfunc(){
                preloader.style.display='none'
            }
            var logoutmodal = document.getElementById('logoutmodal');
            function logout_modal(){
                if(logoutmodal.style.display=='none'){
                    logoutmodal.style.display='block';
                }
                else{
                    logoutmodal.style.display='none';
                }
                
            }
