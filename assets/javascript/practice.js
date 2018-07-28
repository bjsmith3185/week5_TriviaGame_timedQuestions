

var wweArray = [
    {
        image: "image 0",
        name: "name 0",
    },
    {
        image: "image 1",
        name: "name 1",
    },
    {
        image: "image 2",
        name: "name 2",
    },
    {
        image: "image 3",
        name: "name 3",
    },
    {
        image: "image 4",
        name: "name 4",
    },
    {
        image: "image 5",
        name: "name 5",
    },
];

var answersArray = [
    "answer 0",
    "answer 1",
    "answer 2",
    "answer 3",
    "answer 4",
    "answer 5",
    "answer 6",
    "answer 7",
    "answer 8",
    "answer 9",
];




var timesUp = true;
var index = 0;
var timerRunning;
var tempGameArray = [];
var selected;


$(".start").on("click", function() {
    displayQuestion();
});

$(".answer").on("click", function() {
    selected = $(this).val();
    clearTimeout(timerRunning);
    checkAnswer();
    timesUp = false;
});

function checkAnswer() {
    var arrayLocation = wweArray[index];
    var objectForArray = new Object();

    objectForArray.image = arrayLocation.image;
    objectForArray.name = arrayLocation.name;
    tempGameArray.push(objectForArray);

    if (timesUp) {
        // if timesUp is true then the time ran out and they missed the question
        tempGameArray[index].userAnswer = "unanswered";
        $(".show-name").text(wweArray[index].name);

    } else {
       
        tempGameArray[index].userAnswer = selected;
       
        if ( tempGameArray[index].userAnswer === tempGameArray[index].name) {
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

        transitionScreen()
        setTimeout(displayQuestion, 3000)

    };
};


function transitionScreen() {
    $(".transition").text("Are you ready?");

};

function displayQuestion() {
    var randomAnswersArray = [];
    $(".show-name").empty();
    // $(".show-image").html("<img src='" + wweArray[index].image + "'>").addClass("");
    $(".show-image").text(wweArray[index].image)
    console.log("this is the answer: " + wweArray[index].name);

    answersWithoutCorrect(index, answersArray);

    function answersWithoutCorrect(i, inputArray) {
        // randomAnswersArray = [];
        // var x = inputArray[i];
        
        do {
            randomAnswersArray[randomAnswersArray.length] = answersArray.splice(Math.floor(Math.random() * answersArray.length), 1)[0];
            } while (randomAnswersArray.length < 3);
      
            for (var j = 0; j < randomAnswersArray.length; j++) {
            if (wweArray[index].name === randomAnswersArray[j]) {   
                console.log("in there twice");
                randomAnswersArray = [];
            };
        };

        // console.log("this is randomAnswerArray below")
        // console.log(randomAnswersArray);
    };

    if (randomAnswersArray.length === 0) {
        answersWithoutCorrect(index, answersArray);
        // // console.log("it is 0")
        // randomAnswersArray.push(x.correctAnswer);
        // randomAnswersArray.sort(function (a, b) { return 0.5 - Math.random() });
    } else {
        randomAnswersArray.push(wweArray[index].name);  //
        randomAnswersArray.sort(function (a, b) { return 0.5 - Math.random() });
        console.log("this is randomAnswerArray before showing:")
        console.log(randomAnswersArray);
    };


    for (var i = 0; i < 4; i++) {
        $(".show-choices").append(randomAnswersArray[i]);
     };
    $



    timerRunning = setTimeout(checkAnswer, 5 * 1000);

};

function gradeQuiz() {
    var correct = 0;
    var incorrect = 0;

    for (var i = 0; i < tempGameArray.length; i ++ ) {
        if ( tempGameArray[i].name === tempGameArray[i].userAnswer) {
            correct++;
        } else {
            incorrect++;
        };

    var grade = (incorrect/tempGameArray.length) * 100;

    $(".grade").text("your grade is: " + grade);
    $(".correct").text("You got " + correct + " correct!");
    $(".incorrect").text("You missed " + incorrect + ".");
   
    };
};


//---------------------------------------------------------------------------
