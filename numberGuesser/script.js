let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

// Write your code below:

//Generate the Target - random number between 0 and 9
const generateTarget = () => Math.floor(Math.random() * 10);

//Distance from the computer/human guess to the target
const getAbsoluteDistance = (target, guess) => Math.abs(target - guess);

//Compare guesses of user and computer with the target
const compareGuesses = (humanGuess, computerGuess, targetGuess) => {
  if (humanGuess < 0 || humanGuess > 9) {
    window.alert(`Your number should be between 0 and 9!`);
  }

  const humanDifference = getAbsoluteDistance(targetGuess, humanGuess);
  const computerDifference = getAbsoluteDistance(targetGuess, computerGuess);
  return humanDifference <= computerDifference;
};

//Increase the score of the winner
const updateScore = (winner) => {
  if (winner === 'human') {
    humanScore++;
  }
  if (winner === 'computer') {
    computerScore++;
  }
};
//console.log(updateScore('human'));
//console.log(humanScore);
//console.log(updateScore('computer'));
//console.log(computerScore);

//Update the round number after each round
const advanceRound = () => currentRoundNumber++;
