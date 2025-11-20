document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");

  // End view elements
  const resultContainer = document.querySelector("#result");


  /************  SET VISIBILITY OF VIEWS  ************/

  // Show the quiz view (div#quizView) and hide the end view (div#endView)
  quizView.style.display = "block";
  endView.style.display = "none";


  /************  QUIZ DATA  ************/
  
  // Array with the quiz questions
  const questions = [
    new Question("What is 2 + 2?", ["3", "4", "5", "6"], "4", 1),
    new Question("What is the capital of France?", ["Miami", "Paris", "Oslo", "Rome"], "Paris", 1),
    new Question("Who created JavaScript?", ["Plato", "Brendan Eich", "Lea Verou", "Bill Gates"], "Brendan Eich", 2),
    new Question("What is the mass–energy equivalence equation?", ["E = mc^2", "E = m*c^2", "E = m*c^3", "E = m*c"], "E = mc^2", 3),
    // Add more questions here
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)


  /************  QUIZ INSTANCE  ************/
  
  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();


  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  showQuestion();


  /************  TIMER  ************/

  let timer;


  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);

  // Restart button - Reiniciar el cuestionario
  const restartButton = document.querySelector("#restartButton");
  restartButton.addEventListener("click", () => {
    // 1. Ocultar resultados
    endView.style.display = "none";
    // 2. Mostrar el quiz de nuevo
    quizView.style.display = "block";

    // 3. Reiniciar todo
    quiz.currentQuestionIndex = 0;
    quiz.correctAnswers = 0;
    quiz.shuffleQuestions();  // ¡Barajar de nuevo para que sea diferente!

    // Mostrar primera pregunta
    showQuestion();
  });

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results



  function showQuestion() { 
  // If the quiz has ended, show the results
  if (quiz.hasEnded()) {
    showResults();
    return;
  }

  // Clear the previous question text and question choices
  questionContainer.innerText = "";
  choiceContainer.innerHTML = "";

  // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
  const question = quiz.getQuestion();
  // Shuffle the choices of the current question by calling the method 'shuffleChoices()' on the question object
  question.shuffleChoices();

  // 1. Show the question
  questionContainer.innerText = question.question;

  // 2. Update the green progress bar
  const progressPercentage = ((quiz.currentQuestionIndex + 1) / quiz.questions.length) * 100;
  progressBar.style.width = `${progressPercentage}%`;

  // 3. Update the question count text 
  questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

  // 4. Create and display new radio input element with a label for each choice.
  question.choices.forEach((choice, index) => {
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "choice";
    radioInput.value = index;

    const label = document.createElement("label");
    label.innerText = choice;

    const breakLine = document.createElement("br");

    choiceContainer.appendChild(radioInput);
    choiceContainer.appendChild(label);
    choiceContainer.appendChild(breakLine);
  });
}

  


  
  function nextButtonHandler() {
    const answerOptions = document.querySelectorAll('input[name="choice"]');

  // 2. Recorrerlos y ver cuál está seleccionado
  let selectedAnswerIndex = null;
  answerOptions.forEach(option => {
    if (option.checked) {
      selectedAnswerIndex = parseInt(option.value); // el value es el índice (0, 1, 2, 3)
    }
  });

  // 3. Si seleccionó una respuesta → comprobar si es correcta
  if (selectedAnswerIndex !== null) {
    const currentQuestion = quiz.getQuestion();
    if (currentQuestion.isCorrectAnswer(selectedAnswerIndex)) {
      quiz.correctAnswers++; // ¡solo aumentamos si es correcta!
    }
  }

  // 4. Siempre pasamos a la siguiente pregunta (tanto si respondió como si no)
  quiz.currentQuestionIndex++;

  // Mostrar la siguiente pregunta o los resultados si ya terminó
  if (quiz.hasEnded()) {
    showResults();
  } else {
    showQuestion();
  }
  }  



function showResults() {

  quizView.style.display = "none";

  endView.style.display = "flex";

  resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`;
}
  }
  
);