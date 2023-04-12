//WEBGAZER GETS 30 COORDINATES IN 30 SECONDS
webgazer.begin(); //initialize https://webgazer.cs.brown.edu/
webgazer.showVideoPreview(false); //turn video off
//Coordinate variables for conversion
var x, y;
var xDec = 360/window.innerWidth; //width to longitude(-180, 180) ratio conversion decimal
var yDec = 180/window.innerHeight; //height to latitude(-90, 90) ratio conversion decimal

let choosenImages = [];
let choosenImages2 = [];
let xCoords = [];
let yCoords = [];

let overallX = 0;
let overallY = 0;
let main;
let pressure;
let visibility;
let windmph;

//INSTRUCTIONS DISPLAY PART 1 ------------------------------------------------------------------------
const instructions = document.getElementById("instructions");
setTimeout(function() {
  instructions.classList.add("fade-out"); //https://blog.hubspot.com/website/css-fade-in
  setTimeout(function() { https://javascript.info/settimeout-setinterval
    instructions.innerHTML = "CALIBRATE YOUR FOCUS<br>CLICK THE BOXES AND CIRCLES TO ALIGN YOUR THOUGHTS";
    instructions.classList.remove("fade-out");
    instructions.classList.add("fade-in");
    setTimeout(function() {
      instructions.classList.remove("fade-in");
    }, 500);
  }, 500);
}, 5000);

setTimeout(function() {
  instructions.classList.add("fade-out");
}, 10000);


//INSTRUCTIONS DISPLAY PART 2 ------------------------------------------------------------------------
const instructions2 = document.getElementById("instructions2");
setTimeout(function() {
  instructions.remove();
  instructions2.innerHTML = "YOU FOCUS ON THE SCREEN";
}, 30000);
setTimeout(function() {
  instructions3.innerHTML = "YOU SEE YOURSELF IN THE REFLECTION";
}, 31000);
setTimeout(function() {
  instructions4.innerHTML = "YOU TRAVERSE THE WORLD THROUGH YOUR EYES";
}, 32000);
setTimeout(function() {
  instructions5.innerHTML = "YOU WILL BE LOOKING AT A BLANK SCREEN FOR<br>30 SECONDS WHILE THE SCAN RUNS";
}, 33000);

setTimeout(function() { //ADD BUTTON AT END
  const centerDiv = document.querySelector('.center');
  const button = document.createElement('button');
  button.textContent = "BEGIN?";
  button.style.display = "block";
  button.style.margin = "auto";
  button.style.backgroundColor = "black"
  button.style.color = "#a6ffbe";
  button.style.borderColor = "#a6ffbe";
  centerDiv.style.textAlign = "center";
  centerDiv.appendChild(button);
  button.addEventListener("click", function() {
    logXY();
  });

}, 34000);



//CALIBRATION GIFS ------------------------------------------------------------------------------
const divs = document.querySelectorAll('.calib');

divs.forEach((div, index) => {
  const gifs = JSON.parse(div.dataset.gifs);
  choosenImages[index] = gifs[0];
  
  div.addEventListener('click', () => {
    let currentGifIndex = gifs.indexOf(choosenImages[index]);
    if (currentGifIndex === gifs.length - 1) {
      currentGifIndex = 0;
    } else {
      currentGifIndex++;
    }
    choosenImages[index] = gifs[currentGifIndex];
    div.style.backgroundImage = `url(${choosenImages[index]})`;
    //console.log(choosenImages);
  });
});



//MAIN FUNCTION ------------------------------------------------------------------------------------
function logXY() { 
  //REMOVE ELEMENTS ON SCREEN
  const gifsToRemove = document.querySelectorAll(".calib");
  gifsToRemove.forEach(element => {element.remove();});
  const divToRemove = document.querySelectorAll(".center");
  divToRemove.forEach(element => {element.remove();});
  const circlesToRemove = document.querySelectorAll(".circle");
  circlesToRemove.forEach(element => {element.remove();});


  //LOG GAZE XY
  webgazer.showPredictionPoints(false); //turn view point off
  var intervalId = setInterval(function() { //obtain x and y coordinates
    var predictionPromise = webgazer.getCurrentPrediction();
    predictionPromise.then(function(prediction){
      if (prediction) {
        var x = (prediction.x)*(xDec);
          if (x < 180) {x = -Math.abs((x)-180);} else{x = (x-180);} //convert to negative coordinate
          xCoords.push(x);
        var y = (prediction.y)*(yDec);
          if (y < 90) {y = -(y)+90;} else{y = -Math.abs(y-90);} //convert to negative coordinate
          yCoords.push(y);
        //console.log("X: " + x + ", Y:" + y); //GAZE XY
      } else {console.log("No prediction");}
    });
  }, 1000);

  setTimeout(function() { //stop function in 30 seconds
    clearInterval(intervalId);
    console.log("Scan Complete");
    webgazer.pause();

    //RESULTS BUTTON
    const buttonR = document.createElement('button');
    buttonR.textContent = "GET RESULTS";
    buttonR.style.display = "block";
    buttonR.style.backgroundColor = "black";
    buttonR.style.color = "#a6ffbe";
    buttonR.style.borderColor = "#a6ffbe";
    buttonR.style.position = "absolute";
    buttonR.style.top = "50%";
    buttonR.style.left = "50%";
    buttonR.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(buttonR);
    buttonR.addEventListener("click", function() {
      overallX = xCoords[xCoords.length - 1];
      overallY = yCoords[yCoords.length - 1];
      if(overallX > -90 && overallX < 90 && overallY > -180 && overallY < 180){
        results();
        buttonR.style.display = 'none'; //https://bobbyhadz.com/blog/javascript-hide-button-after-click
      } else{
        alert("GAZE READING ERROR. PLEASE TRY AGAIN");
        location.reload();
      }
    });
  }, 30000);

}


//FOR THE LITTLE CIRCLES ---------------------------------------------------------------------------
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const circle3 = document.getElementById('circle3');
const circle4 = document.getElementById('circle4');

circle1.addEventListener("click", function() {circle1.style.backgroundColor = "#a6ffbe";});
circle2.addEventListener("click", function() {circle2.style.backgroundColor = "#a6ffbe";});
circle3.addEventListener("click", function() {circle3.style.backgroundColor = "#a6ffbe";});
circle4.addEventListener("click", function() {circle4.style.backgroundColor = "#a6ffbe";});
circle5.addEventListener("click", function() {circle5.style.backgroundColor = "#a6ffbe";});
circle6.addEventListener("click", function() {circle6.style.backgroundColor = "#a6ffbe";});
circle7.addEventListener("click", function() {circle7.style.backgroundColor = "#a6ffbe";});
circle8.addEventListener("click", function() {circle8.style.backgroundColor = "#a6ffbe";});


//MOUSE XY TESTING ------------------------------------------------------------------------------
// document.addEventListener("mousemove", function(event) {
//     var mx = (event.clientX)*(xDec);
//       if (mx < 180) {mx = -Math.abs((mx)-180);} else{mx = (mx-180);} //convert to negative coordinate
//     var my = (event.clientY)*(yDec);
//       if (my < 90) {my = -(my)+90;} else{my = -Math.abs(my-90);} //convert to negative coordinate
//     var coordinates = "Mouse coordinates: (" + mx + ", " + my + ")";
//     document.getElementById("coordinates").textContent = coordinates;
// });


//RESULTS --------------------------------------------------------------------------------------
async function results () {
  //GET FINAL COORDINATES
  console.log("x:" + xCoords);
  console.log("y:" + yCoords);
  console.log("Overall x:" + xCoords[xCoords.length - 1]);
  console.log("Overall y:" + yCoords[yCoords.length - 1]);

  //GET WEATHER INFO
  await getWeatherInfo();

  // GET WORDS INFO
  console.log(choosenImages);
  for (let q = 0; q < choosenImages.length; q++) {
    const filename = choosenImages[q].split('/').pop();
    const fileNameWithoutExtension = filename.split(".")[0];
    choosenImages2[q] = fileNameWithoutExtension;
  }
  console.log(choosenImages2);

  //Draw path of coordinates
  const canvas = document.getElementById('my-canvas');
  const ctx = canvas.getContext('2d');
  canvas.style.display = 'inline-block'; // or 'block'
  ctx.strokeStyle = '#a6ffbe';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(xCoords[0] * 2, yCoords[0] * 2); // Scale the first point
  for (let i = 1; i < xCoords.length; i++) {  // Draw a line to each subsequent point
    ctx.lineTo(xCoords[i] * 2, yCoords[i] * 2); // Scale each point
  }
  ctx.stroke(); // Stroke the path to the canvas


  //WRITE RESULTS TO SCREEN
  const textArray = [];
  textArray.push("USER WANTS " + choosenImages2[0].toUpperCase());
  textArray.push("USER WANTS " + choosenImages2[1].toUpperCase());
  textArray.push("USER WANTS " + choosenImages2[2].toUpperCase());
  textArray.push("USER WANTS " + choosenImages2[3].toUpperCase());
  textArray.push("USER WANTS " + choosenImages2[4].toUpperCase());
  textArray.push("USER WANTS " + choosenImages2[5].toUpperCase());
  textArray.push("YOUR EYES LOOKED TO (" + xCoords[xCoords.length - 1] + ", " + yCoords[yCoords.length - 1] +") FOR GUIDANCE");
  textArray.push("THERE, THE EARTH SAYS:");
  textArray.push("IT WILL COME LIKE " + main);
  textArray.push("THE PRESSURE WILL BE " + pressure + " HPA");
  textArray.push("THE VISIBILITY LEVEL WILL BE " + visibility + " METERS");
  textArray.push("THE EARTH WILL PUSH YOU AT " + windmph + " MPH");
  textArray.push(" ");
  textArray.push("THANK YOU FOR CONSULTING THE EARTH ON THIS MATTER");

  const resultsDiv = document.createElement('div');
  const results = document.createElement('p');
  resultsDiv.appendChild(results);

  let index = 0;
  setInterval(() => {
    if (index < textArray.length) {
      results.innerText += textArray[index] + '\n';
      index++;
    }
  }, 2000);

  setTimeout(() => { //https://stackoverflow.com/questions/34146861/add-link-element-a-to-paragraph-p-javascript
    var temp_link = document.createElement("a");
    temp_link.href = "index.html";
    temp_link.target = '_blank';
    temp_link.innerHTML = "RETURN?";

    var par = document.createElement("p");
    par.innerHTML = " ";
    par.appendChild(temp_link);

    temp_link.style.color = "#a6ffbe";

    resultsDiv.appendChild(par);
  }, 30000)

  results.style.color = "#a6ffbe"; // sets the text color to red
  document.body.appendChild(resultsDiv);

}

const api_key = "170bbceaf0629a225badbb53e828b7e8";
async function getWeatherInfo (){
  let api_url = "https://api.openweathermap.org/data/2.5/weather?lat=" + yCoords[yCoords.length - 1] + "&lon=" + xCoords[xCoords.length - 1] + "&appid=" + api_key

  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);


  //let temp = data.main.temp; //navigates json data and stores the value in 'temp'

  main = data.weather[0].description.toUpperCase();
  pressure = data.main.pressure;
  visibility = visibility = data.visibility ? data.visibility : "N/A";
  windmph = data.wind.speed;
}



