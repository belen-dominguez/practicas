/*Main card animation */
const cardContainer = document.querySelector('.container');
const startMoveCardIntro = Math.round(cardContainer.getBoundingClientRect().top / 2);
const endMoveCardIntro = Math.round(cardContainer.getBoundingClientRect().bottom);

const moveMainCard = (scrolling) => {
    let startTransX = 430;
    let startRot = 40;
    let startScale = 0.90;

    let totalScroll = cardContainer.clientHeight; //600px
    let startPoint =  scrolling - startMoveCardIntro; //scrolling sea 0
    let percentageScroll = (startPoint * 100) / totalScroll; //saco porcentage de scroll


    /* translate movements*/
    let transXMovePX = (percentageScroll * startTransX) / 100; //soca los px que se mueve
    let transXMove = Math.round(transXMovePX - startTransX); // tiene q ir de 430 a 0

    if(transXMove >= -20) {
        transXMove = 0;
    }

  
    /* Rotate movements*/
    let rotMovePX = (percentageScroll * startRot) / 100; 
    let rotMove = Math.round(startRot - rotMovePX); 

    if(rotMove <= 5) {
        rotMove = 0;
    }

    /*Scale movements*/
    let scaleMovePX = (percentageScroll * startScale) / 100; 
    let scaleMove = scaleMovePX + startScale; 

    if(scaleMove >= 1) {
        scaleMove = 1;
    }

   // console.log(scaleMove)

   const cardMain = document.querySelector('.intro-card-container');
   cardMain.style.transform = `translate3d(0px, ${transXMove}px, -250px) rotateX(${rotMove}deg) scale(${scaleMove})`


}


/*Instruction cards animation*/
const moveInstructionCards = () => {
  const cards = document.querySelectorAll('.intruction-card');

  cards.forEach(card => {
      card.classList.add('animation');
  })
}

/*Card group animation*/
const moveCardGroup = () => {
    const cardGroup = document.querySelector('.cards-group');
    const cards = document.querySelectorAll('.card-item');

    cards.forEach(card => {
        card.classList.add('animation');
    })
    cardGroup.classList.add('animation');
}

/*Cursor MOvement */
const cardGroup = document.querySelector('.cards-group');
const cursor = document.querySelector('.cursor');

cardGroup.addEventListener('mouseenter', () => {
    cursor.style.opacity = 1;
})
cardGroup.addEventListener('mouseleave', () => {
    cursor.style.opacity = 0;
})
cardGroup.addEventListener('mousemove', (e) => {

    let moveX = e.pageX;
    let moveY = e.pageY;

    cursor.style.left = moveX + "px";
    cursor.style.top = moveY  + "px";
})

/*agrander el cursor*/
const btnPLan = document.querySelector('.cards-group .card-item .btn-blue');
btnPLan.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(1.5)'
})
btnPLan.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)'
})


/* Gallery movement*/
const galleryContainer = document.querySelector('.gallery');
const galleryStart = Math.round(galleryContainer.getBoundingClientRect().top - window.innerHeight )

const galleryMovement = (scrolling) => {
    const galleryOne = document.querySelector('.gallery-one');
    const galleryTwo = document.querySelector('.gallery-two');

    let startX = 200;
    let totalScroll = Math.round(galleryContainer.getBoundingClientRect().top + window.innerHeight);
    let startPoint = scrolling - galleryStart;
    let percentageScroll = Math.round((startPoint * 100) / totalScroll);

    if(percentageScroll >= 100) {
        percentageScroll = 100
    }

    let xMove = (percentageScroll * startX) / 100;

     galleryOne.style.transform = `translate3d(${-xMove}px,0,0)`;
     galleryTwo.style.transform = `translate3d(${xMove - 200}px,0,0)`;
}


/* Scroll handler*/

window.addEventListener('scroll', () => {
    let windowVP = window.innerHeight
    let scrolling = window.pageYOffset;
  
   /*Main card animation */
    if(scrolling >= startMoveCardIntro && scrolling <= endMoveCardIntro){
        moveMainCard(scrolling);
    }


    /*Instruction cards animation*/
   const instructionCards = document.querySelector('.instruction-cards');
   let instructionPosition = Math.round(instructionCards.getBoundingClientRect().top);

   if(instructionPosition < (windowVP / 1.5)){
        moveInstructionCards()
   }

    /*Card group animation*/
    let cardGrpPosition = Math.round(cardGroup.getBoundingClientRect().top);
 
    if(cardGrpPosition <= 300){
         moveCardGroup()
    }

    /* Gallery movement*/
    if(scrolling >= galleryStart){
        galleryMovement(scrolling)

    }

    /*Slide movement*/
    // const slidePosition = Math.round(cardSlideContainer.getBoundingClientRect().top)

    // if(slidePosition <= 0){
    //     slideHandler(scrolling)
    //     titleHandler( scrolling)
    // }
   

})






/*Card slide */
// const cardSlideContainer = document.querySelector('.slide-container');
// const title = document.querySelector('.card-slide .title');
// const startCardPoint = Math.round(cardSlideContainer.getBoundingClientRect().top ) 

// const titleHandler = ( scrolling) => {
    
//     const subTitle = document.querySelector('.card-slide .title .fade');

    
//     let opacityTotal = 1;
//     let totalScroll = (cardSlideContainer.clientHeight / 8); // /8 para que en 1/8 de scrolleo ya cambie la opacidad
//     let startPoint =  scrolling - startCardPoint;  //hace q arranque en cero.

//     let movePercentage = (startPoint * 100) / totalScroll;
//     if(movePercentage >= 100){
//         movePercentage = 100
//     }
//     let movePx = (movePercentage * opacityTotal) / 100;
//     let opacity =  1 - movePx;
   
//      subTitle.style.opacity = opacity
   
// }
// const slideHandler = (scrolling) => {
//     const cards = document.querySelectorAll('.slide-card');

//     let finalScale = 0.6;
//     let finalTranX = 30;
//     let finalTranZ = 50;
//     let finalRotX = 70;

//     let totalScroll = (cardSlideContainer.clientHeight / 2)
//     let startPoint = scrolling - startCardPoint;
//     let percentage = (startPoint * 100) / totalScroll;
//     if(percentage >= 100){
//         percentage = 100
//     }

//     /*scale movement*/
//     let scaleMove = (percentage * finalScale) / 100;

//     /*translate movement*/
//     let transXMove = Math.round((percentage * finalTranX) / 100);
//     let transZMove = Math.round((percentage * finalTranZ) / 100);
 
//     /*rotate movement*/
//     let rotateMove = (percentage * finalRotX) / 100;
   
//     cards[0].style.transform = `translate3d(0px, ${transXMove}px, ${-transZMove}px) rotateX(${rotateMove}deg) scale(${scaleMove})`
//     // cards.forEach(card => {
//     //     card.style.transform = `translate3d(0px, ${transXMove}px, ${-transZMove}px) rotateX(${rotateMove}deg) scale(${scaleMove})`
//     // })
// }