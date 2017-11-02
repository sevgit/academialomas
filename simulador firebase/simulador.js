$(document).ready(function() {
  
  const db = firebase.database();
  const ref = db.ref('preguntas');
  const usuarios = db.ref('usuarios');

  ref.on('value', gotData, errData);
  usuarios.on('value', gotUsers, errUsers);


  function gotUsers(data){
    Test.users = data.val();
    console.log(Test.users);
  }  
  function errUsers(err){
    console.log(err);
  }  
  function gotData(data) {
    Test.preguntas = data.val();
    console.log(data.val());
    console.log(Test.preguntas);
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
    correctas: [1,0,0,3,2,2,1,0,1,0,3,0,2,0,1,0,0,2,0,3,3,0,2,0,3,1,1,0,2,2],
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
      
      testContainer.children().css( "display", "none" );
      
      scoreCard.append("<h2 class='fadeInUp animated'>Resultado:"+resultado + "" +"</h2>" +"Correctas: "+ Test.aciertos + "/30")
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
    }},
    
    preguntas:[],
  };
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
    
      Test.incorrectas.push({pregunta: Test.preguntas[Test.respuestasUsuario.length - 1].pregunta, respuesta: Test.preguntas[Test.respuestasUsuario.length - 1].respuestas[Test.preguntas[Test.respuestasUsuario.length - 1].correcta]})
    } 
    Test.setQuestion();
  });
});
