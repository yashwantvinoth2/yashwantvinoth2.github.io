function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

document.getElementById('numOfDigitsSlider').addEventListener('input', () => {
    if (document.getElementById("numOfDigitsSlider").value == 2) {
        document.getElementById('numOfDigitsText').textContent = 'Number Of Digits: 2 (Recommended)';
    } else {
        document.getElementById('numOfDigitsText').textContent = 'Number Of Digits: ' + document.getElementById("numOfDigitsSlider").value;
    }
});

function oneplayer_init() {
    let secretNumber = 0;
    secretNumber = String(Math.floor(Math.random() * 10));
    for (let i = 0; i < document.getElementById("numOfDigitsSlider").value - 1; i++) {
        secretNumber = String(secretNumber) + String(Math.floor(Math.random() * 10));
    };
    document.cookie = "secretNumber=" + secretNumber;
    document.cookie = "guessesRemaining=10";
    let maxNumber = 9;
    for (let i = 0; i < document.getElementById("numOfDigitsSlider").value - 1; i++) {
        maxNumber = String(maxNumber) + String(9);
    };
    document.cookie = "maxNumber=" + maxNumber;
    document.cookie = "timeRemaining=30";
    location.assign("1playergame.html");
}

function twoplayer_init() {
    let maxNumber = 9;
    for (let i = 0; i < document.getElementById("numOfDigitsSlider").value - 1; i++) {
        maxNumber = String(maxNumber) + String(9);
    };
    let secretNumber = document.getElementById("secretNumber").value;
    if (secretNumber > maxNumber || secretNumber < 0 || secretNumber == "") {
        alert("Please Enter A Number Between 0 And " + maxNumber + ", According to the Number Of Digits You Have Inputted");
    } else {
        document.cookie = "secretNumber=" + secretNumber;
        document.cookie = "guessesRemaining=10";
        document.cookie = "maxNumber=" + maxNumber;
        document.cookie = "timeRemaining=30";
        location.assign("1playergame.html");
    }
    document.getElementById("secretNumber").textContent = "";
}

function initGame() {
    function timerInt() {
        var timeRemaining = getCookie("timeRemaining");
        if (timeRemaining == "resetted") {
            clearInterval(timerId);
            document.getElementById("TimeRemaining").textContent = "";
        } else {
            timeRemaining = timeRemaining - 1;
            document.cookie = "timeRemaining=" + timeRemaining;
            document.getElementById("TimeRemaining").textContent = "Time Remaining: " + timeRemaining;
            if (timeRemaining == 0) {
              clearInterval(timerId);
              document.getElementById("LowerHigherText").textContent = "The Number Was " + getCookie("secretNumber"); 
              reset();
              document.getElementById("WinLoseText").textContent = "You Lose";
              document.getElementById("TimeRemaining").textContent = "You ran out of time!";
              document.getElementById("guess").disabled = true;
              document.getElementById("guessButton").disabled = true;
              document.getElementById("resetButton").textContent = "Play Again/Back";
            }
        }
    }
    
    if (getCookie("secretNumber") == "resetted") {
      location.assign("index.html");
    } else {
      document.getElementById("GuessesRemaining").textContent = "Guesses Remaining: " + getCookie("guessesRemaining");
      document.getElementById("NumberRange").textContent = "Number Range: 0 - " + getCookie("maxNumber");
      var timerId = setInterval(timerInt, 1000);
    }

    if (getCookie("music") == "playing") {
        playMusic();
    } else if (getCookie("music") == "paused") {
        pauseMusic();
    }
  }

function guess() {
    let secretNumber = Number(getCookie("secretNumber"));
    let guess = document.getElementById("guess").value;
    let maxNumber = Number(getCookie("maxNumber"));
    guessesRemaining = getCookie("guessesRemaining");
    if (guess > maxNumber || guess < 0 || guess == "") {
        document.getElementById("guess").value = "";
        document.getElementById("LowerHigherText").textContent = "Please Enter A Number Between 0 And " + maxNumber;
        document.getElementById("WinLoseText").textContent = "";
    } else if (guess > secretNumber) {
        document.getElementById("LowerHigherText").textContent = "Guess Lower";
        guessesRemaining = guessesRemaining - 1;
        document.cookie = "guessesRemaining=" + guessesRemaining;
        document.getElementById("PreviousAttempts").innerHTML = document.getElementById("PreviousAttempts").innerHTML + "Attempt " + (10 - guessesRemaining) + ": " + document.getElementById("guess").value + "<br>Generated Response: " + document.getElementById("LowerHigherText").textContent + "<br><br>";
        document.getElementById("guess").value = "";
        document.getElementById("GuessesRemaining").textContent = "Guesses Remaining: " + guessesRemaining;
        document.getElementById("WinLoseText").textContent = "";
    } else if (guess < secretNumber) {
        document.getElementById("LowerHigherText").textContent = "Guess Higher";
        guessesRemaining = guessesRemaining - 1;
        document.cookie = "guessesRemaining=" + guessesRemaining;
        document.getElementById("PreviousAttempts").innerHTML = document.getElementById("PreviousAttempts").innerHTML + "Attempt " + (10 - guessesRemaining) + ": " + document.getElementById("guess").value + "<br>Generated Response: " + document.getElementById("LowerHigherText").textContent + "<br><br>";
        document.getElementById("guess").value = "";
        document.getElementById("GuessesRemaining").textContent = "Guesses Remaining: " + guessesRemaining;
        document.getElementById("WinLoseText").textContent = "";
    } else if (guess == secretNumber) {
        guessesRemaining = guessesRemaining - 1;
        document.cookie = "guessesRemaining=" + guessesRemaining;
        document.getElementById("LowerHigherText").textContent = "Congratulations! You Guessed The Number!";
        document.getElementById("PreviousAttempts").innerHTML = document.getElementById("PreviousAttempts").innerHTML + "Attempt " + (10 - guessesRemaining) + ": " + document.getElementById("guess").value + "<br>Generated Response: " + document.getElementById("LowerHigherText").textContent + "<br><br>";
        reset()
        document.getElementById("guess").value = "";
        document.getElementById("WinLoseText").textContent = "You Win";
        document.getElementById("TimeRemaining").textContent = "";
        document.getElementById("guess").disabled = true;
        document.getElementById("guessButton").disabled = true;
        document.getElementById("resetButton").textContent = "Play Again/Back";
    }
    if (guessesRemaining == 0) {
        document.getElementById("guess").value = "";
        reset()
        document.getElementById("GuessesRemaining").textContent = "Out of Guesses";
        document.getElementById("LowerHigherText").textContent = "The Number Was " + secretNumber;
        document.getElementById("WinLoseText").textContent = "You Lose";
        document.getElementById("TimeRemaining").textContent = "";
        document.getElementById("guess").disabled = true;
        document.getElementById("guessButton").disabled = true;
        document.getElementById("resetButton").textContent = "Play Again/Back";
    }
}

function reset() {
    document.cookie = "guessesRemaining=resetted";
    document.cookie = "secretNumber=resetted";
    document.cookie = "maxNumber=resetted";
    document.cookie = "timeRemaining=resetted";
    if (getCookie("music") == "playing") {
        playMusic();
    } else if (getCookie("music") == "paused") {
        pauseMusic();
    }
}

function onpageshow(){
    if (performance.navigation.type === performance.navigation.TYPE_BACK_FORWARD) {
        // Set the input value to zero.
        document.getElementById("secretNumber").value = "";
        document.getElementById("numOfDigitsSlider").value = 2;
      }
}

function pauseMusic() {
    document.cookie = "music=paused";
    document.getElementById("audio").pause();
}

function playMusic() {
    document.cookie = "music=playing";
    document.getElementById("audio").play();
}