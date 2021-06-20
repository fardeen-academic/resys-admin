var db = firebase.firestore();
var uid;
var user = firebase.auth().currentUser;


var s = document.getElementById("students");
var a = document.getElementById("addstudent");
var c = document.getElementById("construction");
var pagetitle = document.getElementById("pagetitle")
var regapprove_modal = document.getElementById("regapprove_modal");
s.style.display = "block";
c.style.display = "none";
a.style.display = "none";
regapprove_modal.style.display="none";    

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

    li.setAttribute('id', doc.id);
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


function renderpending(doc){
    let li= document.createElement('li');
    let studentid = document.createElement('span');

    li.setAttribute('id', doc.id);
    li.setAttribute('onclick', 'regapprovemodal(doc.id);');
    li.onclick = function() {regapprovemodal(doc.id);};
    db.collection('student').doc(doc.id).get()
        .then(doc=>{
        studentid.textContent = doc.data().studentID;
        })
    li.appendChild(studentid);
    pendinglist.appendChild(li);    
}

db.collection('pending').get().then((onSnapshot)=>{
    onSnapshot.docs.forEach(doc=>{
        renderpending(doc);
    })
})
var csi115 = "Computer and Programming Concept"
var csi116 = "Computer and Programming Concept Sessional"
var eee193 = "Electronics"
var math135 = "Discrete Math"
var phy217 = "Physics"
var csi123 = "Structured Programming Language"
var engl100 = "English Fundamentals"
var csi124 = "Structured Programming Language Sessional"	
var eee195 = "Electronics"	
var eee196 = "Electronics Sessional"	
var engl101 = "Composition"
var math113 = "Differential & Integral Calculus"
var cse133 = "Digital Logic Design"
var cse134 = "Digital Logic Design Sessional"
var csi221 = "Data Structure"
var csi222 = "Data Structure Sessional"
var engl102 = "Public Speaking"
var soc113 = "Bangladesh Studies"
var acct227 = "Accounting"
var cse213 = "Digital Electronics & Pulse Technique"
var cse214 = "Digital Electronics & Pulse Technique Sessional"
var math225 = "Coordinate Geometry & Vector Calculus"
var cse233 = "Computer Organization & Architecture"
var cse234 = "Computer Organization & Architecture Sessional"
var csi231 = "Algorithms"
var csi232 = "Algorithms Sessional"
var econ319 = "Economics"
var math237 = "Matrix & Differential Equation"
var csi223 = "Database Management System"
var csi315 = "Theory of Computing"
var cse335 = "Data Communication"
var csi421 = "Artificial Intelligence & Expert Systems"
var engl137 = "Technical Writing And Communication"
var cse415 = "Computer Networks"
var csi233 = "Advanced Programming"
var csi323 = "System Analysis & Design"
var math319 = "Fourier Analysis & Laplace Transformation"
var math337 = "Mathematical Analysis for Computer Science"
var csi313 = "Operating System"
var csi314 = "Operating System Sessional"
var csi331 = "Software Engineering"
var csi332 = "Software Engineering Sessional"
var csi483 = "Machine Learning"
var math327 = "Numerical Methods"
var cse327 = "Microprocessor and Interfacing"


function regapprovemodal(id){
    regapprove_modal.style.display='block';
    let a_button= document.createElement('button');
    a_button.setAttribute('class','ra raa');
    a_button.innerHTML = "Approve";
    a_button.setAttribute('onclick', 'regapprove(id);');
    a_button.onclick = function() {regapprove(id);};
    document.getElementById('ra').appendChild(a_button);
    db.collection('student').doc(id).get()
        .then(doc=>{
            document.getElementById("studentID").innerHTML = doc.data().studentID;
            document.getElementById("studentname").innerHTML = doc.data().Name;
        })
        db.collection('pending').doc(id).get()
        .then(doc=>{
            document.getElementById("semester").innerHTML = doc.data().semester;
            document.getElementById("subc1").innerHTML = sub_code(doc.data().sub_code1);
            document.getElementById("sub1").innerHTML ="\t"+eval(doc.data().sub_code1);
            document.getElementById("subc2").innerHTML = sub_code(doc.data().sub_code2);
            document.getElementById("sub2").innerHTML ="\t"+ eval(doc.data().sub_code2);
            document.getElementById("subc3").innerHTML = sub_code(doc.data().sub_code3);
            document.getElementById("sub3").innerHTML ="\t"+ eval(doc.data().sub_code3);
            document.getElementById("subc4").innerHTML = sub_code(doc.data().sub_code4);
            document.getElementById("sub4").innerHTML = "\t"+eval(doc.data().sub_code4);
            document.getElementById("subc5").innerHTML = sub_code(doc.data().sub_code5);
            document.getElementById("sub5").innerHTML = "\t"+eval(doc.data().sub_code5);
            
        })
}
function sub_code(sub_code){
    var scode = [sub_code.slice(0, -3), " ", sub_code.slice(-3)].join('').toUpperCase();
    return scode;
  }
var sem,c1,c2,c3,c4,c5;
var foo={};
    
function regapprove(id){
    db.collection('pending').doc(id).get()
        .then(doc=>{
            sem = doc.data().semester;
            c1 = doc.data().sub_code1;
            c2 = doc.data().sub_code2;
            c3 = doc.data().sub_code3;
            c4 = doc.data().sub_code4;
            c5 = doc.data().sub_code5;
            if(c1!=''){
                foo['s1']=c1;
                foo['r1']=0;
            };
            if(c2!=''){
                foo['s2']=c2;
                foo['r2']=0;
            };
            if(c3!=''){
                foo['s3']=c3;
                foo['r3']=0;
            };
            if(c4!=''){
                foo['s4']=c4;
                foo['r4']=0;
            };
            if(c5!=''){
                foo['s5']=c5;
                foo['r5']=0;
            };
            
            db.collection('student').doc(id).collection('result').doc(sem).set(foo)
            .catch((error)=>{
                console.log(error);
                window.alert(error);
            })
            deletepending(id);
            window.alert('Registration Approved!');
            document.getElementById('regapprove_modal').style.display='none';
        })
        setInterval(2000);
        

}

function deletepending(id){
    db.collection("pending").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
}