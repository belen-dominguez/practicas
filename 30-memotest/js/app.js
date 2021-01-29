
const container = document.querySelector('.container')

const displayLevelOne = (items) => {
console.log(items)
    container.innerHTML = items.reduce((html, item) => {
        return html += `
            <div class="card">
                <div class="card-inner">
                    <div class="front" data-name="${item.name}"></div>
                    <div class="back">
                        <img src="${item.img}" alt="">
                    </div>
                </div>
            </div>
        `
    },"")
    setCardEvent();
}





const setCardEvent = () => {

    const cards = document.getElementsByClassName('card')

    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', (e) => {
            console.log(e.target)
           const cardInner = e.target.parentElement;
           cardInner.classList.add('twist');
        
        })
    }
}

