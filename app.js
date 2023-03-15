var gameColor = ['red', 'blue', 'green', 'yellow']

var gamePattern = []

var userClickedPattern = []

var startKeyPress = false

var level = 0

$(document).keypress(function(event){
    if(startKeyPress == false)
    {
        $("#level-title").html("Level " + level)
        nextSequence()
        startKeyPress = true
    }
})

function nextSequence()
{

    level++ ;

    $("#level-title").html("Level " + level)

    var random = Math.random()*4

    var randomNumber = Math.floor(random)

    var randomChosenColor = gameColor[randomNumber]

    gamePattern.push(randomChosenColor)

    $("."+randomChosenColor).fadeOut(100).fadeIn(100)

    animatePress(randomChosenColor)

    makeSound(randomChosenColor)

}

$(".btn").click(function(){
    var userColor = $(this).attr("id")

    userClickedPattern.push(userColor)

    animatePress(userColor)

    makeSound(userColor)

    checkAnswer(userClickedPattern.length-1)
})

function checkAnswer(currentLevel)
{
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        console.log("Success");

        if(userClickedPattern.length == gamePattern.length)
        {
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }
    else
    {
        new Audio("/sounds/wrong.mp3").play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200)

        $("#level-title").html("Game over. Press any key to restart")

        startover()
    }
}

function startover()
{
    level = 0
    gamePattern = []
    userClickedPattern = []
    startKeyPress = false
}

function animatePress(currentColor)
{
    $("." + currentColor).addClass("pressed")

    setTimeout(function() {
        $("." + currentColor).removeClass("pressed")
    }, 100);
}

function makeSound(key)
{
    var audio = new Audio("/sounds/" + key + ".mp3")

    audio.play()
}