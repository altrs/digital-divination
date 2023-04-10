//WEBGAZER GETS 30 COORDINATES IN 30 SECONDS
webgazer.begin(); //initialize
webgazer.showVideoPreview(false); //turn video off
//Coordinate variables for conversion
var x, y;
var xDec = 360/window.innerWidth; //width to longitude(-180, 180) ratio conversion decimal
var yDec = 180/window.innerHeight; //height to latitude(-90, 90) ratio conversion decimal


//INSTRUCTIONS DISPLAY ------------------------------------------------------------------------
const instructions = document.getElementById("instructions");
setTimeout(function() {
  instructions.classList.add("fade-out");
  setTimeout(function() {
    instructions.innerHTML = "CALIBRATE YOUR FOCUS.<br>CLICK THE BOXES AND CIRCLES TO ALIGN YOUR THOUGHTS";
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


//CALIBRATION GIFS ------------------------------------------------------------------------------
const divs = document.querySelectorAll('.calib'); // Get all the divs with class 'calib'
divs.forEach(div => { // Loop through each div and add an event listener for the 'click' event
  div.addEventListener('click', () => {
    const gifs = JSON.parse(div.dataset.gifs); // Get the data-gifs array of the clicked div
    let currentGifIndex = gifs.indexOf(div.style.backgroundImage.slice(5, -2)); // Gets current bg

    // If the current background image is the last one in the array, loop back to the beginning
    if (currentGifIndex === gifs.length - 1) {currentGifIndex = 0;} else {currentGifIndex++;}
    // Set the background image of the div to the next image in the array
    div.style.backgroundImage = `url(${gifs[currentGifIndex]})`;
  });
});



//MAIN FUNCTION ------------------------------------------------------------------------------------
function logXY() { 
  webgazer.showPredictionPoints(false); //turn view point off
  var intervalId = setInterval(function() { //obtain x and y coordinates
    var predictionPromise = webgazer.getCurrentPrediction();
    predictionPromise.then(function(prediction){
      if (prediction) {
        var x = (prediction.x)*(xDec);
          if (x < 180) {x = -Math.abs((x)-180);} else{x = (x-180);} //convert to negative coordinate
        var y = (prediction.y)*(yDec);
          if (y < 90) {y = -(y)+90;} else{y = -Math.abs(y-90);} //convert to negative coordinate
        console.log("X: " + x + ", Y:" + y); //GAZE XY
      } else {console.log("No prediction");}
    });
  }, 1000);

  setTimeout(function() { //stop function in 30 seconds
    clearInterval(intervalId);
    console.log("Scan Complete");
    webgazer.pause();
  }, 30000);

}
setTimeout(logXY, 60000); //start with five second delay


//FOR THE LITTLE CIRCLES ---------------------------------------------------------------------------
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');
const circle3 = document.getElementById('circle3');
const circle4 = document.getElementById('circle4');

circle1.addEventListener("click", function() {
  circle1.style.backgroundColor = "#a6ffbe";
});

circle2.addEventListener("click", function() {
  circle2.style.backgroundColor = "#a6ffbe";
});

circle3.addEventListener("click", function() {
  circle3.style.backgroundColor = "#a6ffbe";
});

circle4.addEventListener("click", function() {
  circle4.style.backgroundColor = "#a6ffbe";
});

circle5.addEventListener("click", function() {
  circle5.style.backgroundColor = "#a6ffbe";
});

circle6.addEventListener("click", function() {
  circle6.style.backgroundColor = "#a6ffbe";
});

circle7.addEventListener("click", function() {
  circle7.style.backgroundColor = "#a6ffbe";
});

circle8.addEventListener("click", function() {
  circle8.style.backgroundColor = "#a6ffbe";
});


//MOUSE XY TESTING ------------------------------------------------------------------------------
document.addEventListener("mousemove", function(event) {
    var mx = (event.clientX)*(xDec);
      if (mx < 180) {mx = -Math.abs((mx)-180);} else{mx = (mx-180);} //convert to negative coordinate
    var my = (event.clientY)*(yDec);
      if (my < 90) {my = -(my)+90;} else{my = -Math.abs(my-90);} //convert to negative coordinate
    var coordinates = "Mouse coordinates: (" + mx + ", " + my + ")";
    document.getElementById("coordinates").textContent = coordinates;
});




