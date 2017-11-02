$(document).ready(function() {
    const db = firebase.database();
    const usuarios = db.ref('usuarios');
    const loginCard = $('#loginCard');
    const mainCard = $('#mainCard');
    const emailInput = $("#email");
    const passwordInput = $("#password");
    const btnlogin = $("#btnlogin");
    const btnlogout = $("#btnlogout");
    const ul = $(".userList");

    btnlogin.click(function(){
        const email = emailInput.val();
        const pass = passwordInput.val();
        const promise = firebase.auth().signInWithEmailAndPassword(email,pass);
        promise.catch(function(e) {
            console.log(e);
        })
        
        
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

    function gotUsers(data){
    
    /*Panel.usuarios.push(data);*/
    
    ul.html("");

    $.each(data.val(), function(index, value) {
        
        ul.append(
            "<li key="+ index + ">"+
            "<span class='remove-user'>x</span>"+
            "<span class='detalle-usuario'><span class='bold'>Nombre: </span>"+
            data.val()[index].name +
            "</span>"+ 
            "<span class='detalle-usuario'><span class='bold'>Cédula: </span>" + 
            data.val()[index].ci+ 
            "</span>"+ 
            "<span class='detalle-usuario'><span class='bold'>Intentos fallidos: </span>"+
            data.val()[index].strikes +
            "</span></li>");

       
      });
     
  }  
  function errUsers(err){
    console.log(err);
  }  

  $('#btncreateuser').click(function(){
    const userName = $('#userNombre').val();
    const userCi = $('#userCedula').val();
    
    if (!userName || userCi.length != 8) {
        console.log("STH WRONG")
    } else {
        var userData = {
        name: userName,
        ci: userCi,
        strikes: 0
    }
    db.ref('usuarios').push(userData);
    }
    
  })

  ul.on("click", $(".remove-user"), function(event) {
    usuarios.child(event.target.parentNode.getAttribute("key")).remove();
   
    
  })
});


