// pattern generation and tracking
const bottonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
// start of game
let started = false;
// current level
let level = 0;
// current index of player´s answer
let answerIndex = 0;

// play button sound
const playSound = (name) => {
  new Audio(`./sounds/${name}.mp3`).play();
};

// animate pressed button
const animatePress = (currentColour) => {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(() => {
    $(`#${currentColour}`).removeClass("pressed");
  }, 100);
};

// give the next step in the sequence
const nextSequence = () => {
  // choose a new colour and add it to the sequence
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = bottonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  // animate the next step in the sequence
  $(`#${randomChosenColour}`).fadeOut(100);
  $(`#${randomChosenColour}`).fadeIn(100);
  playSound(randomChosenColour);
  // show current level after each new sequence
  level += 1;
  $("#level-title").text(`Level ${level}`);
};

// check user answer
const checkAnswer = () => {
  // compare last button clicked with pattern in the current index
  if(userClickedPattern[userClickedPattern.length-1] === gamePattern[answerIndex]) {
    answerIndex += 1;
    return true;
  }
  return false;
};

// check if pattern has been completed
const checkPatternCompletion = () => {
  // true if all the array has been traversed
  if(level === answerIndex) {
    // successful completion sets up variables for next level
    userClickedPattern.length = 0;
    answerIndex = 0;
    setTimeout(() => {
      nextSequence();
    }, 1000);
  }
};

// set up variables to restart game
const restartGame = () => {
  started = false;
  level = 0;
  gamePattern.length = 0;
  userClickedPattern.length = 0;
  answerIndex = 0;
};

// click-button event handling
$(".btn").on("click", function() {
  if(started) {
    const userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    if(checkAnswer()) {
      playSound(userChosenColour);
      animatePress(userChosenColour);
      checkPatternCompletion();
    }
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      }, 200);
      restartGame();
      $("#level-title").text(`Game Over, Press Any Key To Restart`);
    }
  }
});

// start-game event handling, is done once per game
$(document).on("keypress", function() {
  if(!started) {
    nextSequence();
    started = true;
  }
});
