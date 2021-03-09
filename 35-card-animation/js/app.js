

const originalPosition = []
const getPosition = () => {
    let xAxisParent = Math.floor(container.getBoundingClientRect().x);
    let yAxisParent = Math.floor(container.getBoundingClientRect().y);
    let margin = 16;

    cards.forEach(card => {
        let xPosition = Math.floor(card.getBoundingClientRect().x ) - xAxisParent - margin;
        let yPosition = Math.floor(card.getBoundingClientRect().y) - yAxisParent - margin;
        originalPosition.push({id: card.dataset.content, x: xPosition, y:yPosition})
    })
}


/*effects*/
const fadeCards = (fadeCardsArr) => {

    let selectedToFade = [];

    for(let i = 0; i < originalPosition.length; i++){
        for(let j = 0; j < fadeCardsArr.length; j++){

            if( fadeCardsArr[j].dataset.content == originalPosition[i].id){
                selectedToFade.push({card: fadeCardsArr[j], x: originalPosition[i].x, y: originalPosition[i].y})
            }
        }
    }

    let xAxisParent = Math.floor(container.getBoundingClientRect().x);
    let yAxisParent = Math.floor(container.getBoundingClientRect().y);
    let margin = 16;

     selectedToFade.forEach((item) => {
        let xAxis = Math.floor(item.card.getBoundingClientRect().x) - xAxisParent - margin ;
        let yAxis = Math.floor(item.card.getBoundingClientRect().y) - yAxisParent - margin;
       
        item.card.animate([
            {
                transform: `translate3d(${xAxis}px,${yAxis}px, 0)`  ,
                opacity: 1
            },
            {
                transform: `translate3d(${item.x}px,${item.y}px, 0)`  ,
                opacity: 0
            }
        ],
        {
            duration: 600,
            easing: 'ease-in',
            fill: 'forwards',

        })
        item.card.style.visibility = 'hidden';
       
    })
     
}

const translateCards =  (showCards) => {

     /*columns*/
     let columns = 4;
     if(window.innerWidth < 500){
         columns = 2;
     }

    /*calculate tranlate x & y coordenates*/
    const cardWidth = showCards[0].clientWidth;
    let y = 0;
    let x = 0;

    /*get position of parent "container"*/
    let xAxisParent = Math.floor(container.getBoundingClientRect().x);
    let yAxisParent = Math.floor(container.getBoundingClientRect().y);

    /*remove margin from position. es el nro que se repite en todos que tengo que restar para que caiga donde necesito*/
    let margin = 16;

    showCards.forEach((card, i) => {

        let xAxis = Math.floor(card.getBoundingClientRect().x) - xAxisParent - margin ;
        let yAxis = Math.floor(card.getBoundingClientRect().y) - yAxisParent - margin;
      
        x = x + (cardWidth + 10);
      
        if(i % columns == 0 ){
            x = 0;
            y = y + 312;         
        }

        if(i == 0){
            y = 0;
            x = 0;
        } 
        
        card.animate([
           { 
                opacity: 0,
                transform: `translate3d(${xAxis}px, ${yAxis}px, 0)  `,

            },
            { 
                transform: ` translate3d(${x}px, ${y}px, 0) `,
                opacity: 1

            }

        ],{
            duration: 600,
            easing: 'ease-in',
            fill: 'forwards',
       
        })
    
        card.style.visibility = 'visible';
        card.style.transform = ` translate3d(${x}px, ${y}px, 0) `
    })

   /*get nro of rows to set height of container*/
   const nrRows = Math.ceil(showCards.length / columns);
    container.style.height = `${nrRows * (showCards[0].clientHeight +200)}px`
  
}

const changeHeroImg = (title) => {

    let selected ;
    if(title){
        selected =  movies.filter(movie =>  movie.title === title)[0]
    }
    else {
        return
    }
    
    heroImg.src = `https://image.tmdb.org/t/p/original${selected.backdrop_path}`;
}

const clickEventCards = (cards) => {

    cards.forEach(card => {
        let cardID;
        card.addEventListener('click', (e) => {

            /*flip card*/
            if(cardID){
                cardID = cardID
            }
            else {
                cardID = e.target.offsetParent.offsetParent.offsetParent.offsetParent.id;
            }
            const cardInner = document.getElementById(`${cardID}`).children[0];
    
            cardInner.classList.toggle('flip');

            /*change hero*/
            const title = e.target.offsetParent.offsetParent.offsetParent.offsetParent.dataset.title
            changeHeroImg(title)
        
        })
    })

}


/* Filter buttons functions*/
menuBtn.addEventListener('click', () => {
    const menu = document.querySelector('.filter-menu');
    menu.classList.toggle('active');

    menuBtn.classList.toggle('active');

})

btnOne.addEventListener('click', () => {
   let showCardsArr = cards.filter(card => {
        if( card.classList.contains('12')){
            return card
        }
    })
    let fadeCardsArr = cards.filter(card => {
        if( !card.classList.contains('12')){
            return card
        }
    })
    fadeCards(fadeCardsArr)
    translateCards(showCardsArr);

    
})

btnTwo.addEventListener('click', () => {
    let showCardsArr = cards.filter(card => {
        if( card.classList.contains('01')){
            return card
        }
    })
    let fadeCardsArr = cards.filter(card => {
        if( !card.classList.contains('01')){
            return card
        }
    })
   
    fadeCards(fadeCardsArr)
    translateCards(showCardsArr);

     
 })

 
btnThree.addEventListener('click', () => {
    let showCardsArr = cards.filter(card => {
         if( card.classList.contains('02')){
             return card
         }
     })
     let fadeCardsArr = cards.filter(card => {
         if( !card.classList.contains('02')){
             return card
         }
     })
     fadeCards(fadeCardsArr)
     translateCards(showCardsArr);
 
     
 })

btnAll.addEventListener('click', () => {
    translateCards(cards);


 })



window.addEventListener('load',() => {
    let positionFunc = setInterval(() => {
        getPosition()
        clearInterval(positionFunc)
    },2000)
})