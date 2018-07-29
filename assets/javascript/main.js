
$(document).ready(function(){






var wweArray = [
    {
        image: "assets/images/chris.jpg",
        name: "Chris Jericho",
        choices: ["AJ Styles","Undertaker", "Daniel Bryan", "Chris Jericho"],
        transition: "assets/images/transitions/ladder_transition.gif",
    },
    {
        image: "assets/images/edge.jpg",
        name: "Edge ",
        choices: ["Mick Foley","Vince McMahon", "Jeff Hardy", "Edge "],
    },
    {
        image: "assets/images/booker.png",
        name: "Booker T",
        choices: ["Daniel Bryan","Kane", "Undertaker", "Booker T"],
    },
    {
        image: "assets/images/hhh.png",
        name: "HHH",
        choices: ["Kurt Angle","Brock Lesnar", "Big Show", "HHH"],
    },
    {
        image: "assets/images/irs.jpg",
        name: "IRS",
        choices: ["Kane","The Miz", "Shawn Michaels", "IRS"],
    },
    {
        image: "assets/images/matt.jpg",
        name: "Matt Hardy",
        choices: ["Undertaker","Daniel Bryan", "Jeff Hardy", "Matt Hardy"],
    },
    {
        image: "assets/images/randy.jpg",
        name: "Randy Orton",
        choices: ["Shawn Michaels","Big Show", "Dolph Ziggler", "Randy Orton"],
    },
    {
        image: "assets/images/ric.jpg",
        name: "Ric Flair",
        choices: ["Jeff Hardy","Undertaker", "John Cena", "Ric Flair"],
    },
    {
        image: "assets/images/rock.jpg",
        name: "The Rock",
        choices: ["Big Show","Kurt Angle", "John Cena", "The Rock"],
    },
    {
        image: "assets/images/sheamus.jpg",
        name: "Sheamus",
        choices: ["Kane","Brock Lesnar", "Shawn Michaels", "Sheamus"],
    },
    {
        image: "assets/images/steve.jpg",
        name: "Steve Austin",
        choices: ["Undertaker","John Cena", "AJ Styles", "Steve Austin"],
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
$("#picture").attr("src", wweArray[0].image)







$(".start").on("click", function() {
    displayQuestion();
    $(".welcome").hide();
    $(".game").show();



});

$(".show-choices").on("click", ".name", function() {
    selected = $(this).attr("data-name");
    console.log("this is selected: " + selected);
    timesUp = false;
    
    clearTimeout(timerRunning);
    checkname();
   
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
        $(".correct-title").text("Wrong..");

    } else {
       
        tempGameArray[index].username = selected;

        console.log("selected: " + tempGameArray[index].username + "  correct: " +  tempGameArray[index].name);
       
        if ( tempGameArray[index].username === tempGameArray[index].name) {
            console.log("you are correct");
            $(".correct-title").text("Correct!!");
            $(".show-name").text(wweArray[index].name);
        } else {
           console.log("you are incorrect");
           console.log(timesUp);
           $(".correct-title").text("Wrong..");
           $(".show-name").text(wweArray[index].name);
           
        };
    };

    // index++;
    // timesUp = true;

    if ( index === wweArray.length) {
        gradeQuiz();
        // $(".results-screen").show();
    } else {
        // displayCorrect();
        $(".game").hide();
        $(".correct-answer").show();
        
        $(".show-image-again").attr("src", wweArray[index].image);

       //--------------------------
        setTimeout(transition, 3000);

       
    };

    index++;
    timesUp = true;
};


function displayCorrect() {
    $(".game").hide();
    $(".correct-answer").show();
    
    $(".show-image-again").text(wweArray[index-1].image);
}


function transition() {
   
    $(".transition").show();
    $(".correct-answer").hide();
    $(".transition-title").text("Are you ready bro?");
    $(".transition-image").attr("src", wweArray[0].transition );
    setTimeout(displayQuestion, 1900)

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
    $(".show-image").attr("src", wweArray[index].image)
    // console.log("this is the name: " + wweArray[index].name);


    // shuffles the answers array and displays in the dom 

    for (var i = 0; i < 4; i++) {
        randomAnswersArray.push(wweArray[index].choices[i]);
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


    timerRunning = setTimeout(checkname, 2 * 5000);

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
