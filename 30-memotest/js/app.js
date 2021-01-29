
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

