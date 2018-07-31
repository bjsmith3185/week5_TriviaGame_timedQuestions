

 

var interval = 8;

var stopTimer;

    stopTimer = setInterval(displayTimer, 1000);

    clearInterval(stopTimer);

function displayTimer() {
    $("#timer").text(counter);

    if (counter === 0) {
        $("#timer").text("-");
    } else {
        counter--;
    };
   
};