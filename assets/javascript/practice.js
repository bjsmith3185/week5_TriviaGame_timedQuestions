

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

var namesArray = [
    "name 0",
    "name 1",
    "name 2",
    "name 3",
    "name 4",
    "name 5",
    "name 6",
    "name 7",
    "name 8",
    "name 9",
];




var timesUp = true;
var index = 0;
var timerRunning;
var tempGameArray = [];
var selected;


$(".start").on("click", function() {
    displayQuestion();
});

$(".name").on("click", function() {
    selected = $(this).val();
    clearTimeout(timerRunning);
    checkname();
    timesUp = false;
});

function checkname() {
    var arrayLocation = wweArray[index];
    var objectForArray = new Object();

    objectForArray.image = arrayLocation.image;
    objectForArray.name = arrayLocation.name;
    tempGameArray.push(objectForArray);

    if (timesUp) {
        // if timesUp is true then the time ran out and they missed the question
        tempGameArray[index].username = "unnameed";
        $(".show-name").text(wweArray[index].name);

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

        transitionScreen()
        setTimeout(displayQuestion, 1000)

    };
};


function transitionScreen() {
    $(".transition").text("Are you ready?");

};

function displayQuestion() {
    var randomnamesArray = [];
    $(".show-name").empty();
    // $(".show-image").html("<img src='" + wweArray[index].image + "'>").addClass("");
    $(".show-image").text(wweArray[index].image)
    console.log("this is the name: " + wweArray[index].name);

    namesWithoutCorrect();

    function namesWithoutCorrect() {
        randomnamesArray = [];
        // var x = inputArray[i];
        
        do {
            randomnamesArray[randomnamesArray.length] = namesArray.splice(Math.floor(Math.random() * namesArray.length), 1)[0];
            } while (randomnamesArray.length < 3);
      
            for (var j = 0; j < randomnamesArray.length; j++) {
            if (wweArray[index].name === randomnamesArray[j]) {   
                console.log("in there twice");
                randomnamesArray = [];
            };
        };

        // console.log("this is randomnameArray below")
        // console.log(randomnamesArray);
    };

    if (randomnamesArray.length === 0) {
        namesWithoutCorrect();
        // // console.log("it is 0")
        // randomnamesArray.push(x.correctname);
        // randomnamesArray.sort(function (a, b) { return 0.5 - Math.random() });
    } else {
        randomnamesArray.push(wweArray[index].name);  //
        randomnamesArray.sort(function (a, b) { return 0.5 - Math.random() });
        console.log("this is randomnameArray before showing:")
        console.log(randomnamesArray);
    };


    for (var i = 0; i < 4; i++) {
        var newDiv = $("<div>");
        newDiv.text(randomnamesArray[i]);
        $(".show-choices").append(newDiv);
        // $(".show-choices").append(randomnamesArray[i]);
     };
    $



    timerRunning = setTimeout(checkname, 2 * 1000);

};

function gradeQuiz() {
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


//---------------------------------------------------------------------------
