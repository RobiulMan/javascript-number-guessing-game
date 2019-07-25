/* 
GAME FUNCTION:
-Player must guess a number betwiin a min and max
-Player gets a certain amount fo guesses
-Notify the player of the correct answer if loose
-let player choose to play again

*/

//Game Values
let min = 1,
    max = 10,
    winningNum = getRandomeNum(min,max);
    guessesLeft = 3;

//UI Element
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

//asing ui min and max
minNum.textContent = min;
maxNum.textContent = max;

//Play again event listener
game.addEventListener('mousedown',function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});


//Listen fot guess
guessBtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);
    
    if(isNaN(guess) || guess < min || guess> max){
        setMassage(`Please enter a number between ${min} and ${max}`,'red');
    }


    //check if won 
    if(guess === winningNum){
        //game over - won

        gameOver(true,`${winningNum} is correct, YOU WIN`)

    }else{
        //wrong number
        guessesLeft -=1;

        if(guessesLeft ===0){
            //game over - lost

            gameOver(false, `Game Over, You lost The correct number was ${winningNum}`)

        }else{
            //game continues - answer wrong

             // change border color
             guessInput.style.borderColor = 'red';

             //clear Input
             guessInput.value = '';

             //tell user it's wrong number
            setMassage(`${guess} is not correct, ${guessesLeft} guesses left`,'red');
        }
    }
});


//Game Over
function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

    //Disable input
    guessInput.disable = true;
    // change border color
    guessInput.style.borderColor = color;
    //set text color 
    message.style.color = color;
    //set message
    setMassage(msg);

    //Play Again?
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';

}

//get winning number
function getRandomeNum(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
//set message
function setMassage(msg, color){
    message.style.color = color;
    message.textContent= msg;

}