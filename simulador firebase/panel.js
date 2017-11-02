$(document).ready(function() {
    const db = firebase.database();
    const usuarios = db.ref('usuarios');
    const loginCard = $('#loginCard');
    const mainCard = $('#mainCard');
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const btnlogin = $("#btnlogin");
    const btnlogout = $("#btnlogout");
    
    btnlogin.click(function(){
        const email = emailInput.val();
        const pass = passwordInput.val();
        const promise = firebase.auth().signInWithEmailAndPassword(email,pass);
        promise.catch(function(e) {
            console.log(e);
        })
        console.log(email)
        
    });

    btnlogout.click(function(){
        firebase.auth().signOut();
    });



    firebase.auth().onAuthStateChanged(function(firebaseUser) {
        if(firebaseUser) {

            const userSpan = $(".userSpan");
          
            userSpan.html('Hola ' + firebaseUser.displayName )
            mainCard.css("display","block");
            loginCard.css("display","none");
            usuarios.on('value', gotUsers, errUsers);
            
        } else {
            mainCard.css("display","none");
            loginCard.css("display","block");
            
        }
    });
});

function gotUsers(data){
    const ul = $(".userList");
    console.log(data.val())

    $.each(data.val(), function(index, value) {
        ul.append("<li>"+data.val()[index].ci+"</li>");
      });
    
  }  
  function errUsers(err){
    console.log(err);
  }  
