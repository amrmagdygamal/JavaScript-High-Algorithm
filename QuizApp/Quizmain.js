let countSpan = document.querySelector(".quiz-info .count span")
let bullets = document.querySelector(".bullets")
let bulletsSpanContainer = document.querySelector(".bullets .spans")
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");
let currentIndex = 0;
let rightAnswers = 0;
let countDownInterval;
function getQuestions () {

let myRequest = new XMLHttpRequest();

myRequest.onreadystatechange = function(){
  if (this.readyState === 4 && this.status === 200){

    let questionsObject = JSON.parse(this.responseText);

    let qCount = questionsObject.length;

    createBullets(qCount);

    addQuestionData(questionsObject[currentIndex], qCount);

    countdown(5, qCount);
    
    submitButton.onclick = () => {
      let theRightAnswer = questionsObject[currentIndex].right_answer;

      currentIndex++;
//CHECK THE ANSWER
      checkAnswer(theRightAnswer, qCount);

//REMOVE PREVIOUS QUESTION 
      quizArea.innerHTML = "";
      answersArea.innerHTML = "";

//ADD QUESTION DATA
      addQuestionData(questionsObject[currentIndex], qCount);

//HANDLE BULLETS
      handleBullets();

    clearInterval(countDownInterval);
    countdown(5, qCount);

//SHOW RESULTS
      showResults(qCount);

    };
  };
};
myRequest.open("GET", "html_questions.json", true)
myRequest.send();

};
getQuestions();


function createBullets(num) {
  countSpan.innerHTML = num; 

  for (let i = 0; i < num; i++){

    let theBullet = document.createElement("span");

    if (i === 0){
      theBullet.className = "on";
    }
    bulletsSpanContainer.appendChild(theBullet);
  }
}



function addQuestionData(obj, count){
  if(currentIndex < count){
    
  let questionTitle = document.createElement("h2");
  let questionText = document.createTextNode(obj.title);
  questionTitle.appendChild(questionText);
  quizArea.appendChild(questionTitle);

  for (let i = 1; i <= 4; i++){
    let mainDiv = document.createElement("div");
    mainDiv.className = "answer";

    let radioInput = document.createElement("input");
    radioInput.name = 'question';
    radioInput.type = 'radio';
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`];

    let theLabel = document.createElement("label");
    theLabel.htmlFor = `answer_${i}`;

    let theLabelText = document.createTextNode(obj[`answer_${i}`])

    theLabel.appendChild(theLabelText);

    mainDiv.appendChild(radioInput);
    mainDiv.appendChild(theLabel);
    answersArea.appendChild(mainDiv)
  }
  }
}

function checkAnswer(rAnswer, count){
  let answers = document.getElementsByName("question");
  let theChosenAnswer;

  for (let i = 0; i < answers.length; i++){
    if(answers[i].checked){
      theChosenAnswer = answers[i].dataset.answer;
    }
  };
}

if (rAnswer === theChosenAnswer){
  rightAnswers++;
};

function handleBullets(){

  let bulletsSpans = document.querySelectorAll(".bullets .spans span")
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index){
      span.className = "on";
    }
  });
}

function showResults(count){

  let theResults;


  if (currentIndex === count){
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > (count / 2) && rightAnswers < count){
      theResults = `<span class="good">Good</span>, ${rightAnswers} From ${count} Is Good.`;
    }else if (rightAnswers === count){
      theResults = `<span class="perfect">Perfect</span>, All Answers Is Right.`;
    }else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswers} From ${count} Not Bad.`;
    }
    resultsContainer.innerHTML = theResults;
    resultsContainer.style.padding = "10px";
    resultsContainer.style.backgroundColor = "white";
    resultsContainer.style.marginTop = "10px";

  }
}

function countdown (duration, count){
  if (currentIndex < count){
    let minutes, seconds;
    countDownInterval = setInterval(function () {

      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);

      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;

      countdownElement.innerHTML = `${minutes}:${seconds}`;

      if (--duration < 0){
        clearInterval(countDownInterval);
        submitButton.click();
      }

    }, 1000)
  }
}