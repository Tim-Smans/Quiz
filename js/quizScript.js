const startBtn = document.querySelector('#startBtn')
const nextBtn = document.querySelector('#nextBtn')
const resetBtn = document.querySelector('#restartBtn')
const startTitle = document.querySelector('#title')
const openingScreenElem = document.querySelector('#openingScreen')
const questionsPageElem = document.querySelector('#questionsPage')
const scoreboardPageElem = document.querySelector('#scoreboardScreen')
const question = document.querySelector('#question')
const imageElem = document.querySelector('#imageId')
const theme = document.querySelector('#theme')
const questionTitle = document.querySelector('#questionTitle')

const questions = generateQuestions();

let currentQuestion;
let scorePoints = 0;

document.addEventListener('DOMContentLoaded', startup)

//Starting screen
startBtn.addEventListener('click', startGame);

function startup() {
    toggleVisibility(questionsPageElem);
    toggleVisibility(nextBtn);
    toggleVisibility(scoreboardPageElem);
}

function startGame() {
    toggleVisibility(openingScreenElem);
    toggleVisibility(questionsPageElem);
    currentQuestion = 0;
    fillQuestion(questions[0]);
}

function toggleVisibility(element) {
    if (element.style.display === 'none') {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
}

function fillQuestion(chosenQuestion) {
    const answsers = question.options;

    questionTitle.textContent = `Question ${currentQuestion+1}/10`
    question.innerHTML = chosenQuestion.name;
    theme.innerHTML = "<strong>Theme: </strong>" + chosenQuestion.theme;

    for (let i = 1; i <= 4; i++) {
        const anwserP = document.querySelector('#option' + i)

        anwserP.innerHTML = chosenQuestion.options[i - 1]
    }
}

//Answer clicking events
const question1 = document.querySelector('#option1')
const question2 = document.querySelector('#option2')
const question3 = document.querySelector('#option3')
const question4 = document.querySelector('#option4')

let hasAnwsered = false;

function submitAnswer(number) {
    const question = document.querySelector('#option' + number)
    if (hasAnwsered === true) {
        return;
    }
    question.classList.remove("alert-light");
    if (question.innerText === questions[currentQuestion].answer) {
        question.classList.add("alert-success");
        scorePoints++;
    } else {
        question.classList.add("alert-danger");
    }
    hasAnwsered = true;
    toggleVisibility(nextBtn);
}

question1.addEventListener('click', () => {
    submitAnswer("1")
});
question2.addEventListener('click', () => {
    submitAnswer("2")
});
question3.addEventListener('click', () => {
    submitAnswer("3")
});
question4.addEventListener('click', () => {
    submitAnswer("4")
});

nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if(currentQuestion >= questions.length){
        showScoreboard();
        return;
    }
    fillQuestion(questions[currentQuestion]);
    resetBoxes();

});

function resetBoxes() {
    question1.classList.remove("alert-success");
    question2.classList.remove("alert-success");
    question3.classList.remove("alert-success");
    question4.classList.remove("alert-success");
    question1.classList.remove("alert-danger");
    question2.classList.remove("alert-danger");
    question3.classList.remove("alert-danger");
    question4.classList.remove("alert-danger");
    question1.classList.add("alert-light");
    question2.classList.add("alert-light");
    question3.classList.add("alert-light");
    question4.classList.add("alert-light");
    toggleVisibility(nextBtn);
    hasAnwsered = false;
}

function showScoreboard(){
    toggleVisibility(questionsPageElem);
    toggleVisibility(scoreboardPageElem);

    const score = document.querySelector("#score");
    score.textContent = `You scored ${scorePoints} out of 10!`;

    if(scorePoints < 5){
        imageElem.src = "img/sad.png";
    }else{
        imageElem.src = "img/happy.png";
    }
}

resetBtn.addEventListener('click', () => {
   location.reload();
});
function generateQuestions(){
    let allQuestions = quizQuestions();
    let generatedQuestions= [];

    while(generatedQuestions.length < 10){
        const random = Math.floor(Math.random() * allQuestions.length);

        if(!generatedQuestions.includes(allQuestions[random])){
            generatedQuestions.push(allQuestions[random]);
        }
    }

    return generatedQuestions;
}