

piezas.addEventListener('dragstart', e => {
    e.dataTransfer.setData('id', e.target.id);

})


puzzle.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.target.classList.add('hover');
    
})

puzzle.addEventListener('dragleave', (e) => {
    e.target.classList.remove('hover');
})

puzzle.addEventListener('drop', (e) => {
    e.preventDefault();
    e.target.classList.remove('hover');

   let puzzleItemId = e.target.id
   let piezaID = e.dataTransfer.getData('id');
   let piezaNrId = piezaID.split('-')[1]
 
    let imgDiv = document.getElementById(piezaID);
    
    if(puzzleItemId == piezaNrId){
        imgDiv.style.margin = 0;
        e.target.appendChild(imgDiv);
        checkRemainingPieces()
    }


})



const openModal = (level) => {
    modal.classList.add('display');
    modalContent(level)
}

const modalContent = (level) => {

    const selected = puzzles.filter(item => item.level == level)[0];

    const innerModal = document.querySelector('.inner-modal');
    innerModal.id = selected.id;


    innerModal.innerHTML = `
        <div class="content">
            <h2>${selected.name}</h2>
            <h3>Author: ${selected.author}</h3>
            <div class="details">
                <p>Level: <span>${selected.level}</span> </p>
                <p>Difficulty: <span> ${selected.difficulty}</span></p>
                <p>Number of pieces: <span>${selected.pieces}</span> </p>
            </div>
            <button onclick="setLevel('${selected.level}')">Play Level ${selected.level}</button>
        </div>
        <div class="image">
            <img src="./imgs/puzzle-${selected.level}.jpg" alt="">
        </div>
    `
}

const closeModal = () => {
    modal.classList.remove('display');
}