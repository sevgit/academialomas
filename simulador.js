$(document).ready(function() {
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
      
      scoreCard.append("<h2 class='fadeInUp animated'>Resultado:"+resultado + "" +"</h2>" +"<p>Correctas: "+ Test.aciertos + "/30</p>")
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
    
    preguntas: [
      {
        pregunta:
          "¿Cómo se señaliza un giro hacia la derecha en caso de tener el señalero averiado?",
        respuestas: [
          "Brazo y mano hacia abajo",
          "Brazo y mano hacia arriba",
          "Brazo y mano rectos",
          "Bocina y luces de freno"
        ],
        correcta: 1
      },
      {
        pregunta: "El alcohol afecta el nivel atencional del individuo",
        respuestas: ["Verdadero", "Falso"],
        correcta: 0
      },
      {
        pregunta:
          "¿Cuál es la distancia máxima permitida entre las ruedas y el cordón al estacionar?",
        respuestas: ["30cm", "5cm", "50cm", "70cm"],
        correcta: 0
      },
      {
        pregunta: "Ante la proximidad de vehículos de emergencia",
        respuestas: [
          "Debe detener su vehículo.",
          "Debe avisar con las luces al vehículo que le antecede.",
          "Debe aumentar la velocidad.",
          "Debe despejar rápidamente la calle, deteniendo su vehículo donde no moleste."
        ],
        correcta: 3
      },
      {
        pregunta: "Cuando usted dobla a la derecha:",
        respuestas: [
          "Debe acercar su vehículo a la izquierda, encender el señalero y doblar con precaución.",
          "Debe encender el señalero derecho.",
          "Debe mirar por el espejo retrovisor, encender el señalero y acercarse al cordón derecho."
        ],
        correcta: 2
      },
      {
        pregunta:
          "Si es imposible estacionar dejando paso a la circulación de vehículos ud:",
        respuestas: [
          "Estaciona en doble fila",
          "Estaciona parte del auto sobre la acera",
          "Busca un lugar seguro para estacionar en otro lugar",
          "Enciende las balizas y estaciona en doble fila"
        ],
        correcta: 2
      },
      {
        pregunta: "¿Qué significa esta señal? <img src='img/puente-estrecho.jpg' />",
        respuestas: ["Carril angosto", "Puente estrecho", "Supresión de carril", "Paso a nivel sin barrera"],
        correcta: 1
      },
      {
        pregunta: "Al momento de ser adelantado por otro vehículo, usted:",
        respuestas: [
          "Mantiene o disminuye la velocidad",
          "Aumenta la velocidad",
          "Enciende el señalero derecho para dar paso a la maniobra",
          "Se acerca al carril izquierdo."
        ],
        correcta: 0
      },
      {
        pregunta:
          "En un cruce no reglamentado, ¿qué auto debe ceder la preferencia?",
        respuestas: [
          "El último en llegar al cruce",
          "El que se acerca por la izquierda",
          "El primero en llegar al cruce",
          "El que se acerca por la derecha"
        ],
        correcta: 1
      },
      {
        pregunta: "Si explota uno de nuestros neumáticos debemos:",
        respuestas: [
          "Sostener fuerte el volante y dirigirnos a un lugar seguro",
          "Acelerar hacia la acera y estacionar lo antes posible",
          "Colocar el freno de mano y torcer las ruedas hacia la acera",
          "Encender balizas, tocar bocina y frenar en el lugar"
        ],
        correcta: 0
      },
      {
        pregunta: "Los medicamentos pueden",
        respuestas: [
          "Generar somnolencia",
          "Aportar negativamente a la fatiga",
          "Relentizar la reacción del conductor",
          "Todas son correctas"
        ],
        correcta: 3
      },
      
      {
        pregunta: "¿Qué significa esta señal? <img src='img/prohibido-girar-u.jpg' />",
        respuestas: ["Prohibido girar en U", "Prohibido dar marcha atrás", "Prohibido doblar", "Calzada de un único sentido"],
        correcta: 0
      },
      {
        pregunta: "¿Qué significa esta señal? <img src='img/calzada-resbaladiza.jpg' />",
        respuestas: ["Proyección de gravilla", "Peligro de aceite", "Calzada resbaladiza", "Curva peligrosa"],
        correcta: 2
      },
      {
        pregunta: "¿Podemos adelantar en un repecho?",
        respuestas: ["No", "Solo con extremo cuidado", "Solo en calles de un único sentido", "Se puede siempre"],
        correcta: 0
      },
      {
        pregunta: "¿Qué no podemos hacer en presencia de esta señal? <img src='img/prohibido-estacionar-detenerse.jpg' />",
        respuestas: ["Estacionar", "Ni estacionar ni detenernos", "Detenernos", "Estacionar sin permiso especial"],
        correcta: 1
      },
      {
        pregunta: "Derecho preferente de paso es:",
        respuestas: ["La facultad de un peatón o conductor de un vehículo para proseguir la marcha", "La facultad del conductor de un vehículo para cambiar de dirección careciendo de preferencia", "La facultad del conductor de un vehículo para no detener la marcha al ingresar a una calle de preferencia" ,"Ninguna de las anteriores es correcta"],
        correcta: 0
      },
      {
        pregunta: "En carretera se debe aminorar la marcha en:",
        respuestas: ["Zonas urbanas y caseríos.", "Curvas y cruces.", "Pasos a nivel y puentes.", "Todas las anteriores son correctas."],
        correcta: 3
      },
      {
        pregunta: "El tiempo de reacción del conductor se ve afectado por:",
        respuestas: ["El estado de la ruta.", "La velocidad a la cual conduce.", "El cansancio.", "Los defectos mecánicos del vehículo."],
        correcta: 2
      },
      {
        pregunta: "Los funcionarios del cuerpo de inspectores de tránsito, están facultados para modificar las preferencias establecidas cuando las circunstancias lo requieran:",
        respuestas: ["Verdadero", "Falso"],
        correcta: 0
      },
      {
        pregunta: "Al conducir en carretera su fatiga aumenta si:",
        respuestas: ["Se escucha música.", "Se viaja con ventanilla cerrada.", "El paisaje es monótono.", "Solo la 2 y 3 son correctas"],
        correcta: 3
      },
      {
        pregunta: "¿Qué luces debe llevar encendidas un vehículo durante la noche en las áreas urbanas?",
        respuestas: ["Luces altas o bajas de acuerdo a la situación del tránsito.", "Cualquiera indistintamente.", "Luces de posición.", "Solo la 1 y 3 son correctas"],
        correcta: 3
      },
      {
        pregunta: "Si su vehículo comienza a patinar al momento de frenar:",
        respuestas: ["Procure detenerlo bombeando intermitentemente el freno.", "Frene enérgicamente.", "Acelere.", "Todas las anteriores son incorrectas."],
        correcta: 0
      },
      {
        pregunta: "Cuando se trata de evitar un choque de frente en carretera Ud deberá:",
        respuestas: ["Frenar.", "Rebajar los cambios.", "Desviarse hacia la banquina.", "Encender las luces largas."],
        correcta: 2
      },
      {
        pregunta: "Siempre se debe prestar atención a la luz del semáforo que está frente a uno:",
        respuestas: ["Verdadero.", "Falso."],
        correcta: 0
      },
      {
        pregunta: "¿Para quién es obligatorio el uso del cinturón de seguridad?",
        respuestas: ["Sólo para los ocupantes de los asientos traseros de los vehículos automotores.", "Sólo para los ocupantes de los asientos delanteros de los vehículos automotores.", "Ninguna de las anteriores.", "Para todos los ocupantes del vehículo."],
        correcta: 3
      },
      {
        pregunta: "Ud. puede circular sin espejo retrovisor cuando circula a baja velocidad",
        respuestas: ["Verdadero", "Falso"],
        correcta: 1
      },
      {
        pregunta: "La velocidad adecuada de circulación de un vehículo en caso de aglomeración de personas es:",
        respuestas: ["15 km/h", "A paso de peatón.", "25 km/h", "Ninguna de las anteriores es correcta."],
        correcta: 1
      },
      {
        pregunta: "Durante la noche en áreas urbanas los vehículos deben circular con todas las luces reglamentarias encendidas.",
        respuestas: ["Verdadero.", "Falso."],
        correcta: 0
      },
      {
        pregunta: "¿Cómo se comporta Ud. frente a un agente de tránsito de perfil hacia su carril?",
        respuestas: ["Detiene totalmente la marcha", "Espera a que se vacíe el cruce", "Sigue la marcha."],
        correcta: 2
      },
      {
        pregunta: "Al encontrar a un accidentado Ud. debe:",
        respuestas: ["Quitarle el casco en caso de tenerlo puesto.", "Proporcionarle comida o alimento si lo solicita.", "Promover la calma y llamar a la emergencia.", "Todas las anteriores son correctas."],
        correcta: 2
      }
    ]
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
