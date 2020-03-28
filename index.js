
// cleaner structure

//these images are system files and should be immutable. The `const` type will allow us to trust this never changes.
// remember array starts at [0] so a random number 0-5 will correspond here perfectly
const diceImages = ["dice1.svg","dice2.svg", "dice3.svg","dice4.svg","dice5.svg", "dice6.svg"];
const audio = ['sounds/tada.mp3','sounds/cheer.mp3'];
const sentiments = ['Good Luck!','AHHHH!','SHOW ME THE MONEY!','BIG MONEY, BIG MONEY!'];
// 6X more likely to roll a 1 (0) than a 6 (5).
const weightedOdds = [0,0,0,0,0,0,1,1,1,1,1,2,2,2,2,3,3,3,4,4,5]; // you could have 3 individual weighted odds arrays for 1 coin bet - 3 coin bet;

function slotRun(){

  var animate = true; // start animation 
  var rolls = rollWeightedDice(3); // this will return a rolls[] array with as many rolls as you ask for


  // if something goes wrong in the rollDice() function it will return NULL. catch this error here. 
  if (rolls === null){
    console.log("Error! Rolls has to be a positive Integer!");
    return; // stop running this function because we have no rolls. UI will feel like it did "nothing". 
  }else{
    document.querySelector("#replay").setAttribute("disabled", true); // disable spin button to prevent double spin.
  }

  // set animation loop -- every 125 miliseconds it will check to see if the `animate` var is true.
  // if animate is TRUE -> keep rolling.
    setInterval(function(){ 
      if (animate){

       var diceFrame = rollDice(3); //get a frame to animate

       document.querySelector("#img1").setAttribute("src", "images/"+diceImages[diceFrame[0]]);
       document.querySelector("#img2").setAttribute("src", "images/"+diceImages[diceFrame[1]]);
       document.querySelector("#img3").setAttribute("src", "images/"+diceImages[diceFrame[2]]);
      
      }
    }, 125); // 125 milliseconds each frame approx 10FPS

    // set "Good Luck!"
    // todo: create an array with some phrases and randomly select one!
    document.querySelector("#win").innerHTML = sentiments[Math.floor( Math.random() * sentiments.length )];
  
  //display results
  setTimeout(function(){
    
    animate = false; // stops animation loop 
    
    //todo: use IDs here. 
    document.querySelector("#img1").setAttribute("src", "images/"+diceImages[rolls[0]]);
    document.querySelector("#img2").setAttribute("src", "images/"+diceImages[rolls[1]]);
    document.querySelector("#img3").setAttribute("src", "images/"+diceImages[rolls[2]]);
    document.querySelector("#replay").innerHTML = "Play Again"

    if ( rolls[0]===rolls[1] && rolls[0] === rolls[2] ){
      document.querySelector("#win-sound").setAttribute("src", audio[Math.floor( Math.random() * audio.length )]); // randomly select between mp3s
      document.querySelector("#win-sound").play();// play the sound
      document.querySelector("#win").innerHTML = "You Win! "  + (rolls[0]+1)*3   + " coins"; //add 1 to roll number to reprosent its real value before multiplying
    }
    else{
      document.querySelector("#win").innerHTML = "Please play again!";
    }
    
    document.querySelector("#replay").removeAttribute("disabled"); //enable spin button

  }, 3000); // <-- this number is the milliseconds to wait before executing the code in the block. in this instance our animation would play for 3 seconds. 

  
}

//roll dice function.
function rollDice(n) {
  
  // if n is less than 1 or NaN... return NULL.
  if (!parseInt(n) || n < 1){
    console.log('INVALID INPUT');
    return null;
  }
  
  // else keep going
  var i = 1;
  var rolls = [];
  //give me as many rolls as asked for. 
  while (i <= n) {
    // get me a number between 0 - 5 <-- this is still 6 numbers, but includes 0. makes finding the array position easier. 
    var diceRoll = Math.floor( Math.random() * 6 );
    rolls.push(diceRoll);
    i++;
  }
  return rolls;

}

//weighted odds. more like slot machine
function rollWeightedDice(n) {
  
  // if n is less than 1 or NaN... return NULL.
  if (!parseInt(n) || n < 1){
    console.log('INVALID INPUT');
    return null;
  }
  
  // else keep going
  var i = 1;
  var rolls = [];
  //give me as many rolls as asked for. 
  while (i <= n) {
    //randomly select 1 integer from the set of numbers inside weightedOdds -- you control the ratios here. 
    var diceRoll = weightedOdds[Math.floor( Math.random() * weightedOdds.length )]; //instead of hard coding the array length just ask for it. this way your array can change and you dont have to recode this block. 
    rolls.push(diceRoll);
    i++;
  }
  return rolls;

}

/*

Redundant Code.

// this is considered a brute force attempt at solving the problem.
// Coding for every possibility, sometimes this is the only way.
// But more often than not, its not the most effiecent.
// also, this is where bugs will live.. complicated if/else = bugs. 



//anything you feel like you are doing twice... automate. separate into its own function. 
var randomNumber1 = Math.ceil(Math.random()*100); //random 1-6
var randomNumber2 = Math.ceil(Math.random()*100); // random 1-6
var randomNumber3 = Math.ceil(Math.random()*100); // random 1-6

var randomDiceImage
var randomDiceImage2
var randomDiceImage3

if (randomNumber1 <= 40){
  randomDiceImage = "dice1.png";
  randomNumber1 = 1;
}
else if (randomNumber1 <= 60){
  randomDiceImage = "dice2.png";
  randomNumber1 = 2;
}
else if (randomNumber1 <=75){
  randomDiceImage = "dice3.png";
  randomNumber1 = 3;
}
else if (randomNumber1 <= 83){
  randomDiceImage = "dice4.png";
  randomNumber1 = 4;
}
else if (randomNumber1<=94){
  randomDiceImage = "dice5.png";
  randomNumber1 = 5;
}
else{
  randomDiceImage = "dice6.png";
  randomNumber1 = 6;
}


if (randomNumber2 <= 40){
  randomDiceImage2 = "dice1.png";
  randomNumber2 = 1;
}
else if (randomNumber2 <= 60){
  randomDiceImage2 = "dice2.png";
  randomNumber2 = 2;
}
else if (randomNumber2 <=75){
  randomDiceImage2 = "dice3.png";
  randomNumber2 = 3;
}
else if (randomNumber2 <= 83){
  randomDiceImage2 = "dice4.png";
  randomNumber2 = 4;
}
else if (randomNumber2<=94){
  randomDiceImage2 = "dice5.png";
  randomNumber2 = 5;
}
else{
  randomDiceImage2 = "dice6.png";
  randomNumber2 = 6;
}


if (randomNumber3 <= 40){
  randomDiceImage3 = "dice1.png";
  randomNumber3 = 1;
}
else if (randomNumber3 <= 60){
  randomDiceImage3 = "dice2.png";
  randomNumber3 = 2;
}
else if (randomNumber3 <=75){
  randomDiceImage3 = "dice3.png";
  randomNumber3 = 3;
}
else if (randomNumber3 <= 83){
  randomDiceImage3 = "dice4.png";
  randomNumber3 = 4;
}
else if (randomNumber3<=94){
  randomDiceImage3 = "dice5.png";
  randomNumber3 = 5;
}
else{
  randomDiceImage3 = "dice6.png";
  randomNumber3 = 6;
}
*/
