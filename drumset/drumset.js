// Loop thorugh all items with the selector(in this case class) .drum
for(var i = 0; i < document.querySelectorAll(".drum").length; i++)
{
    // Add an event listener to all items with the selector button that also have a class of .drum
    // The event listener will listen for a mouse click and call an anonymous function which gets the
    // the innerHtml and passes it to the playSound function
    document.querySelectorAll("button.drum")[i].addEventListener("click", function(){
        var buttonInnerHtml = this.innerHTML;
        playSound(buttonInnerHtml);
        playAnimation(buttonInnerHtml);
    });
}

// Add an event listener to the entire document
// The event listener will listen for keyboard input and call an anonymous function that passes the value
// of the key pressed to the playSound function
document.addEventListener("keydown", function(event){
    playSound(event.key);
    playAnimation(event.key);
});

function playSound(key){
    var audio;

    // Set audio to a different drum sound based on the button that was clicked or key pressed
    switch (key) {
        case "w":
            audio = new Audio("sounds/snare.mp3");
            break;
        case "a":
            audio = new Audio("sounds/tom-1.mp3");
            break;
        case "s":
            audio = new Audio("sounds/tom-2.mp3");
            break;
        case "d":
            audio = new Audio("sounds/tom-3.mp3");
            break;
        case "j":
            audio = new Audio("sounds/tom-4.mp3");
            break;
        case "k":
            audio = new Audio("sounds/kick-bass.mp3");
            break;
        case "l":
            audio = new Audio("sounds/crash.mp3");
            break;
        default:
            console.log(key);
            break;
    }
    audio.play();
}

function playAnimation(currentKey){
    var activeButton = document.querySelector("." + currentKey);

    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 100);
}