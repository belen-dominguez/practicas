

/*Illustration animation*/
const illusContainer = document.querySelector('.illustration');
const bag = document.querySelector('.img-bag');
const rocket = document.querySelector('.img-rocket-ill');
const winPort = window.innerHeight ;

const bagMovement = (percentage) => {

    /*calc move del bag a 200px*/
    let bagEnd = 200;
    let bagMove = 0;

    if(bagMove < 200){
        bagMove = Math.round( ( percentage * bagEnd ) / 100 );
    }
    if(bagMove > 200) {
        bagMove = 200; 
    }

     bag.style.transform = `translate3d(${bagMove}px,0,0)`
};

const rocketMovement = (percentage) => {

    /*calc move del rocket a -240px*/
    let rocketEnd = 240;
    let rocketMove = 0;

    if(rocketMove < 240){
        rocketMove = Math.round( ( percentage * rocketEnd ) / 100 );
    }
    if(rocketMove > 240) {
        rocketMove = 240; 
    }

    rocket.style.transform = `translate3d(-${rocketMove}px,0,0)`
};

const titleAnimation = () => {
    const titles = document.querySelectorAll('.title-anim');

    titles.forEach(title => {
        let position = Math.round(title.getBoundingClientRect().top);
        let startPoint =  position - winPort;
        let movement;

        if(startPoint <= 0){
            let total = 120;
            let percentage = (startPoint * 100) / total;
            let opacityScale;
           
            if(startPoint >= -120){
                opacityScale = -(percentage / 100);
                movement = startPoint
            }
            else {
                movement = -120
                opacityScale = 1;
            }


            title.style.transform = `translate3d(0, ${movement}px, 0) scale(${opacityScale})`

            title.style.opacity = opacityScale;

        }
    })
};

const cardAnimation = () => {
    const cards = document.querySelectorAll('.card');
    const imageHolder = document.querySelector('.uses-images');
    
    let position = Math.round(imageHolder.getBoundingClientRect().top);
    let startPoint = position - (winPort / 2);
    let movement;
    let slowMove;

    

    if(startPoint < 0 && startPoint > -300){
        movement = startPoint * .7;
        
    }
     if(startPoint < -300) {
        movement = -200
    }
    if(startPoint < 0 && startPoint > -1200){ 
        slowMove = startPoint *.2;
    }
    if(startPoint < -1200){
        slowMove = -240
    }

         cards[0].style.transform = `translate3d(0,${movement}px,0)`;
         cards[1].style.transform = `translate3d(0,${-slowMove }px,0)`;
}

window.addEventListener('scroll', () => {
    

    /*saco cant que necesito scrollear para qe los elementos se acomoden dnd quiero. esto es llegando al final del div ya se tienen q acomodar*/
    const illusContainerBottom = Math.round(illusContainer.getBoundingClientRect().bottom);


    /*si quiero q la bolsa se acomode a la mitad del div (mitad del VP) entonces tendria que aplicar lo siguiente*/
    // const illusContainerHeight = Math.round(illusContainer.getBoundingClientRect().height)
    // const totalScroll = illusContainerBottom - (illusContainerHeight / 2)

    /*saco % de scrolling hasta totalScroll*/
    let pageScroll = window.pageYOffset;
    let percentageScrolling = (pageScroll * 100) / illusContainerBottom;
    
    /*Bag & rocket movement*/
    bagMovement(percentageScrolling)
    rocketMovement(percentageScrolling)

    /*Tile animations */
    titleAnimation()

    /*Sec Uses animation*/
    cardAnimation()
    

})



// /* DEscription section*/
const imgContainer = [...document.getElementsByClassName('img')];
const slideOne = document.querySelector('.slide1');
const slideTwo = document.querySelector('.slide2');
/*
    start = desde afuera de event scroll, asi me da un valor estatico
    lo metemos adentyro de setInterval para que de el valor exacto despues de se cargan todos los elementos. caso contrario da un valor incorrecto.
*/
let start;
const afterLoad = setInterval(() => {
    start = Math.round(slideOne.getBoundingClientRect().top );

    clearInterval(afterLoad)
},1000)



const moveParts = (scroll) => {
    const top = document.querySelector('.top');
    const window = document.querySelector('.window');
    const bottom = document.querySelector('.bottom');


    /*
    1) startPoint -> hace que cuando empiezo a scrollear en (0,0) el prmer slide, el nro seo 0 y vaya incrementando/disminuyendo segun el scroll
    */
    let startPoint =  scroll - start;

    /*
    2) al height del div lo /2, porq quiero que a la mitad ya este todo alineado
    */
    let totalHeight = slideTwo.clientHeight / 2;
    /* 
    3) saco el porcentage de scrolleo de startPoint sobre mi totalHeight
    */
    let percentage = (startPoint * 100) / totalHeight;

    /*
    4) ahora con ese procentage saco los pixeles q tengo que mover de cada parte.
    cual es el total de cada parte q tiene q desplaarse:
        a) top: 57px sobre Y
        b) window: 220px sobre X
        c) bottom: -10px sobre Y
    */
    const totalTop = 57;
    const totalWindow = 190;
    const totalBottom = 10;

    let moveTop = Math.round((percentage * totalTop) / 100);
    let moveWindow = Math.round((percentage * totalWindow) / 100);
    let moveBottom  = Math.round((percentage * totalBottom) / 100);

    /*ahora si se pasa de mi total, le digo que se mantengo en ese valor*/
    if(moveTop >= totalTop){
        moveTop = totalTop
    }
    if(moveWindow >= totalWindow){
        moveWindow = totalWindow
    }
    if(moveBottom >= totalBottom){
        moveBottom = totalBottom
    }

    top.style.transform = `translate3d(0,${moveTop}px,0)`;
    window.style.transform = `translate3d(${moveWindow}px,0,0)`;
    bottom.style.transform = `translate3d(0,-${moveBottom}px,0)`;

}



window.addEventListener('scroll', () => {

    let scroll = window.pageYOffset;
    let divHeight = slideOne.clientHeight;

    console.log(scroll, start)
   
     /*start = donde arranca (0,0) el primer slide, hacemos que se ejecute funcion para mover las partes */
    if(scroll >= start) {
        moveParts(scroll)

    }


    /*que reduzca la altura del div slide1 cuando el VP coincide con el (0,0) del 1er slide*/
    if(scroll >= start ){
        let heightTwo = slideTwo.getBoundingClientRect().top;

        if(heightTwo <= 30){
            heightTwo = 0
        }
        imgContainer[0].style.height = `${heightTwo}px`;
        
        /* prueba para reducir el img2 cuando se agranda el 1 y viceversa*/
        // let heightThree = divHeight - heightTwo;
        // imgContainer[1].style.height = `${heightThree}px`;
       
    }


     /*que reduzca la altura del div slide2 cuando el VP coincide con el (0,0) del 2er slide*/
    if(scroll > (start + divHeight )){

        const slideThree = document.querySelector('.slide3');
        /*el top va disminuyendo hasta llegar a cero cuando se alinea ala coordenada (0,0), por ende me sirve para achicar el height del segundo contenedor*/
        let heightThree = slideThree.getBoundingClientRect().top;
        
        if(heightThree <= 30){
            heightThree = 0
        }
        imgContainer[1].style.height = `${heightThree}px`;
    }


})