/*Create opening Hero */
const openingHeroLoad = (openingHero) => {
    openingHero.classList.add('intro');
    document.querySelector('body').appendChild(openingHero);
    
    openingHero.innerHTML = `
        <div class="intro-content">
            <div class="intro-content__image">
                <img src="./images/monk.png" alt="">
                <div class="mist">
                    <span></span><span></span><span></span><span></span><span></span><span></span>
                    <div class="mist-tail">
                        <span class="tail-item" ></span><span  class="tail-item"></span><span class="tail-item"></span>
                    </div>
                </div>
            </div>
            <div class="intro-content__text">
                <p>  </p>
            </div>
        </div>
    `
   
 
    const text = document.getElementsByClassName('intro-content__text')[0];

    const showText = setInterval(() => {
        text.style.textAlign = "center";
        text.innerHTML =  ' <p> Patience! </p>';
         clearInterval(showText);
     },500)

    
    const changeText = setInterval(() => {
        text.classList.add('translate');
        text.innerHTML =  ' <p>  Patience, <span> young padawan... </span></p>';
        clearInterval(changeText);
    },1200)


    const introContent = document.getElementsByClassName('intro-content')[0];
    let applyFade = setInterval(() => {
        introContent.classList.add('fadeOut');
        clearInterval(applyFade);
    },2200)

    /*hide inner content*/
    let hideInnerContent = setInterval(() => {
        introContent.style.visibility = "hidden";
        clearInterval(hideInnerContent);
    },2600)

}


/*Pagination Slide */
for(let i = 0; i <  slide.children.length; i++){
    paginationSlide.innerHTML += `
        <li id="pag-${i}" onclick="setPrevCurrentItems( '${slide.children[i].id}')">
          <p class="${i == 0 ? "active" : ""}">  ${i == 0 || i == 9 ? "" : i} </p>
        </li>
    `
}
