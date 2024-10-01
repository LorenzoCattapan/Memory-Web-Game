$(document).ready(function() {
    var buttonColours = ["red", "blue", "green", "yellow"];

    var gamePattern = [];
    var userClickedPattern = [];

    var started = false;
    var level = 0;


    $(document).on("keypress",function(){
        if(!started){
            $("h1").text("Level " + level);
            nextSequence();
            started = true;
        }
    })

    $(".btn").on("click", function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(userClickedPattern.length-1);
    });
    
    function nextSequence(){
        userClickedPattern = [];
        level++;
        $("h1").text("Level " + level);

        var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
        gamePattern.push(randomChosenColour);

        animatePress(randomChosenColour);
        playSound(randomChosenColour);
    }

    function animatePress(currentColour){
        $("#" + currentColour).addClass("pressed");
        setTimeout(() => {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    }

    function playSound(name){
        let sound = new Audio("./sounds/" + name + ".mp3");
        sound.play();
    }

    function checkAnswer(currentLevel){
        
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(() => {
                    nextSequence();
                },1000);
            }
        }else{
            playSound("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press any Key to Restart");

            setTimeout(() =>{
                $("body").removeClass("game-over");
            },200);

            startOver(); 
        }

    }

    function startOver(){
        gamePattern = [];
        started = false;
        level = 0;
    }

});
