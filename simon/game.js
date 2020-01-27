var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

// Check for keydown
$(document).keydown(function(e){
    // If it's the first key press call nextSequence()
    if(started === false)
    {        
        nextSequence();

        started = true;
    }
});

// Check if a button is pressed
$(".btn").click(function() {
    // Set userChosenColor to the id of the button that was pressed
    var userChosenColor = $(this).attr("id");
  
    // Add userChosenColor to userClickedPattern array
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);
    playAudio(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence(){
    // Create a random number between 0 and 4
    var randomNumber = Math.floor((Math.random() * 4));
    // Use the random number to set randomChosenColor to a random color from buttonColors
    var randomChosenColor = buttonColors[randomNumber];
    
    // Clear userClickedPattern
    userClickedPattern = [];

    // Add randomChosenColor to gamePattern array
    gamePattern.push(randomChosenColor);
    
    level += 1;

    // If the level is greater that 0 change the text of the level-title id to "Level " + level
    if(level > 0)
    {
        $("#level-title").text("Level " + level);
    }

    $("#" + randomChosenColor).fadeOut(250).fadeIn(250);
    playAudio(randomChosenColor);
}

function playAudio(fileName){
    var audio = new Audio("sounds/" + fileName + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    // Add pressed class to the button the user presses
    $("#" + currentColor).addClass("pressed");

    // Remove the pressed class after a delay
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    // If the current index of userClickedPattern = the current index of gamePattern
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        // If the length of userClickedPattern = the length of gamePattern
        if(userClickedPattern.length === gamePattern.length){
            // Call nextSequence after delay
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
        console.log("woohoo");
    }
    else{
        // Add the game-over class to the body
        $("body").addClass("game-over");
        // Remove the game-over class from the body after delay
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        playAudio("wrong");

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}