// Get Slider Items | Aray.from [ES6 Featyre]

let sliderImages = Array.from(document.querySelectorAll(".slider-container img"));
let slidesCount = sliderImages.length;
let currentSlide = 1;
let slideNumberElement = document.getElementById("slide-number");
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

nextButton.onclick = nextSlide;
prevButton.onclick = prevSlide;

let paginationElem = document.createElement("ul");
paginationElem.setAttribute("id", "pagination-ul");


for (let i = 1; i <= slidesCount; i++){
let paginationItem = document.createElement("li");
paginationItem.setAttribute("data-index", i);

  paginationItem.appendChild(document.createTextNode(i));

  paginationElem.appendChild(paginationItem);
}
  document.getElementById("indicators").appendChild(paginationElem);

  let pagCreatedUl = document.getElementById("pagination-ul");
  
  let sliderBullets = Array.from(document.querySelectorAll("#pagination-ul li"));

for (let i = 0; i < sliderBullets.length; i++){
  sliderBullets[i].onclick = function(){
  currentSlide = parseInt(this.getAttribute("data-index"));
  theCheker();
  }
}
theCheker();


function nextSlide(){
if (nextButton.classList.contains("disabled")){
  return false;
}else {
  currentSlide++;
  theCheker();
}
}
function prevSlide(){
  if (prevButton.classList.contains("disabled")){
    return false;
  }else {
    currentSlide--;
    theCheker();
  }
}

function theCheker() {

  slideNumberElement.textContent = `Slide # ${currentSlide} of ${slidesCount}`;

  removeAllActive();


  sliderImages[currentSlide - 1].classList.add("active");
  pagCreatedUl.children[currentSlide -1].classList.add("active");

  if(currentSlide == 1){
    prevButton.classList.add("disabled");
  }else{
    prevButton.classList.remove("disabled");
  };
  if(currentSlide == slidesCount){
    nextButton.classList.add("disabled");
  }else{
    nextButton.classList.remove("disabled");
  }
}

function removeAllActive() {
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });
  sliderBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}