const board = document.querySelector('.container');
let tiles;
const moves = document.querySelector('.moves');
const timeDisplay = document.querySelector('.time');

let randomArr = [];
let empty = [];
let movements = 0;
let time = {sec: 0, min: 0};
let timer;

/*Moves counter*/
const countMoves = (nr) => {
    movements = movements + nr;
    moves.innerText = movements;
}
/*Time hanlder*/
const startTimer = () => {
    board.removeEventListener('click',startTimer);

    timer =  setInterval(() => {
        time.sec++;

        if( time.sec == 60){
            time.min++;
            time.sec = 0;
        }
        if(time.sec < 10){
            time.sec = `0${time.sec}`;
        }
        timeDisplay.innerText = `${time.min}:${time.sec}`;
    },1000)
}
const stopTimer = () => {
    clearInterval(timer);
    time = {sec: 0, min: 0};
    timeDisplay.innerText = `0:00`;
}

/* Movements*/
const afterMoveSelected = () => {
    countMoves(+1);
    printBoard();
    checkGame();
}

const moveUp = () => {
    let x = empty[0];
    let y = empty[1];

    /*switch palces*/
    let temp = randomArr[x - 1][y];
    randomArr[x - 1][y] = randomArr[x][y];
    randomArr[x][y] = temp;
    
    afterMoveSelected();
}
const moveDown = () => {
    let x = empty[0];
    let y = empty[1];

    /*switch palces*/
    let temp = randomArr[x + 1][y];
    randomArr[x + 1][y] = randomArr[x][y];
    randomArr[x][y] = temp;

    afterMoveSelected();
}
const moveRight = () => {
    let x = empty[0];
    let y = empty[1];

    /*switch places*/
    let temp = randomArr[x][y + 1];
    randomArr[x ][y + 1] = randomArr[x][y];
    randomArr[x][y] = temp;

    afterMoveSelected();
}
const moveLeft = () => {
    let x = empty[0];
    let y = empty[1];

    /*switch places*/
    let temp = randomArr[x][y - 1];
    randomArr[x ][y - 1] = randomArr[x][y];
    randomArr[x][y] = temp;

    afterMoveSelected();
}


/* Get coordenates of empty tile*/
const getEmptyTile = () => {
    randomArr.forEach(row => {
       
        if(row.includes(0)){
           empty[0] = randomArr.indexOf(row)
           empty[1] = row.indexOf(0)
        }
    })

}

/* Define posible movements - coordenates*/
/* Movements for X */
const xMovements = (x,y) => {
    let idDown;
    let enableTileDown;

    let idUp;
    let enableTileUp;

    if(x == 0){
        idDown = randomArr[x+1][y].toString();
        enableTileDown = tiles.filter(tile => tile.id == idDown )[0];
    
        enableTileDown.addEventListener('click',moveDown);

    }
    else if(x == 3 ){
        idUp = randomArr[x-1][y].toString();
        enableTileUp = tiles.filter(tile => tile.id == idUp )[0];
    
        enableTileUp.addEventListener('click',moveUp);
 
    }
    else {
        idDown = randomArr[x+1][y].toString();
        enableTileDown = tiles.filter(tile => tile.id == idDown )[0];
    
        enableTileDown.addEventListener('click',moveDown);
    
        idUp = randomArr[x-1][y].toString();
        enableTileUp = tiles.filter(tile => tile.id == idUp )[0];
    
        enableTileUp.addEventListener('click',moveUp);
    }

}

/* Movemens for Y */
const yMovements = (x,y) =>{
    let idRight;
    let enableTileRight;  

    let idLeft;
    let enableTileLeft;

    if(y == 0){
        idRight = randomArr[x][y + 1].toString();
        enableTileRight = tiles.filter(tile => tile.id == idRight )[0];
    
        enableTileRight.addEventListener('click',moveRight);
    
    }
    else if(y == 3 ){
        idLeft = randomArr[x][y - 1].toString();
        enableTileLeft = tiles.filter(tile => tile.id == idLeft )[0];
    
        enableTileLeft.addEventListener('click',moveLeft);
    }
    else {
        idRight = randomArr[x][y + 1].toString();
        enableTileRight = tiles.filter(tile => tile.id == idRight )[0];
    
        enableTileRight.addEventListener('click',moveRight);
    
        idLeft = randomArr[x][y - 1].toString();
        enableTileLeft = tiles.filter(tile => tile.id == idLeft )[0];
    
        enableTileLeft.addEventListener('click',moveLeft); 
    }
}

const posibleMovements = () => {
    
    let x = empty[0];
    let y = empty[1];
    
    xMovements(x,y);
    yMovements(x,y);

}

/* Print board*/
const printBoard = () => {

    board.innerHTML = randomArr.map(row => {
      return  row.map(item => {
           return `<div id=${item} class="tile tile-${item}">
           <p>${item}</p>
           </div>`
        }).join('')
    
    }).join('');
    
    tiles = [...document.getElementsByClassName('tile')];
    
    getEmptyTile();
    posibleMovements();
}


/* Generate random array*/
const generateRandom = () => {
   /* arr is array with the 16 items*/
  let arr = [];
  let i = 0;
    while(i < 100){
        /*generate random nr from 0 to 15*/
        let index = Math.floor(Math.random() * 16);
        
        if(arr.length <= 16 && !arr.includes(index)){
            arr.push(index);
        }
        i++
    }
  
    let index = 0;
    let qty = 4;
        for(let i = 0; i < qty; i++){
            /* create the four arrays inside randomArr*/
            randomArr.push( arr.slice((0 + index ),(qty + index)));

            index = index + 4;
        }

    /*puzzle solvable? */
    let checkRow = checkEmptyPosition(randomArr);
    let inversionCount = checkInversions(randomArr);

    if ((checkRow === 'even' && inversionCount === 'odd') ||
        (checkRow === 'odd' && inversionCount === 'even')) {
        printBoard();
       
    }
    else {
        randomArr = [];
        generateRandom();
    }

}

/* Start game*/
const btnStart = document.querySelector('.action button');

const startGame = () => {

    if(board.classList.contains('win')){
        board.classList.remove('win');
    }

    btnStart.innerText = "Restart";
    btnStart.removeEventListener('click', startGame)
    btnStart.addEventListener('click', restartGame)

    board.addEventListener('click', startTimer);
    randomArr = [];
    generateRandom();
}

const restartGame = () => {

    /*reset movements, randomArr & timer*/
    countMoves(-movements);
    stopTimer();

    board.addEventListener('click', startTimer);
    randomArr = [];
    generateRandom();
}

btnStart.addEventListener('click',startGame)


/* Compare arrays to see if game ends*/
const checkGame = () => {
    const original = [
        [1,2,3,4],
        [5,6,7,8],
        [9,10,11,12],
        [13,14,15,0]
    ];

    let originalArr = original.flat();
    let gameArr = randomArr.flat();
    let isTrue = true;

    let compare = originalArr.map((item, i) => {
        if(item == gameArr[i]){
          return  item = isTrue;
        }
    })

    let check = compare.every(item => item == isTrue);

    if(check){
        openPopUp();
    }
    else {
        return;
    }
}

/* PopUp Handler*/
const openPopUp = () => {
    
    board.classList.add('win');

    const winPopUp = document.createElement('div');
    winPopUp.classList.add('pop-up');
    winPopUp.innerHTML = `
        <div class="inner-content">
            <div class="inner-content__close" onclick="closePopUp()">
                <i class="far fa-times-circle"></i>
            </div>
            <div class="inner-content__text">
                <div class="text">
                    <h2>YOU WIN!</H2>
                    <p>Your time: ${time.min}:${time.sec}</p>
                    <p>Moves: ${movements}</p>
                </div>
                <div class="logo">
                    <img src="./images/logo.png" alt="monk image">
                </div>
            </div>
        </div>
    `
    document.body.appendChild(winPopUp);
    stopTimer();
}

const closePopUp = () => {
    const popUp = document.getElementsByClassName('pop-up')[0];
    document.body.removeChild(popUp);

    btnStart.innerText = "Play Again";
    countMoves(-movements);
}


/* Is puzzle solvable?
If N is even, puzzle instance is solvable if :
  1.  the blank is on an even row counting from the bottom (second-last, fourth-last, etc.) and number of inversions is odd.
  2.  the blank is on an odd row counting from the bottom (last, third-last, fifth-last, etc.) and number of inversions is even.
*/

const checkEmptyPosition = (arr) => {
 
    let indexRow;

    arr.forEach(row => {
        if(row.includes(0)){
            indexRow = arr.indexOf(row);
        }
    })

    if(indexRow % 2 == 1){
        return 'odd';
    }
    else {
        return 'even';
    }

}

const checkInversions = (arr) => {
    
    let flatArr = arr.flat();
    let inversions = 0;

    for (let i = 0; i < flatArr.length; i++){

        for(let j = (i+1); j < flatArr.length ; j++) { 
            
            if(flatArr[i] > flatArr[j]){
                inversions++;
            }
        }
    }

    if(inversions % 2 == 0){
        return 'even';
    }
    else{
        return 'odd';
    }
}

