const newGame = document.querySelector('#newGame');
const input = document.querySelector('#input');
const submitBtn = document.querySelector('#submitBtn');
const prevGuesses = document.querySelector('.prevGuesses');
let remaining = document.querySelector('.remaining');
const alertmsg = document.querySelector('.alertmsg');

let randomNum = Math.floor(Math.random() * 100);
let prev = [];
let triesLeft = 10;
let playGame = true;

function startGame() {
    newGame.addEventListener("click", function() {
        newGame.classList.add("newGame");
        randomNum = Math.floor(Math.random() * 100);
        prev.length = 0;
        triesLeft = 10;
        playGame = true;
        input.value = '';
        alertmsg.innerHTML = '';
        remaining.innerHTML = '';
        input.value = '';
        submitBtn.disabled = false;
    });
}

if(playGame) {
    submitBtn.addEventListener("click", function(e) {
        console.log(input.value);
        console.log(randomNum);
        e.preventDefault();
        checkRange(input.value);
        checkTries();
        startGame();
    });
}

function checkRange(value) {
    if(isNaN(value)) {
        alertmsg.innerHTML = `<p>Input must be a number!</p>`;
        alertmsg.style.backgroundColor = 'orange';
    } else if(value < 1) {
        alertmsg.innerHTML = `<p>Number must be 1 or more!</p>`;
        alertmsg.style.backgroundColor = 'orange';
    } else if(value > 100) {
        alertmsg.innerHTML = `<p>Number must be less than 100!</p>`;
        alertmsg.style.backgroundColor = 'orange';
    } else {
        checkValues(value);
    }
}

function checkValues(value) {    
        if(value == randomNum) {
                alertmsg.innerHTML = `<p>You guessed it! The number was ${randomNum}!</p>`;
                alertmsg.style.backgroundColor = 'green';
                alertmsg.style.color = 'white';
        } else if(value < randomNum) {
                alertmsg.innerHTML = `<p>You need to aim higher!</p>`;
                alertmsg.style.backgroundColor = 'lightblue';
                alertmsg.style.color = 'black';
                prev.push(value);
                triesLeft--;
        } else if(value > randomNum) {
                alertmsg.innerHTML = `<p>You need to aim lower!</p>`;
                alertmsg.style.backgroundColor = 'lightblue';
                alertmsg.style.color = 'black';
                prev.push(value);
                triesLeft--;
        } 
        displayTries(prev);
    } 

function checkTries() {
    if(triesLeft === 0) {
        alertmsg.innerHTML = `<p>You lost!</p>`;
        alertmsg.style.backgroundColor = 'red';
        alertmsg.style.color = 'white';
        submitBtn.disabled = 'disabled';
        playGame = false;
    }
}

function displayTries(arr) {
    let getTries = arr.reduce((acc, item) => {
        return acc.concat(item + ", ");
    }, '');
    remaining.innerHTML = `Your guesses were: ${getTries}`;
}