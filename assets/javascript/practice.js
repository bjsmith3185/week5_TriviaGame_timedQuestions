
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
            transition: "assets/images/transitions/chris_smile.gif",
        },
        {
            image: "assets/images/booker.png",
            name: "Booker T",
            choices: ["Daniel Bryan","Kane", "Undertaker", "Booker T"],
            transition: "assets/images/transitions/christian_Slap.gif",
        },
        {
            image: "assets/images/hhh.png",
            name: "HHH",
            choices: ["Kurt Angle","Brock Lesnar", "Big Show", "HHH"],
            transition: "assets/images/transitions/double_slam.gif",
        },
        {
            image: "assets/images/irs.jpg",
            name: "IRS",
            choices: ["Kane","The Miz", "Shawn Michaels", "IRS"],
            transition: "assets/images/transitions/hhh_dx.gif",
        },
        {
            image: "assets/images/matt.jpg",
            name: "Matt Hardy",
            choices: ["Undertaker","Daniel Bryan", "Jeff Hardy", "Matt Hardy"],
            transition: "assets/images/transitions/irs.gif",
        },
        {
            image: "assets/images/randy.jpg",
            name: "Randy Orton",
            choices: ["Shawn Michaels","Big Show", "Dolph Ziggler", "Randy Orton"],
            transition: "assets/images/transitions/people_eyebrow.gif",
        },
        {
            image: "assets/images/ric.jpg",
            name: "Ric Flair",
            choices: ["Jeff Hardy","Undertaker", "John Cena", "Ric Flair"],
            transition: "assets/images/transitions/steve_austin.gif",
        },
        {
            image: "assets/images/rock.jpg",
            name: "The Rock",
            choices: ["Big Show","Kurt Angle", "John Cena", "The Rock"],
            transition: "assets/images/transitions/hhh_pedigree.gif",
        },
        {
            image: "assets/images/sheamus.jpg",
            name: "Sheamus",
            choices: ["Kane","Brock Lesnar", "Shawn Michaels", "Sheamus"],
            transition: "assets/images/transitions/Scoop_Slam.gif",
        },
        {
            image: "assets/images/steve.jpg",
            name: "Steve Austin",
            choices: ["Undertaker","John Cena", "AJ Styles", "Steve Austin"],
            transition: "assets/images/transitions/rock_bring_it.gif",
        },
    ];
    
    var timesUp = true;
    var index = 0;
    var timerRunning;
    var tempGameArray = [];
    var selected;
    var endOfGame = false;
    
    // end of variables
    
    $(".welcome").show();
    $(".game").hide();
    $(".transition").hide();
    $(".correct-answer").hide();
    $(".results").hide();
    $("#picture").attr("src", wweArray[0].image)
    
    // welcome start button 
    
    $(".start").on("click", function() {
        displayQuestion();
        $(".welcome").hide();
        $(".game").show();
    });
    
    // select answer button 
    
    $(".show-choices").on("click", ".name", function() {
        selected = $(this).attr("data-name");
        timesUp = false;
        clearTimeout(timerRunning);
        checkname();
    });

    function progressBar() {
  
       var value = Math.round(((index+1)/wweArray.length)*100);
     
       console.log(wweArray.length);
       console.log("this is value: " + value);
      

    
        $(".progress-bar").attr("style", "width:"+value+"%").text(value+"%");
    };
    
    function checkname() {
        $(".game").hide();
        $(".correct-answer").show();

        progressBar();
    
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
    
            if ( tempGameArray[index].username === tempGameArray[index].name) {
                $(".correct-title").text("Correct!!");
                $(".show-name").text(wweArray[index].name);
            } else {
               $(".correct-title").text("Wrong..");
               $(".show-name").text(wweArray[index].name);
            };
        };
    
        if ( (index + 1) === wweArray.length) {
            endOfGame = true;
            $(".correct-answer").show();
            $(".show-image-again").attr("src", wweArray[index].image);
        } else {
            $(".game").hide();
            $(".correct-answer").show();
            $(".show-image-again").attr("src", wweArray[index].image);
        };
    
        if (endOfGame) {
            setTimeout(gradeQuiz, 3000);
        } else {
            setTimeout(transition, 3000);
        };
    
        index++;
        timesUp = true;
    };
    
    function transition() {
        $(".transition").show();
        $(".correct-answer").hide();
        $(".transition-title").text("Are you ready bro?");
        $(".transition-image").attr("src", wweArray[index-1].transition );
        setTimeout(displayQuestion, 2000)
    
    };
    
    function displayQuestion() {
    
        $(".transition").hide();
        $(".game").show();
    
        var randomAnswersArray = [];
        $(".show-name").empty();
        $(".show-image").empty();
        $(".show-choices").empty();
        $(".show-image").attr("src", wweArray[index].image)
        console.log("this is the answer: " + wweArray[index].name);
    
        // shuffles the answers array and displays in the dom 
        for (var i = 0; i < 4; i++) {
            randomAnswersArray.push(wweArray[index].choices[i]);
        };
    
        randomAnswersArray.sort(function (a, b) { return 0.5 - Math.random() });
    
        for (var i = 0; i <randomAnswersArray.length; i++) {
            var newDiv = $("<div>");
            newDiv.text(randomAnswersArray[i]).addClass("name").attr("data-name", randomAnswersArray[i]);
            $(".show-choices").append(newDiv);
        };
    
        timerRunning = setTimeout(checkname, 2 * 5000);
    };
    
    function gradeQuiz() {
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
        };
   
        if (correct === 0) {
            $(".grade").text("You scored 0%, Maybe try harder?").addClass("loser");
        } else if (correct === tempGameArray.length) {
            $(".grade").text("You got em all right!");
        } else if (incorrect >= 1) {
            var grade = Math.round((correct/tempGameArray.length) * 100);
    
            $(".grade").text("You Scored " + grade +"%");
            $(".correct").text("Correct ......" + correct);
            $(".incorrect").text("Incorrect ......" +incorrect);
        };
    };


    $(".reset-button").on("click", function() {
        timesUp = true;
        index = 0;
        tempGameArray = [];
        selected;
        endOfGame = false;
        correct = 0;
        incorrect = 0;
        $(".correct").empty();
        $(".incorrect").empty();
        $(".welcome").show();
        $(".results").hide();

    })

    
    }); // end of document ready
    
   
