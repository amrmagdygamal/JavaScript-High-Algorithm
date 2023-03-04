// // Main Variables

// let theInput = document.querySelector(".get-repos input");
// let getButton = document.querySelector(".get-button");
// let reposData = document.querySelector(".show-data");

// getButton.onclick = function(){
//   getRepos();
// }
// function getRepos(){

//   if (theInput.value == ""){

//     reposData.innerHTML = "<span>Please Write Github Username.</span>";

//   }else{

//     fetch(`https://api.github.com/users/${theInput.value}/repos`)
//     .then((response) => response.json())
//     .then((repositories) => {
//       reposData.innerHTML = "";

//       //loop on repositories
//       repositories.forEach(repo => {
//         //create the main div Element
//         let mainDiv = document.createElement("div");

//         let repoName = document.createTextNode(repo.name);

//         //Append the text to the main div
//         mainDiv.appendChild(repoName);
//         let theUrl = document.createElement("a");

//         let theUrlText = document.createTextNode("Visit");
//         theUrl.appendChild(theUrlText);

//         theUrl.href =  `https://github.com/${theInput.value}/${repo.name}`;

//         theUrl.setAttribute("target", "_blank");

//         mainDiv.appendChild(theUrl);

//         // create stars count span
//         let StartSpan = document.createElement("span");

//         let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

//         StartSpan.appendChild(starsText);

//         mainDiv.appendChild(StartSpan);

//         mainDiv.className = "repo-box";
//         reposData.appendChild(mainDiv);
//       });
//     });
//   }

// }
function truncateString(str, num) {
  let result = "";
  if (str.length > num){
    result = str.
  }else {
    result = str;
  }
  return result;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);