$(document).ready(function() {
  
 
  const db = firebase.database();
  const preguntas = db.ref('preguntas');
  const usuarios = db.ref('usuarios');

  function checkUser(input) {
    usuarios.orderByChild('ci').equalTo(input).once('value', gotUsers, errUsers);

  }

  
 


  function gotUsers(data){
    if (data.val()) {
      Test.user = {
        id: Object.keys(data.val())[0],
        name: data.val()[Object.keys(data.val())[0]].name, 
        ci: data.val()[Object.keys(data.val())[0]].ci,
        strikes: data.val()[Object.keys(data.val())[0]].strikes,
        attempts: data.val()[Object.keys(data.val())[0]].attempts
      }
      
      console.log(Test.user)
      $(".login-simulador-completo").css("display", "none");
      preguntas.once('value', gotData, errData);
      
 
    } else {
      $(".alerta").css("display", "block").html("Usuario no encontrado. Escribe tu cédula sin puntos ni guiones");
    }
    

  }  
  function errUsers(err){
    console.log(err);
  }  
  function gotData(data) {
    const sortedQuestions = data.val().preguntas.sort( function() { return 0.5 - Math.random() } ).slice(0,30);

    Test.preguntas = sortedQuestions;
    
    console.log(Test.preguntas)
    
    $.map( Test.preguntas, function( value, index ) {
      Test.correctas[index] = value.correctas;
    });
    $(".start").css("display", "block");

    
  }

  function errData(err) {
    console.log(err);
  }

  const testContainer = $(".test-pregunta");
  const testPregunta = $(".test-pregunta-pregunta");
  const testLista = $(".test-lista");
  const actual = $(".actual");
  const scoreCard = $(".scoreCard");

  const Test = {
    user: [],
    preguntas:[],
    correctas: [],
    respuestasUsuario: [],
    aciertos: 0,
    incorrectas:[],
    step: 0,
    reset: function() {
     Test.respuestasUsuario = [];
     Test.aciertos = 0;
     Test.incorrectas = [];
     Test.step = 0;
     testContainer.children().css( "display", "block" ); 
     Test.setQuestion(); 
     scoreCard.html(""); 
     
    },
    showScore: function(){
      var resultado =  (Test.aciertos >= 24 ) ? "<span class='green'> APROBADO</span>" : "<span class='crimson'> REPROBADO</span>";
      
      if (Test.aciertos < 24) {
        console.log(Test.user)
        db.ref('usuarios/' + Test.user[Object.keys(Test.user)[0]]).set({
          id: Test.user.id,
          ci: Test.user.ci,
          name: Test.user.name,
          attempts: Test.user.attempts +1,
         strikes: Test.user.strikes + 1
  });
      } else {
        console.log(Test.user)
        db.ref('usuarios/' + Test.user[Object.keys(Test.user)[0]]).set({
          id: Test.user.id,
          ci: Test.user.ci,
          name: Test.user.name,
          attempts: Test.user.attempts +1,
          strikes: Test.user.strikes
      }) }
      testContainer.children().css( "display", "none" );
      
      scoreCard.append("<h2 class='fadeInUp animated'>"+ Test.user.name.split(" ")[0] + " tu examen fue:"+resultado + "" +"</h2>" +"Correctas: "+ Test.aciertos + "/30")
        .append("<ul class='score'></ul>")
        $.each(Test.incorrectas, function(index, value) {
        scoreCard.children(".score").append(
          '<li>' +
            Test.incorrectas[index].pregunta + "<br /> "+ "Respuesta correcta: <span class='green'>" + Test.incorrectas[index].respuesta +
            "</span></li>");
      });
      scoreCard.append("<span class='boton'>Reintentar</span>");
          $('.boton').click(function(){
            Test.reset();
          });
   
    },
    setQuestion: function() {
      var pregunta = Test.preguntas[Test.step];
     
      if (Test.step >= 30) {
        Test.showScore();
      } else {
        
      testLista.html("");

      testPregunta.first().html(pregunta.pregunta);

      $.each(pregunta.respuestas, function(index, value) {
        testLista.append(
          '<li class="option ' +
            index +
            '">' +
            pregunta.respuestas[index] +
            "</li>"
        );
      });
      Test.step++;
      actual.html(Test.step);
    }}
  };
  $("#signInbtn").click(function() {
    const inputValue = $("#ci").val() 
      checkUser(inputValue);
    
  });
  $(".start").click(function() {
    $(".test-intro").addClass("fadeOutLeft animated");
    setTimeout(function() {
      $(".test-intro").addClass("hidden");
      testContainer.addClass("animated");
      Test.setQuestion();
    }, 550);
  });

  testLista.on("click", "li", function(event) {
    event.preventDefault();
    Test.respuestasUsuario.push(parseInt($(this).attr("class").slice(7)));

    if (
      Test.correctas[Test.respuestasUsuario.length - 1] ===
      Test.respuestasUsuario[Test.respuestasUsuario.length - 1]
    ) {
      Test.aciertos += 1;
    } else {
    
      Test.incorrectas.push({pregunta: Test.preguntas[Test.respuestasUsuario.length - 1].pregunta, respuesta: Test.preguntas[Test.respuestasUsuario.length - 1].respuestas[Test.preguntas[Test.respuestasUsuario.length - 1].correctas]})
    } 
    Test.setQuestion();
  });
});
