const userDetails = {
    userName: '',
    icon:''
}

const login = () => {
     userDetails.userName = prompt('Enter your name')
     showUser()
}



let gameHistory = []

let gameDetails = {
    level: "",
    maxScore: 0,
    score: 0,
    tries: 0,
    time: 0,
    points: 0
}
let gameChoices = []


/*set level one*/
const actionBtns = document.querySelector('.levels').children;

const setLevelOne = (e) => {
    resetGame()
    stopTimer();


    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
        actionBtns[i].disabled = false;
    }
    actionBtns[0].classList.add('active')
    actionBtns[0].disabled = true;


    /*level 1 -> tine la mitad de img y lo duplicamos para formar los matches*/
    const qty = images.length  / 2;
    const halfItems = images.slice(0, qty)
    const dobleSize = [...halfItems, ...halfItems]

    gameDetails.level = 'One';
    gameDetails.maxScore = qty;

    /*ordenarlos de forma random*/
    const levelOne = shuffle(dobleSize)
    checkTime()
}


/*set lvel 2*/
const setLevelTwo = (e) => {
    resetGame()
    stopTimer();

    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
        actionBtns[i].disabled = false;
    }
    actionBtns[1].classList.add('active')
    actionBtns[1].disabled = true;

    /*set level two*/
    const dobleSize = [...images, ...images]

    gameDetails.level = 'Two';
    gameDetails.maxScore = (dobleSize.length / 2);


    /*ordenarlos de forma random*/
     const leveltwo = shuffle(dobleSize)
     checkTime()

}

/*set lvel 3*/
const setLevelThree = (e) => {
    resetGame()


    const modal = document.querySelector('.modalLevelThree');
    modal.classList.add('hide')

    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
        actionBtns[i].disabled = false;
    }
    actionBtns[2].classList.add('active')
    actionBtns[2].disabled = true;

    /*  set level two  */
    const dobleSize = [...images, ...images]

    gameDetails.level = 'Three';
    gameDetails.maxScore = (dobleSize.length / 2);


    /*ordenarlos de forma random*/
     const levelThree = shuffle(dobleSize)

     /*ejecutar tiempo*/
     timerHandler()

     /*contabilizar tiempo*/
     checkTime()
}


const shuffle = (array) => {
   /*creo arr con nros aleatorias, q no se repitan*/

   let newIndex = []

    for(let i=0; i < 999; i++){
        let nro = Math.floor(Math.random() * array.length);

        if(!newIndex.includes(nro)){

            if(newIndex.length == array.length){
                return
            }else {
                newIndex.push(nro)
            }
        }
    }
   
    /*le asigno los nuevos indices a los elementos del array para reordenarlos*/
    let shuffleArr = []
    for(let i = 0; i < array.length; i++){
        shuffleArr.push(array[newIndex[i]])
    }

    displayLevel(shuffleArr)
}



const selectPairs = () => {

    if(gameChoices.length == 2){
        gameDetails.tries++
        btnHandler()
        
        if(gameChoices[0].option == gameChoices[1].option){

            setTimeout(() => {

                gameChoices.forEach(item => {
                    item.target.parentElement.parentElement.style.visibility = "hidden";
                })

                gameChoices = [] 
                btnHandler()
                gameDetails.score++
                checkScore()
            }, 1000);
        }
        else {
           
            setTimeout(() => {

                gameChoices.forEach(item => {  
                    item.target.parentElement.classList.remove('twist');
                })
                gameChoices = [] 
                btnHandler()
            }, 1000);
           
        }

    }
    
}


let timer
const timerHandler = () => {
    timerDiv.classList.remove('hide')
  
     /*set 5 min*/    
    let min = 4;
    let sec = 59

    timer = setInterval(() => {
        --sec

        if(sec == 0){
            sec = 59;
            --min
        }


        if(sec < 10){
            timerDiv.innerText = `0${min} : 0${sec}`  
        }
        else {
            timerDiv.innerText = `0${min} : ${sec}`
        }

        if(min == 0){
            timerDiv.style.color = "red";
            timerDiv.style.border = "2px solid red";
        }

        if(min < 0){
            timerDiv.innerText = `00 : 00`;
            btnHandler();
            modalScore()
            clearInterval(timer);
        }
        
    },1000)


}

const btnHandler = () => {
    for(let i = 0; i < cards.length; i++){
        cards[i].disabled = (!cards[i].disabled)
    }
}


let time;
let timeLapse
const checkTime = () => {
    time = 0;
    timeLapse = setInterval(() => {
        time++
    },1000)
}


const stopTimer = () => {
    clearInterval(timeLapse)
    clearInterval(timer);
    timerDiv.classList.add('hide')
}

const checkScore = () => {
    
    if(gameDetails.maxScore == gameDetails.score){
        stopTimer();
        gameDetails.time = time
        calculateScore()
        modalScore()
    }

}

const calculateScore = () => {
    let maxPoints;
    let fails = -2;
    let extraSec = -1
    let calcTime = 0;

    /*set max points*/
    if(gameDetails.level == "One"){
         maxPoints = 70;
        
         /*set time calc */
        if(gameDetails.time > 10) {
            calcTime = gameDetails.time - 10
        }
    }
    if(gameDetails.level == "Two" || gameDetails.level == "Three"){
        maxPoints = 200;

         /*set time calc */
         if(gameDetails.time > 20) {
            calcTime = gameDetails.time - 20
        }
   
    }

    

    /*set points calc*/
    if(gameDetails.tries == gameDetails.maxScore){
        gameDetails.points = maxPoints;
    }
    else {
        
        let calcFails = fails * (gameDetails.tries - gameDetails.maxScore);
        let calcTimeScore = extraSec * calcTime;

        gameDetails.points =  maxPoints + calcFails + calcTimeScore;
    }


}

const highestScore = (final) => {
    let highScore = 0;
    let theUser = userDetails.userName
    if(final > highScore){
        highScore = final;
        displayHighScore()
    }
    else {
        return
    }
 
    localStorage.setItem('highScore', highScore);
    localStorage.setItem('user', theUser);

    displayHighScore()

}

const resetGame = () => {
    gameDetails = {
        level: "",
        maxScore: 0,
        score: 0,
        tries: 0,
        time: 0
    }
}


const newGame = () => {

    if(gameDetails.level == "One"){
        resetGame()
        setLevelOne()
    }
    else if(gameDetails.level == "Two"){
        resetGame()
        setLevelTwo()
    }
    else if(gameDetails.level == "Three"){
        resetGame()
        clearInterval(timeLapse)
        clearInterval(timer);
        setLevelThree()
    }
}


window.addEventListener('load', () => {
    setLevelOne()
    displayHighScore()
    
})