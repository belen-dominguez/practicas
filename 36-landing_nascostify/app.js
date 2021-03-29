/* Intro div ANimation*/
const armMovementFun = (percetage) => {
    let startPosition = -14;
    let armMovement;

    if(startPosition < 50){
        armMovement = Math.round(startPosition + percetage);
    }
    if (armMovement > 50){
        armMovement = 50;
    }

    const arm = document.querySelector('.record-player');
    arm.style.transform = `rotateZ(${armMovement}deg)`;
}

let start = 0;
const introDivScrolling = (percentageScrolling) => {
    let introMovement = start - percentageScrolling

    const introDiv = document.querySelector('.intro-container')
    introDiv.style.transform = `translateX(${introMovement}%)`

    const socialDiv = document.querySelector('.intro-content .social');
    
    if(percentageScrolling > 15){
      
        let startPoint = 15;
        let move;
         
        if(percentageScrolling <= 20){
            move = 0;
        }
        if(percentageScrolling >= 20){
            move = startPoint - (percentageScrolling *1.5);
        }

        socialDiv.style.transform = `translateX(${move}%)`
    }

    const title = document.querySelector('.intro-content .title');

    if(percentageScrolling >= 20){
      
      /*
        para garantizar q siemrpe llegue a cero, lo pongo de forma manual.
        y para que muevo el title mas rapido multiplico el percentagescrolling por 1.5
      */

        let startPoint = 20;
        let move;
         
        if(percentageScrolling <= 25){
            move = 0;
        }
        if(percentageScrolling >= 25){
            move = startPoint - (percentageScrolling *1.5);
        }

       title.style.transform = `translateX(${move}%)`
    }

    const subTitle = document.querySelector('.intro-content h2')
   
    if(percentageScrolling >= 25){
        let startPoint = 25;
        let move;
         
        if(percentageScrolling <= 30){
            move = 0;
        }
        if(percentageScrolling >= 30){
            move = startPoint - (percentageScrolling *1.5);
        }

        subTitle.style.transform = `translateX(${move}%)`
    }
}

const btnShow = (percetage) => {
    const btn = document.querySelector('.btn-playlist');
    let opacity = percetage * 0.01;

    btn.style.opacity = `${opacity}`;
}

const scrollDiv = document.querySelector('header');

window.addEventListener('scroll', () => {

    /*aca saco el % en el cual estoy scrolleando*/
    let scrolling = window.pageYOffset
    let total = scrollDiv.scrollHeight - window.innerHeight;
    let percentageScrolling = Math.round((scrolling * 100) / total)
   //console.log('percentageScrolling', (scrolling * 100) / total )


   armMovementFun(percentageScrolling)
   introDivScrolling(percentageScrolling)
   btnShow(percentageScrolling)

   
})




/* Section Club ANimation*/
const numbers = [...document.querySelectorAll('.numbers .change')];
const numberTwo = document.querySelector('.change2')
const anims = ['anim-one', 'anim-two', 'anim-three', 'anim-four'];

const numberAnimationOne = () => {
   
    for(let i = 0; i < numbers.length; i++){    
        numbers[i].classList.add(`${anims[i]}`)
    }

    numberTwo.classList.add('anim-five')

}

  numberAnimationOne()

  /*restart animation*/
  setInterval(() => {
   
    for(let i = 0; i < numbers.length; i++){  

        numbers[i].classList.remove(`${anims[i]}`)

    }
    numberTwo.classList.remove('anim-five');

    /*retraso lo ejecucion de la funcion para que remueva bien la clase*/
    const restartAnim = setInterval(() => {
        numberAnimationOne()
        clearInterval(restartAnim)
    }, 2500)
  }, 30000)



  /* Footer logo animation*/
  
  window.addEventListener('scroll',() => {
      const footerLogo = document.querySelector('.footer-logo svg');
      let logoPosition = Math.round(footerLogo.getBoundingClientRect().top);

      if(logoPosition > 457 && logoPosition < 470) {
            footerLogo.animate([
                {
                    transform: 'rotateZ(0deg)'
                },
                {
                    transform: 'rotateZ(360deg)'
                }  
                ],{
                    duration: 1000,
                    easing: 'ease'  
                }
            )
      }

  })