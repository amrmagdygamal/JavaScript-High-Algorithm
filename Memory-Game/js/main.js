
document.querySelector(".control-buttons span").onclick = function() {

  let yourName = prompt("what's Your Name?");

  if (yourName == null || yourName == ""){

    document.querySelector(".name span").innerHTML = 'UnKnown';

  }else {

    document.querySelector(".name span").innerHTML = yourName;

  }

  document.querySelector(".control-buttons").remove();

};

let duration = 1000;

let blocksContainer = document.querySelector(".game-blocks");

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];

// let orderRange = Array.from(Array(blocks.length).keys()); Another way to get array from blocks

shuffle(orderRange);

blocks.forEach((block, index) => {

  block.style.order = orderRange[index];

  block.addEventListener('click', function() {

    flipBlock(block);

  });

  

});

function flipBlock(selectedBlock) {

  selectedBlock.classList.add('is-flipp');

  let allFlipp = blocks.filter(flipp => flipp.classList.contains("is-flipp"));
  
  if (allFlipp.length === 2) {
    
    stopClicking();

    checkMatched(allFlipp[0], allFlipp[1])
  }
    let numMatched = blocks.filter(match => match.classList.contains("matched"));

    if (numMatched.length == orderRange.length){

      document.querySelector(".gameSuccess").classList.add("success");

      document.querySelector(".gameSuccess.success span").innerHTML = `"Congratulations!
      You Success"`;
      document.querySelector(".gameSuccess.success span button").innerHTML = "Play Again";
    }

}

function stopClicking () {
  blocksContainer.classList.add('no-click');

  setTimeout(() => {

    blocksContainer.classList.remove('no-click')
    
  }, duration);
}

function checkMatched(first, second) {

  let triesElem = document.querySelector('.tries span');

  if(first.dataset.technology === second.dataset.technology){

    first.classList.remove('is-flipp');
    second.classList.remove('is-flipp');
  
    first.classList.add('matched');
    second.classList.add('matched');

    document.getElementById('success').play();

    

  }else {
    triesElem.innerHTML = parseInt(triesElem.innerHTML) + 1;

    setTimeout(() => {

      first.classList.remove('is-flipp');
      second.classList.remove('is-flipp');
      
    }, duration);

    document.getElementById('fail').play();
  }
};

function shuffle(array) {
  let current = array.length,
      temp,
      random;

  while (current > 0) {

    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;

  }
  return array;
}

