

const playButton = document.querySelector("#playButton");
const gameScreen = document.querySelector('#mainDiv');
const firstEnter = document.getElementById('firstEnter');
let secondEnter;
let arr = [];
let correctGuess = [];
let count = 0;
let playState = 0;
let string = "";

document.addEventListener('keyup', function(e){
    if(playState==0){
        console.log(e.key);
        if((/^[a-z]*$/.test(e.key)) && e.key.length == 1 && (firstEnter.innerHTML.length < 5)){
            let prevHtml = firstEnter.innerHTML;
            firstEnter.innerHTML = prevHtml + e.key;
        } else if((e.key == 'Backspace') && (firstEnter.innerHTML.length > 0)){
            firstEnter.innerHTML = firstEnter.innerHTML.slice(0,-1);
        } else if((e.key == 'Enter') && (firstEnter.innerHTML.length ==5)){
            startGame();
            playState++;
        } else if((e.key == 'Enter') && (firstEnter.innerHTML.length != 5)){
            document.getElementById('errorMsg').classList.remove('invisible');
        }
    } else if(playState==1){
        if((/^[A-Za-z]*$/.test(e.key)) && e.key.length == 1 && (secondEnter.innerHTML.length < 5)){
            let prevHtml = secondEnter.innerHTML;
            secondEnter.innerHTML = prevHtml + e.key;
        } else if (e.key == 'Enter'){
            checkGuess();
        } else if((e.key == 'Backspace') && (secondEnter.innerHTML.length > 0)){
            secondEnter.innerHTML = secondEnter.innerHTML.slice(0,-1);
        }
    } else {if(e.key == 'Enter') this.location.reload();}
});

document.addEventListener("mouseover", function(e){
    const clicked = e.target.closest("#words"); // Or any other selector.
    if(clicked){
        clicked.classList.remove('notHovered');
        clicked.classList.add('hovered');
    }});
document.addEventListener("mouseout", function(e){
    const clicked = e.target.closest("#words"); // Or any other selector.
    if(clicked){
        clicked.classList.remove('hovered');
        clicked.classList.add('notHovered');
    }});
document.addEventListener("click", function(e){
    const clicked = e.target.closest("#words");
    if(clicked){
        let index = clicked.getAttribute("value");
        console.log(index);
        if(correctGuess[index] != arr[index].length){
            correctGuess[index]++;
            mapArr();
            if(correctGuess[index] == arr[index].length){count--; checkWin();}
        }
}});
document.addEventListener("click", function(e){
    const clicked = e.target.closest("#key");
    if(clicked){
        let key = clicked.getAttribute('value');
        if(playState==0){
            if(firstEnter.innerHTML.length < 5 && key.length == 1){
                let prevHtml = firstEnter.innerHTML;
                firstEnter.innerHTML = prevHtml + key;
            }
        } else if(playState==1){
            if(secondEnter.innerHTML.length < 5 && key.length == 1){
                let prevHtml = secondEnter.innerHTML;
                secondEnter.innerHTML = prevHtml + key;
            }
        }
    }});

document.addEventListener("click", function(e){
    const clicked = e.target.closest("#specialKey");
    if(clicked){
        let key = clicked.getAttribute('value');
        if(playState==0){
            if((key == 'Delete') && (firstEnter.innerHTML.length > 0)){
                firstEnter.innerHTML = firstEnter.innerHTML.slice(0,-1);
            } else if((key == 'Enter') && (firstEnter.innerHTML.length ==5)){
                startGame();
                playState++;
            } else if((key == 'Enter') && (firstEnter.innerHTML.length != 5)){
                document.getElementById('errorMsg').classList.remove('invisible');
            }
        } else if(playState==1){
            if (key == 'Enter'){
                checkGuess();
            } else if((key == 'Delete') && (secondEnter.innerHTML.length > 0)){
                secondEnter.innerHTML = secondEnter.innerHTML.slice(0,-1);
            }
        } else {if(key == 'Enter') this.location.reload();}
    }});


function mapArr(){
    let screenArr = arr.map(function(item, index){
        let string = '<div unselectable="on" id="words" value=' + index + '>';
        let temp = correctGuess[index];
        for(let i = 0; i < item.length; i++){
            if(correctGuess[index] == 0){string = string + "-"}
            else{
                string = string + arr[index][i];
                correctGuess[index]--;
            }
        }
        correctGuess[index] = temp;
        return string + '</div>';
    });
    gameScreen.innerHTML = ('<div id="enterBox"><a id="secondEnter" class="center"></a></div>\
    <br><br>' + screenArr.join('\n'));
    secondEnter = document.getElementById('secondEnter');
}

function checkGuess(){
    let guess = secondEnter.innerHTML;
    let win = 1;
    for(let i = 0; i < arr.length; i++){
        if((guess == arr[i])){
            if(correctGuess[i] < arr[i].length){
                correctGuess[i] = arr[i].length;
                console.log("Correct");
                mapArr();
                console.log(count);
                count--;
                console.log(count);
                checkWin();
                win = 0;
                break;
            }
        }
    }
    if(win){
        gameScreen.classList.add('shake');
        gameScreen.classList.remove('shake');
        void gameScreen.offsetWidth;
        gameScreen.classList.add('shake');
    }
    secondEnter.innerHTML = '';
    
}

function checkWin(){
    if(count == 0) {displayWinScreen(); playState++;}
}

function displayWinScreen(){
    gameScreen.innerHTML = ('<br><a id="winScreen">You win!!!</a><br><br>\
    <a id="winScreen">Press Enter to Play Again!</a><br><br>');
    gameScreen.classList.add("mainDivAddOn");
    document.getElementById('keyboard').classList.add("mainDivAddOn");
    document.getElementById('gameScreen').classList.add("mainDivAddOn");
}

function buildWords(){
    let stringArr = string.split("",5);
    for(let i = 0; i<5; i++){
        let wordArr = [];
        let space = " ";
        let spaceArr = space.split("",1);
        wordArr[0] = stringArr[i];
        if(1){
            arr[count] = wordArr.join("").replace(/\s/g, '');
            count++;
        }
        for(let j = 0; j<5; j++){
            if(j != i){
                wordArr[1] = stringArr[j];
                wordArr[2] = space[0];
                wordArr[3] = space[0];
                wordArr[4] = space[0];
                if(1){
                    arr[count] = wordArr.join("").replace(/\s/g, '');
                    count++;
                }
                for(let k = 0; k < 5; k++){
                    if((k!=i) && (k!=j)){
                        wordArr[2] = stringArr[k];
                        wordArr[3] = space[0];
                        wordArr[4] = space[0];
                        if(1){
                            arr[count] = wordArr.join("").replace(/\s/g, '');
                            count++;
                        }
                        for(let l = 0; l < 5; l++){
                            if((l!=i) && (l!=j) && (l!=k)){
                                wordArr[3] = string[l];
                                wordArr[4] = spaceArr[0];
                                if(1){
                                    arr[count] = wordArr.join("").replace(/\s/g, '');
                                    count++;
                                }
                                for(let m = 0; m < 5; m++){
                                    
                                    if((m!=i) && (m!=j) && (m!=k) && (m!=l)){
                                        wordArr[4] = string[m];
                                        arr[count] = wordArr.join("").replace(/\s/g, '');
                                        count++;
                                        m=5;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    sortArr();
}

function sortArr(){
    for(let i = 0; i < count; i++){
        for(let j = 0; j < count; j++){
            if(arr[j].length < arr[i].length){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    for(let i = 0; i < count; i++){
        for(let j = 0; j < count; j++){
            if((arr[j].length == arr[i].length) && (arr[j] > arr[i])){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

function startGame(){
    string = firstEnter.innerHTML;
    for(let h = 0; h < 325; h++){
        correctGuess[h] = 0;
    }
        document.getElementById('errorMsg').classList.add('invisible');
        buildWords();
        let setArr = new Set(arr);
        arr = Array.from(setArr);
        count = arr.length;
        console.log(count);
        console.log(arr);
        let screenArr = arr.map(function(item, index){
            let string = '<div unselectable="on" id="words" value=' + index + '>';
            let temp = correctGuess[index];
            for(let i = 0; i < item.length; i++){
                if(correctGuess[index] == 0){string = string + "-"}
                else{
                    string = string + arr[index][i];
                    correctGuess[index]--;
                }
            }
            correctGuess[index] = temp;
            return string + '</div>';
        });
        gameScreen.innerHTML = ('<div id="enterBox"><a id="secondEnter" class="center"></a></div>\
        <br><br>' + screenArr.join('\n'));
        secondEnter = document.getElementById('secondEnter');
}
