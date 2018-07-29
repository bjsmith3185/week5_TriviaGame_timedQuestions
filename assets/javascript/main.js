
$(document).ready(function(){


var wweArray = [
    {
        image: "image 0",
        name: "name 0",
        choices: ["answer 0","answer 1", "answer 2", "name 0"],
    },
    {
        image: "image 1",
        name: "name 1",
        choices: ["answer 0","answer 1", "answer 2", "name 1"],
    },
    {
        image: "image 2",
        name: "name 2",
        choices: ["answer 0","answer 1", "answer 2", "name 2"],
    },
    {
        image: "image 3",
        name: "name 3",
        choices: ["answer 0","answer 1", "answer 2", "name 3"],
    },
    {
        image: "image 4",
        name: "name 4",
        choices: ["answer 0","answer 1", "answer 2", "name 4"],
    },
    {
        image: "image 5",
        name: "name 5",
        choices: ["answer 0","answer 1", "answer 2", "name 5"],
    },
];


var timesUp = true;
var index = 0;
var timerRunning;
var tempGameArray = [];
var selected;

// end of variables

$(".welcome").show();
$(".game").hide();
$(".transition").hide();
$(".correct-answer").hide();
$(".results").hide();







$(".start").on("click", function() {
    displayQuestion();
    $(".welcome").hide();
    $(".game").show();



});

$(".show-choices").on("click", ".name", function() {
    selected = $(this).attr("data-name");
    console.log("this is selected: " + selected);
    clearTimeout(timerRunning);
    checkname();
    timesUp = false;
    // $(".game").hide();
    // $(".correct-answer").show();
});

function checkname() {
    $(".game").hide();
    $(".correct-answer").show();


    var arrayLocation = wweArray[index];
    var objectForArray = new Object();

    objectForArray.image = arrayLocation.image;
    objectForArray.name = arrayLocation.name;
    tempGameArray.push(objectForArray);

    if (timesUp) {
        // if timesUp is true then the time ran out and they missed the question
        tempGameArray[index].username = "incorrect";
        $(".show-name").text(wweArray[index].name);
        console.log("this is under the timer, shows the correct: " + wweArray[index].name);

    } else {
       
        tempGameArray[index].username = selected;
       
        if ( tempGameArray[index].username === tempGameArray[index].name) {
            console.log("you are correct");
            $(".show-name").text("correct");
        } else {
           console.log("you are incorrect");
           $(".show-name").text(wweArray[index].name);
           
        };
    };

    index++;
    timesUp = true;

    if ( index === wweArray.length) {
        gradeQuiz();
        // $(".results-screen").show();
    } else {
        displayCorrect();
        // transition()
        // setTimeout(displayQuestion, 1000)  this was in the original
        setTimeout(transition, 2000);

       
    };
};


function displayCorrect() {
    $(".game").hide();
    $(".correct-answer").show();
    
    $(".show-image-again").text(wweArray[index-1].image);
}


function transition() {
   
    $(".transition").show();
    $(".correct-answer").hide();
    $(".background-color").text("Are you ready?");
    setTimeout(displayQuestion, 1000)

};

function displayQuestion() {

    $(".transition").hide();
    $(".game").show();

    // shows the question in the dom

    var randomAnswersArray = [];
    $(".show-name").empty();
    $(".show-image").empty();
    $(".show-choices").empty();
    // $(".show-image").html("<img src='" + wweArray[index].image + "'>").addClass("");
    $(".show-image").text(wweArray[index].image)
    console.log("this is the name: " + wweArray[index].name);


    // shuffles the answers array and displays in the dom 

    for (var i = 0; i < 4; i++) {
        randomAnswersArray.push(wweArray[i].choices[i]);
    };
    console.log("this is randomnameArray:");
    console.log(randomAnswersArray);
    randomAnswersArray.sort(function (a, b) { return 0.5 - Math.random() });
    console.log("this is randomnameArray after sorting:")
    console.log(randomAnswersArray);

    for (var i = 0; i <randomAnswersArray.length; i++) {
        // console.log(wweArray[i].choices[i]);
        var newDiv = $("<div>");
        newDiv.text(randomAnswersArray[i]).addClass("name").attr("data-name", randomAnswersArray[i]);
        $(".show-choices").append(newDiv);
        // $(".show-choices").append(randomAnswersArray[i]);
     };


    timerRunning = setTimeout(checkname, 2 * 3000);

};

function gradeQuiz() {
    $(".transition").hide();
    $(".correct-answer").hide();
    $(".results").show();

    var correct = 0;
    var incorrect = 0;

    for (var i = 0; i < tempGameArray.length; i ++ ) {
        if ( tempGameArray[i].name === tempGameArray[i].username) {
            correct++;
        } else {
            incorrect++;
        };

    }

    if (correct === 0) {
        // display something saying grade = 0;
        alert('Hi')
        $(".grade").text("your grade is 0%, maybe try harder?");

    } else {
        var grade = (incorrect/tempGameArray.length) * 100;

        $(".grade").text("your grade is: " + grade);
        $(".correct").text("You got " + correct + " correct!");
        $(".incorrect").text("You missed " + incorrect + ".");
        
        };
       

    
};

}); // end of document ready
//---------------------------------------------------------------------------
