
const showUser = (e) => {

    let nameInput = e.target.parentElement.children[0].children[0].value
    userDetails.userName = nameInput;

    let imgProfile = e.target.parentElement.children[1].children[0].files[0]

    let createIMg = URL.createObjectURL(imgProfile)
    userDetails.profileImg = createIMg;

    const loginDiv = document.querySelector('.login')
    loginDiv.classList.add('hide')

    const userDiv = document.querySelector('.user')
    userDiv.classList.remove('hide')

    userDiv.innerHTML = `
        <div class="img">
            <img src="${createIMg}" alt="">
        </div>
        <p>${nameInput}</p>
    `

    let  loginModal = document.querySelector('.modal-login')
    loginModal.remove();
}

const showHistory = () => {
    const historyDiv = document.querySelector('.user-history')
    historyDiv.classList.remove('hide')


    const userDiv = document.querySelector('.user-history .header .user')
    userDiv.innerHTML = `
        <div class="img">
            <img src="${userDetails.profileImg}" alt="">
        </div>
        <p>${userDetails.userName}</p>
    `

    const historyItems = document.querySelector('.user-history .item-container')
    historyItems.innerHTML = gameHistory.reduce((html, item) => {
        return html += `
            <div class="history-item">
                <div class="img">
                    <i class="fas fa-trophy"></i>
                </div>
                <div class="detail">
                    <p>Level: ${item.level}</p>
                    <p>Score: ${item.points}</p>
                </div>
            </div>
        `
    },"")


    const totalScore = document.querySelector('.total-score')

    let finalScore = gameHistory.reduce((acc,item) => {
        acc = acc + item.points
        return acc
    },0)

    totalScore.innerText = `Total Score: ${finalScore}`

    highestScore(finalScore)

}

const displayHighScore = () => {
    let getScore = localStorage.getItem('highScore');
    let getUser = localStorage.getItem('user');

    if(getScore == null || getUser == null){
        getScore = "";
        getUser = "";
    }

    const bestScore = document.querySelector('.high-score')
    bestScore.innerText = `Best Score: ${getScore} - By ${getUser}`
}

const container = document.querySelector('.container')
const cards = document.getElementsByClassName('card')
const timerDiv = document.querySelector('.timer')

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

           checkTime()
           selectPairs()
        })
    }
}

const modalScore = () => {
    const modalScore = document.querySelector('.modal-score ')
    const modalScoreCntent = document.querySelector('.modal-score .inner-modal')
    modalScore.classList.remove('hide')

    timerDiv.classList.add('hide')

    let title;
    if(gameDetails.level == 'Three'){
        title = "TIMES UP!!"
    }
    else {
        title = "GREAT!!"
    }

    modalScoreCntent.innerHTML = `
        <h2>${title}</h2>
        <h3>Score: ${gameDetails.points}</h3>
        <p>Nro of tries: ${gameDetails.tries}</p>
        <p>Time: ${gameDetails.time} seconds</p>
        <button class="btn" onclick="closeModalScore()">Close</button>
    `
}

const closeModalScore = () => {
    const modalScore = document.querySelector('.modal-score')
    modalScore.classList.add('hide')
    container.innerHTML = 'Select a level...' 
    
    gameHistory.push(gameDetails)

}

const openModal = () => {
    const modal = document.querySelector('.modalLevelThree');
    modal.classList.remove('hide')
}
const closeModal = (e) => {
    const modal = e.target.parentElement.parentElement.parentElement
    modal.classList.add('hide')
}


// const prueba = document.querySelector('#prueba')
// const prueba2 = document.querySelector('#prueba2')
// console.log(prueba)


