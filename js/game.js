
// Script Connect Check
// console.log('Hello From the builder');

// DOM Query
const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
// console.log(choices);
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
// Timer
const timer = document.getElementById("timer");
// Loader
const loader = document.getElementById('loader');
const game = document.getElementById('game');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
// set timer length as count; declare intervalID
let count = 60;
let intervalID;

// Countdown Timer
var time=60,r=document.getElementById('timer'),tmp=time;

setInterval(function(){
    var c=tmp--,m=(c/60)>>0,s=(c-m*60)+'';
    r.textContent='Quiz Ends in '+m+':'+(s.length>1?'':'0')+s
    tmp!=0||(tmp=time);
},1000);

// figure out how to stop timer

// setTimeout(function(){
//     clearInterval(timer);
//  }, 1000);


// Array of questions ( fetch from JSON )
fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;

    startGame();
    })
    .catch((err) => {
        console.error(err);
    });

// Array Check
// console.log(questions);

// Constants

const CORRECT_BONUS = 20;
const MAX_QUESTIONS = 5;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    // console.log(availableQuestions); // check for questions
    getNewQuestion();
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};


// Add questions to game
getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);

        //go to the end of page
        return window.location.assign('/end.html');
    };

    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    // Cut out the question that was used
    availableQuestions.splice(questionIndex, 1);
    // console.log(availableQuestions); // check for available questions
    acceptingAnswers = true;
};

// User click action ( correct, incorrect ) for answers 
choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        // console.log(selectedAnswer == currentQuestion.answer); // if answer is correct
        const classToApply =
            selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
});

// add to score function
incrementScore = num => {
    score += num;
    scoreText.innerText = score;
};


