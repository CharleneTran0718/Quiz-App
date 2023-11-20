const questions = [
    {
        question: "Which is my favorite? 🥟",
        answers: [
            {text: "Pelmeni", correct: true},
            {text: "Dumpling", correct: false},
            {text: "Manti", correct: false},
            {text: "Opomo", correct: false},
        ]
    },
    {
        question: "Who do I love? 💕",
        answers: [
            {text: "Mirlan", correct: false},
            {text: "Mika", correct: false},
            {text: "smelly", correct: false},
            {text: "all of the above", correct: true},
        ] 
    },
    {
        question: "Does my boyfriend love me? 🥺",
        answers: [
            {text: "What is love?", correct: false},
            {text: "Yes ofc!!! 😍", correct: true},
            {text: "no..i love bikes 🚴🏻‍♂️💨", correct: false},
            {text: "MONKEEYYYY-", correct: false},
        ] 
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();   /* displays question */
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;      /* question # */
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;     /* adds text in button */
        button.classList.add("btn");    /* add btn class name in button */
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;    /* true or false */
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;    /* increase score by 1 */
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true; /* can't click on any button */
    });
    nextButton.style.display = "block"; /* goes to next question */
}

function showStreamers() {
    // Assuming you have a variable 'score' representing the user's score
    var score = 100; // Replace with your actual score variable

    if (score === 100) {
        var streamersOverlay = document.getElementById('streamersOverlay');
        streamersOverlay.style.display = 'block';

        setTimeout(function () {
            streamersOverlay.style.display = 'none';
        }, 2000); // Adjust the time based on your animation duration
    } else {
        alert('🥺🥺🥺🥺🥺\n Oh no you didn\'t!!!!!!!');
    }
}


function showScore() {
    resetState();

    if (score === questions.length) {
        questionElement.innerHTML = `Congratulations!!! 🎉 You got a perfect score: ${score} out of ${questions.length}!!!`;
    } 
    else {
        questionElement.innerHTML = `Unfortunately, you scored ${score} out of ${questions.length}...you will get a spanky 🤚`;
    }

    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();