let levelSelected;
let images = []

const setLevel = (level) => {
    closeModal()

    levelSelected = puzzles.filter(item => item.level == level)[0]

    setImgArray(level)

}

const setImgArray = (level) => {
    images = []
    for(let i = 0; i < levelSelected.pieces; i++){
        images.push(`image-${i}`)
    }

    createDiv()
}

const modal = document.querySelector('.modal');
const innerPuzzle = document.querySelector('.puzzle-inner')
const puzzle = document.querySelector('.puzzle');
const puzzleImg = document.querySelector('.puzzle-back')
const flipBtn = document.querySelector('.flip-btn')
const piezas = document.querySelector('.piezas');
const mensaje = document.querySelector('.mensaje');


const createDiv = () => {
    /*reset*/
    piezas.innerHTML = "";
    puzzle.innerHTML = "";

    
    flipBtn.classList.add('display')
    flipText()

    let puzzWidth = (levelSelected.width * levelSelected.columns) + 2
    let puzzHeight = (levelSelected.height * levelSelected.rows)
     puzzle.style.width = `${puzzWidth}px`;
     puzzle.style.height = `${puzzHeight}px`;

     puzzleImg.style.backgroundImage = `url(./imgs/puzzle-${levelSelected.level})`

    for(let i = 0; i < images.length; i++){
        const div = document.createElement('div');
        div.className = 'puzzle-item';
        div.id = i;     
         div.style.width = `${levelSelected.width}px`
         div.style.height = `${levelSelected.height}px`
        
        puzzle.appendChild(div)
    }
    
    while (images.length) {
        let index = Math.floor(Math.random() * images.length);
        const div = document.createElement('div');
        div.className = 'pieza';
        div.id = images[index];
        div.style.width = `${levelSelected.width}px`
        div.style.height = `${levelSelected.height}px`
        div.style.backgroundImage = `url(./imgs/puzzle-${levelSelected.level}/${images[index]}.jpg)`
        div.draggable = true;
        piezas.appendChild(div);
    
        images.splice(index, 1);
    }

    puzzleImg.innerHTML = ` <img src="./imgs/puzzle-${levelSelected.level}.jpg" alt="">`

    const title = document.querySelector('.title');
    title.innerText = `Level ${levelSelected.level}`
}


const checkRemainingPieces = () => {
    let totalPieces = piezas.children;

    if(totalPieces.length == 0){
        //mensaje.style.display = "flex";

        const puzzleItem = document.querySelectorAll('.puzzle-item')

        puzzleItem.forEach(item => {
            item.classList.add('transition')
        })

        let hola =  setInterval(() => {
            // puzzle.classList.add('transition')
            puzzle.classList.add('animate__animated')
            puzzle.classList.add('animate__bounceOut')
            flipBtn.classList.remove('display')
             mensaje.style.display = "flex";
             clearInterval(hola)
        },3500)
 
    }
}

const flipText = () => {
    if(innerPuzzle.classList.contains('rotate')){
        flipBtn.innerHTML = 'Flip to see <span>puzzle</span> <i class="fas fa-sync-alt" ></i>'
    }
    else {
        flipBtn.innerHTML = 'Flip to see <span>image</span> <i class="fas fa-sync-alt" ></i>'
    }
}

const rotate = () => {
    innerPuzzle.classList.toggle('rotate');
    puzzle.classList.toggle('no-visibility')
    flipText()
}

const changeSlide = (nr, e) => {
    const levelNr = document.querySelector('.level-container').children.length;

    let currentLevel = Number(e.target.parentElement.previousElementSibling.id)

    let nextLevel = currentLevel + nr;


    if(nextLevel < 1){
        nextLevel = levelNr;
    }
    if(nextLevel >  levelNr){
        nextLevel = 1;
    }

     
    let level;
    switch(nextLevel) {
        case 1:
            level = "One";
            break;
        case 2:
            level = "Two";
            break;
        case 3:
            level = "Three";
            break;
        case 4:
            level = "Four";
            break;
        case 5:
            level = "Five";
            break;
    }

    modalContent(level)
}