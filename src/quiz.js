class Quiz {
constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.currentQuestionIndex = 0;
    this.correctAnswers = 0;
    this.score = 0;
}

getQuestion() {
    return this.questions[this.currentQuestionIndex];
}

moveToNextQuestion() {
    this.currentQuestionIndex++;
}

shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
}

checkAnswer(answer) {
    const currentQuestion = this.getQuestion();

    if (currentQuestion.answer === answer) {
    this.score++;
    this.correctAnswers++;
    return true;
    }

    return false;
}

hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
}
}
