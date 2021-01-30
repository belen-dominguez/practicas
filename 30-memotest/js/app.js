
const container = document.querySelector('.container')
const cards = document.getElementsByClassName('card')



const displayLevel = (items) => {

    const levelTitle = document.querySelector('.game-level');
    levelTitle.innerText = `Level ${gameDetails.level}` 


    container.innerHTML = items.reduce((html, item) => {
        return html += `
            <button class="card">
                <div class="card-inner">
                    <div class="front" data-name="${item.name}"></div>
                    <div class="back">
                        <img src="${item.img}" alt="">
                    </div>
                </div>
            </button>
        `
    },"")
    setCardEvent();
}


const setCardEvent = () => {

    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', (e) => {
           const cardInner = e.target.parentElement;
           cardInner.classList.add('twist');

           gameChoices.push({option: e.target.dataset.name, target: e.target})

           selectPairs()
        })
    }
}

const modalScore = () => {
    const modalScore = document.querySelector('.modal-score ')
    const modalScoreCntent = document.querySelector('.modal-score .inner-modal')
    modalScore.classList.remove('hide')

    console.log(gameDetails.time, time)
    modalScoreCntent.innerHTML = `
        <h2>TIMES UP!!</h2>
        <p>Nro of tries: ${gameDetails.tries}</p>
        <p>Time: ${gameDetails.time} seconds</p>
        <button class="btn" onclick="closeModalScore()">Close</button>
    `
}

const closeModalScore = () => {
    const modalScore = document.querySelector('.modal-score')
    modalScore.classList.add('hide')
    container.innerHTML = 'Select a level...'
}

const openModal = () => {
    const modal = document.querySelector('.modalLevelThree');
    modal.classList.remove('hide')

}
