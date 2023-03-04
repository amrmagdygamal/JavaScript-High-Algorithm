// scroll bar
let hei = document.documentElement.scrollHeight - document.documentElement.clientHeight;
let dis = document.querySelector(".scroller");
window.addEventListener("scroll", () => {
  let llTop = document.documentElement.scrollTop;
  dis.style.width =  `${(llTop / hei) * 100}%`;
});

//##########################################################3333

//letters 
let letters = "abcdefghijklmnopqrstuvwxyz";
// get array from letters
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

//Generate letters 
lettersArray.forEach(letter => {

  let span = document.createElement("span");

  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);

  span.className = 'letter-box';
  lettersContainer.appendChild(span);
});

// Object of words Catogories 
const words = {
  programming: ["php", "javascript", "go", "scale", "fortran", "r", "mysql", "python" ], 
  movies: ["Prestige", "Inception", "Parasite", "Interstellar", "whiplash", "Memento", "Coco", "Up"], 
  people: ["Albert Einstein", "Hitchock", "Alexander", "Cleopatra", "Mento Ghandi"],
  countries: ["Syria", "Palstine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

//Get Random Propterty and Values

let allKeys = Object.keys(words);

let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

//set catogory info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

//select letters guess element 
let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert Chosen word to Array 

let lettersAndSpace = Array.from(randomValueValue);

//Create Spans Depened On word 
lettersAndSpace.forEach(letter => {
  let emptySpan = document.createElement("span");
  if (letter === ' '){
    emptySpan.className = "with-space";
  }
  lettersGuessContainer.appendChild(emptySpan);
});
let guessSpans = document.querySelectorAll(".letters-guess span")

let wrongAttempts = 0;

let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking on letters
document.addEventListener("click", (e) => {
  
  if (e.target.className === 'letter-box'){
    
    e.target.classList.add("clicked");
    
    let theStatus = false;
    
    let theClickedLetter = e.target.innerHTML.toLowerCase();

    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {

      if(theClickedLetter === wordLetter) {

        theStatus = true;

        guessSpans.forEach((span, spanIndex) => {

          if (wordIndex === spanIndex){

            span.innerHTML = theClickedLetter;

          }
        });
      }
    });
    
    if (theStatus !== true){

      wrongAttempts++;
      
      theDraw.classList.add(`wrong-${wrongAttempts}`);

      if (wrongAttempts === 8){
        endGame();

        lettersContainer.classList.add("finished");
      }
    }
  }
});

function endGame(){
  let div = document.createElement("div");
  let spaDiv = document.createElement("button")

  spaDiv.className = "retry";
  let spaDivText = document.createTextNode("Retry");

  spaDiv.appendChild(spaDivText);
//vent when retry clicked



  let divText = document.createTextNode(`Game Over, The word Is ${randomValueValue}`);

  div.appendChild(divText);

  div.className = 'popup';
  div.appendChild(spaDiv)
  document.body.appendChild(div);
};



