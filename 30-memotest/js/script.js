let gameDetails = {
    level: "",
    score: 0
}

/*set level one*/
const setLevelOne = () => {
    gameDetails.level = 'one';
    /*level 1 -> tine la mitad de img y lo duplicamos para formar los matches*/
    const qty = images.length  / 2;
    const halfItems = images.slice(0, qty)
    const dobleSize = [...halfItems, ...halfItems]

    /*ordenarlos de forma random*/
    const levelOne = shuffle(dobleSize)

}


/*set lvel 2*/
const setLevelTwo = () => {
    gameDetails.level = 'two';
    const dobleSize = [...images, ...images]


    /*ordenarlos de forma random*/
     const leveltwo = shuffle(dobleSize)

}


const shuffle = (array) => {
    /* funciona https://waimin.me/Generate_unique_randoms/
    for (let index = 0; index < array.length ; index++) {
        let maxIndex = array.length - 1; 
        let minIndex = index + 1; 
        let swapIndex = Math.floor(Math.random() * (maxIndex - minIndex)) + minIndex; 
        let tmp = array[index]; 
        console.log('1', tmp)

        array[index] = array[swapIndex]; 
        console.log('2', array[index] )

        array[swapIndex] = tmp; 
        console.log('3',array[swapIndex])
    }
   */

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

    displayLevelOne(shuffleArr)
}
