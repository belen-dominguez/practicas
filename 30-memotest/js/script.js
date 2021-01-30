let gameDetails = {
    level: "",
    maxScore: 0,
    score: 0,
    tries: 0,
    time: 0
}
let gameChoices = []


/*set level one*/
const actionBtns = document.querySelector('.levels').children;

const setLevelOne = (e) => {
    resetGame()
    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
    }
    actionBtns[0].classList.add('active')


    /*level 1 -> tine la mitad de img y lo duplicamos para formar los matches*/
    const qty = images.length  / 2;
    const halfItems = images.slice(0, qty)
    const dobleSize = [...halfItems, ...halfItems]

    gameDetails.level = 'One';
    gameDetails.maxScore = qty;

    /*ordenarlos de forma random*/
    const levelOne = shuffle(dobleSize)

}


/*set lvel 2*/
const setLevelTwo = (e) => {
    resetGame()

    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
    }
    actionBtns[1].classList.add('active')

    /*set level two*/
    const dobleSize = [...images, ...images]

    gameDetails.level = 'Two';
    gameDetails.maxScore = (dobleSize.length / 2);


    /*ordenarlos de forma random*/
     const leveltwo = shuffle(dobleSize)

}

/*set lvel 3*/
const setLevelThree = (e) => {
    resetGame()

    const modal = document.querySelector('.modalLevelThree');
    modal.classList.add('hide')

    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
    }
    actionBtns[2].classList.add('active')

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
        setLevelThree()
    }
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
    const timerDiv = document.createElement('div')
    timerDiv.classList.add('timer');
    document.body.appendChild(timerDiv);

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
const checkScore = () => {
    
    if(gameDetails.maxScore == gameDetails.score){
        clearInterval(timeLapse)
        clearInterval(timer);
        gameDetails.time = time
        modalScore()
        console.log(time, gameDetails)
    }

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



