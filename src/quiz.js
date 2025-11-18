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

filterQuestionsByDifficulty(difficulty) {
    // Solo filtramos si difficulty es 1, 2 o 3
    if ([1, 2, 3].includes(difficulty)) {
    this.questions = this.questions.filter(
        question => question.difficulty === difficulty
    );
    }
    // Si no es válido → no hacemos nada (como pide el enunciado)
}

averageDifficulty() {
    if (this.questions.length === 0) return 0;

    const totalDifficulty = this.questions.reduce((acc, question) => {
    return acc + question.difficulty;
    }, 0);

    return Number((totalDifficulty / this.questions.length).toFixed(2));
    // toFixed(2) para 2 decimales + Number() para que no devuelva string
}

}


