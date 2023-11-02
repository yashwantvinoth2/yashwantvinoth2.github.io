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

function wordle(guessWord, goalWord) {
    const result = [];
  
    for (let i = 0; i < guessWord.length; i++) {
      const guessLetter = guessWord[i];
      const goalLetter = goalWord[i];
  
      if (guessLetter === goalLetter) {
        result.push('green');
      } else if (goalWord.includes(guessLetter)) {
        result.push('yellow');
      } else {
        result.push('red');
      }
    }
  
    return result;
  }

function createEquation() {
    let equation;
    let equationCheck;
    while (true) {
        let number1 = Math.floor(Math.random() * 100);
        let number2 = Math.floor(Math.random() * 100);
        let operation = Math.floor(Math.random() * 4);
        let answer;
        if (operation == 0) {
            operation = "+";
            answer = number1 + number2;
        } else if (operation == 1) {
            if (number1 - number2 >= 0) {
                operation = "-";
                answer = number1 - number2;
            } else {
                continue;
            }
        } else if (operation == 2) {
            operation = "*";
            answer = number1 * number2;
        } else {
            if (number1 % number2 == 0) {
                operation = "/";
                answer = number1 / number2;
            } else {
                continue;
            }
        }
        equation = number1.toString() + operation + number2.toString() + "=" + answer;
        if (equation.length == 6) {
            let order = Math.floor(Math.random() * 2);
            if (order == 0) {
                equation = answer + "=" + number1.toString() + operation + number2.toString()
            }
            break;
        } else {
            continue;
        }
    }
    return equation;
}

function checkEquation() {
    let row = getCookie("row");
    let equationCheck = '';
    let equalCounter = 0;
    let operationCounter = 0;
    let operation = "";
    let equation = "";
    let expression = "";
    let answer = ""
    let ogEquation = "";
    const listOfOperations = ['+', '-', '*', "/", '='];
    if (document.getElementById("text" + row.toString() + "-6").textContent == "") {
        equationCheck = 'bad';
    } else {
        for (let i = 1; i < 7; i++) {
            equation = equation + document.getElementById("text" + row + '-' + (i)).textContent;
            if (document.getElementById("text" + row + '-' + (i)).textContent == "=") {
                equalCounter = equalCounter + 1;
            }
            for (let j = 0; j < 4; j++) {
                if (document.getElementById("text" + row + '-' + (i)).textContent == listOfOperations[j]) {
                    operationCounter = operationCounter + 1;
                    operation = listOfOperations[j];
                }
            }
        }
        if (operationCounter != 1 || equalCounter != 1) {
            equationCheck = 'bad';
        } else {
            for (i = 0; i < 5; i++) {
                if (document.getElementById("text" + row + '-1').textContent == listOfOperations[i] || document.getElementById("text" + row + '-6').textContent == listOfOperations[i]) {
                    let equationCheck = 'bad';
                }
            }
        }
        if (equationCheck != 'bad') {
            ogEquation = equation;
            equation = equation.split("=");
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 2; j++) {
                    if (equation[j].includes(listOfOperations[i]) == true) {
                        expression = equation[j]
                        if (j == 0) {
                            answer = equation[1]
                        } else if (j == 1) {
                            answer = equation[0]
                        }
                    }
                }
            }
        }
        if (equationCheck != 'bad') {
            expression = expression.split(operation);
            expression[0] = parseInt(expression[0]);
            expression[1] = parseInt(expression[1]);
            if (operation == "+") {
                if (expression[0] + expression[1] != answer) {
                    equationCheck = "bad";
                }
            } else if (operation == "-") {
                if (expression[0] - expression[1] != answer) {
                    equationCheck = "bad";
                }
            } else if (operation == "*") {
                if (expression[0] * expression[1] != answer) {
                    equationCheck = "bad";
                }
            } else if (operation == "/") {
                if (expression[0] / expression[1] != answer) {
                    equationCheck = "bad";
                }
            }
        }
        if (equationCheck != "bad") {
            const secretindexes = [];
            const ogindexes = [];
            for (i=0; i<6; i++) {
                if (ogEquation.charAt(i) == getCookie('secretEquation').charAt(i)) {
                    document.getElementById('box' + getCookie('row').toString() + '-' + (i+1).toString()).style.backgroundColor = 'lightgreen';
                    secretindexes.push(i);
                    ogindexes.push(i);
                }
            }
            for (i=0; i<6; i++) {
                for (j = 0; j < 6; j++) {
                    if (ogEquation.charAt(i) == getCookie('secretEquation').charAt(j) && ! ogindexes.includes(i) && ! secretindexes.includes(j)) {
                        document.getElementById('box' + getCookie('row').toString() + '-' + (i+1).toString()).style.backgroundColor = 'yellow';
                        ogindexes.push(i);
                        secretindexes.push(j);
                        break;
                    }
                }
            }
            for (i=0; i<6; i++) {
                if (! ogindexes.includes(i)) {
                    document.getElementById('box' + getCookie('row').toString() + '-' + (i+1).toString()).style.backgroundColor = 'grey';
                }
            }
            if (ogEquation == getCookie('secretEquation')) {
                document.getElementById('playAgain').style.display="inline";
                document.getElementById('winLose').textContent = "You Won!";
            } else if (getCookie('row') == 5) {
                document.getElementById('playAgain').style.display="inline";
                document.getElementById('winLose').textContent = "You Lost :(";
            } else {
                document.cookie = "row=" + (parseInt(getCookie('row')) + 1);
                document.cookie = "box=1";
            }
        } else if (equationCheck == 'bad') {
            alert('invalid equation');
            for (i = 1; i < 7; i++) {
                document.getElementById('text' + getCookie('row') + '-' + i).textContent = "";
            }
            document.cookie = "box=1";
        }
    }
}

function charTyped(char) {
    if (getCookie("box") == 7) {
        return;
    } else {
        document.getElementById("text" + getCookie("row") + '-' + getCookie("box")).textContent = char;
        document.cookie = "box=" + (parseInt(getCookie("box")) + 1);
    }
}

function charDelete() {
    if (getCookie("box") == 1) {
        return;
    } else {
        document.cookie = "box=" + (parseInt(getCookie("box")) - 1);
        document.getElementById("text" + getCookie("row") + '-' + getCookie("box")).textContent = "";
    }
}


function gameLoad(){
    document.cookie = "row=1";
    document.cookie = "box=1";
    document.cookie = "secretEquation=" + createEquation();
    document.getElementById("playAgain").style.display="none";
    document.getElementById("invalid").style.display="none";
}

function information(){
    document.getElementById("onLoad").style.display="none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("invalid").style.display="none";
    document.getElementById("playAgain").style.display="none";
}
function informationDisplay(){
    document.getElementById("onLoad").style.display="block";
    document.getElementById("instructions").style.display="inline";
    document.getElementById("playAgain").style.display="none";
    document.getElementById("invalid").style.display="none";
}

function playMore(){
    window.location.reload();
}
function playAgainDisplay(){
    document.getElementById("playAgain").style.display="inline";
    document.getElementById("invalid").style.display="none";
    document.getElementById("onLoad").style.display="none";
    document.getElementById("instructions").style.display = "none";
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 48) {
        charTyped('0');
    }
    else if(event.keyCode == 49) {
        charTyped('1');
    }
    else if(event.keyCode == 50) {
        charTyped('2');
    }
    else if(event.keyCode == 51) {
        charTyped('3');
    }
    else if(event.keyCode == 52) {
        charTyped('4');
    }
    else if(event.keyCode == 53) {
        charTyped('5');
    }
    else if(event.keyCode == 54) {
        charTyped('6');
    }
    else if(event.keyCode == 55) {
        charTyped('7');
    }
    else if(event.keyCode == 56) {
        if (event.shiftKey) {
            charTyped('*');
        } else {
            charTyped('8');
        }
    }
    else if(event.keyCode == 57) {
        charTyped('9');
    }
    else if(event.keyCode == 107) {
        charTyped('+');
    }
    else if(event.keyCode == 109) {
        charTyped('-');
    }
    else if(event.keyCode == 111) {
        charTyped('/');
    }
    else if(event.keyCode == 106) {
        charTyped('*');
    }
    else if(event.keyCode == 187) {
        if (event.shiftKey) {
            charTyped('+');
        } else {
            charTyped('=');
        }
    }
    else if(event.keyCode == 65) {
        charTyped('+');
    }
    else if(event.keyCode == 83) {
        charTyped('-');
    }
    else if(event.keyCode == 77) {
        charTyped('*');
    }
    else if(event.keyCode == 68) {
        charTyped('/');
    }
    else if(event.keyCode == 13) {
        checkEquation();
    }
    else if(event.keyCode == 8) {
        charDelete();
    }
    else if(event.keyCode == 191) {
        charTyped('/');
    } else if (event.keyCode == 189) {
        charTyped('-');
    }
});

