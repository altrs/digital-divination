//WEBGAZER GETS 30 COORDINATES IN 30 SECONDS
webgazer.begin(); //initialize
webgazer.showVideoPreview(false); //turn video off

//Coordinate variables for conversion
var x, y;
var xDec = 360/window.innerWidth; //width to longitude(-180, 180) conversion decimal
var yDec = 180/window.innerHeight; //height to latitude(-90, 90) conversion decimal


function logXY() { //main function
  var intervalId = setInterval(function() { //obtain x and y coordinates
    var predictionPromise = webgazer.getCurrentPrediction();
    predictionPromise.then(function(prediction){
      if (prediction) {
        x = (prediction.x)*(xDec);
            if (x < 180) {x = -x;} //convert to negative coordinate
        y = (prediction.y)*(yDec);
            if (y < 90) {y = -y;} //convert to negative coordinate
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

setTimeout(logXY, 30000); //start with five second delay

//MOUSE XY
document.addEventListener("mousemove", function(event) {
    var mx = (event.clientX)*(xDec);
      if (mx < 180) {mx = -Math.abs((mx)-180);} else{mx = (mx-180);} //convert to negative coordinate
    var my = (event.clientY)*(yDec);
      if (my < 90) {my = -my;} //convert to negative coordinate
    var coordinates = "Mouse coordinates: (" + mx + ", " + my + ")";
    document.getElementById("coordinates").textContent = coordinates;
});