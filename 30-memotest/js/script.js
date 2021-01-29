let gameDetails = {
    level: "",
    score: 0
}
let gameChoices = []

/*set level one*/
const actionBtns = document.querySelector('.levels').children;

const setLevelOne = (e) => {
    gameDetails.level = 'One';

    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
    }
    e.target.classList.add('active')


    /*level 1 -> tine la mitad de img y lo duplicamos para formar los matches*/
    const qty = images.length  / 2;
    const halfItems = images.slice(0, qty)
    const dobleSize = [...halfItems, ...halfItems]

    /*ordenarlos de forma random*/
    const levelOne = shuffle(dobleSize)

}


/*set lvel 2*/
const setLevelTwo = (e) => {
    gameDetails.level = 'Two';

    /*style button*/
    for(let i = 0; i < actionBtns.length; i++){
        actionBtns[i].classList.remove('active')
    }
    e.target.classList.add('active')

    /*set level two*/
    const dobleSize = [...images, ...images]


    /*ordenarlos de forma random*/
     const leveltwo = shuffle(dobleSize)

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
console.log(gameDetails.level)
    if(gameDetails.level == "One"){
        setLevelOne()
    }
    else if(gameDetails.level == "Two"){
        setLevelTwo()
    }
}

const selectPairs = () => {

    if(gameChoices.length == 2){

        btnHandler()
        
        if(gameChoices[0].option == gameChoices[1].option){

            setTimeout(() => {

                gameChoices.forEach(item => {
                    item.target.parentElement.parentElement.style.visibility = "hidden";
                })
                gameChoices = [] 
                btnHandler()

            }, 1500);
        }
        else {
           
            setTimeout(() => {

                gameChoices.forEach(item => {  
                    item.target.parentElement.classList.remove('twist');
                })
                gameChoices = [] 
                btnHandler()
            }, 1500);
           
        }

    }
    
}

const btnHandler = () => {
    for(let i = 0; i < cards.length; i++){
        //    cards[i].disabled = true
        cards[i].disabled = (!cards[i].disabled)
    }
}