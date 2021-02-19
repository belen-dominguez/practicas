const slideImage = document.querySelector('.image-container');
const slide = document.querySelector('.slideshow');
const paginationSlide = document.querySelector('.pagination-detail__slide');
const arrowLeft = document.querySelector('.slideshow-arrows__left');
const arrowRight = document.querySelector('.slideshow-arrows__right');
const slideItems = [...document.querySelector('.slideshow').children];
let currentItem;
let currentIndex = 0;



window.addEventListener('load', () => {
    slideImage.classList.add('hidden');
    slideImage.nextElementSibling.classList.add('hidden');

    /* Create opening Hero */
    let openingHero = document.createElement('div');
    openingHeroLoad(openingHero);

    let removeOpening = setInterval(() => {
        document.querySelector('body').removeChild(openingHero);
        clearInterval(removeOpening);

        slideImage.classList.remove('hidden');
        slideImage.nextElementSibling.classList.remove('hidden');


        /* Set margin to align titles to arrows once slideIMage is visible*/
        if (window.innerWidth > 460){

            slideItems.forEach((item, i) => { 
                if(i == 0){
                    return
                }
                else {
                    item.style.marginTop = `${slide.offsetHeight *.4}px`;

                }
            })
    }
    },3500);
    
    /* Set current item to zero*/
    currentItem = slideItems.filter(item => !item.classList.contains('hidden'))[0];

    /* Disable left arrow when loaded  */
    if(currentIndex == 0){
        arrowLeft.style.visibility = "hidden";
    }

     /* Set first scroll position in mobile*/
    if (window.innerWidth < 460){
        slideImage.scrollTo(((slideImage.children[0].offsetWidth * 2.4)/ 100),0) ;
    }
    
})


/* Pagination style*/
const paginationStyle = (id) => {
    for(let i = 0; i < paginationSlide.children.length; i++) {
            
        paginationSlide.children[i].children[0].classList.remove('active');

        if( paginationSlide.children[i].id == id){

            paginationSlide.children[i].children[0].classList.add('active');
        }
    }
}

/* Change slide*/
const changeSlidePagination = (pagItem = 'pag-0', slideNr = 'slide-0') => {

    /*show pagination content*/
    const paginationIntro = document.querySelector('.pagination-intro');
    const paginationDetail = document.querySelector('.pagination-detail__text');
    
    switch(slideNr){
        case 'slide-0':
            paginationIntro.innerHTML = " <p>In January 2011, after a decade of digital, we opened the doors to our template. Follow our noble eightfold path to digital enlightenment here.</p>";
            paginationDetail.innerHTML = "";
            break;
        case 'slide-1':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 1 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-2':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 2 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-3':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 3 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-4':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 4 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-5':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 5 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-6':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 6 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-7':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 7 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-8':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "<p>Step 8 out of 8 on the path of digital enlightenment</p>";
            break;
        case 'slide-9':
            paginationIntro.innerHTML = "";
            paginationDetail.innerHTML = "";
            break;
    };

    /*add pagination style*/
    paginationStyle(pagItem);
 
}


/*Scroll image function*/
const scrollImage = (index) => {

    let maxScroll;
    if (window.innerWidth < 600) {
        maxScroll = slideImage.scrollWidth ;
    }
    else {
        maxScroll = slideImage.scrollWidth - window.innerWidth; 
    }
    
    /*where img ends */
    let imgWidth;
    if (window.innerWidth < 600){
        imgWidth = slideImage.scrollWidth  - (window.innerWidth * 2);
    }
    else {
        imgWidth = maxScroll - (window.innerWidth * 0.7);
    }
    
    /*array whith percetange of scrolling at every point */
    let sections = [];
    if (window.innerWidth < 600){
        sections = ["2.4","18.8","25","30.6","43","55","73",imgWidth,imgWidth,maxScroll];
    }
    else {
        sections = ["0","10.2","17.4","27.9","38.4","48.9","60",imgWidth,imgWidth,maxScroll];
    }
    
  
    const getPx = sections.map(item => {
        /*to calculate percentage*/
        let totalWidth = slideImage.children[0].clientWidth;
    

        if(item == imgWidth){
            return imgWidth
        }
        else if (item == maxScroll){
            return maxScroll
        }
        else {
            return Math.round((item * totalWidth) / 100);
        }
    })

    slideImage.scrollTo(getPx[index],0);
}


/*Display current items and apply effects*/
const displayCurrentItem = (previous, current) => {
    const paginationText = document.querySelector('.pagination-detail__text');

    /*step 1: fade previous title*/
    previous.classList.toggle('fadeOut');
    paginationText.classList.toggle('fadeOut');

    previous.classList.toggle('fadeIn');
    paginationText.classList.toggle('fadeIn');

    /*step 2: scroll img and hide previous title*/
 
    let stepTwo = setInterval(() => {
        scrollImage(currentIndex);

        slideItems.forEach(item => {
            item.classList.add('hidden');
        })
       
        clearInterval(stepTwo);
    },500)
    
    /*step 3: show current title */
    let stepThree = setInterval(() => {

        previous.classList.toggle('fadeOut');
        paginationText.classList.toggle('fadeOut');

        paginationText.classList.toggle('fadeIn');

        current.classList.toggle('fadeIn');
        current.classList.remove('hidden');
        changeSlidePagination(`pag-${currentIndex}`, `slide-${currentIndex}`);
 
        clearInterval(stepThree);
    },1300)

}



/*Pagination functions*/
const setPrevCurrentItems = (id) => {
    /*set currentIndex - used for changeSlidePagination()*/
    currentIndex = Number(id.split('-')[1]);
    arrowVisibility();

    let previousItem = currentItem;
    currentItem = slideItems.filter(item => item.id == id)[0];

    displayCurrentItem(previousItem, currentItem);
}


/*Arrows functions*/
const arrowVisibility = () => {

    if(currentIndex == 0) {
       arrowLeft.style.visibility = 'hidden';
    }
    else {
      
       let slowShow =  setInterval(() => {
        arrowLeft.style.visibility = 'visible';
        clearInterval(slowShow);
        },1400)
    }

    if(currentIndex === slideItems.length - 1) {
        arrowRight.style.visibility = 'hidden';
    }
    else {
       let slowShow =  setInterval(() => {
        arrowRight.style.visibility = 'visible';
        clearInterval(slowShow);
        },1400)
    }

}

arrowLeft.addEventListener('click', () => {
    let previousItem = currentItem;

    currentIndex = currentIndex - 1;
    currentItem = slideItems[currentIndex];
    arrowVisibility();

    displayCurrentItem(previousItem, currentItem);
})
arrowRight.addEventListener('click', () => {
    let previousItem = currentItem;

    currentIndex = currentIndex + 1;
    currentItem = slideItems[currentIndex];
    arrowVisibility();
 
    displayCurrentItem(previousItem, currentItem);
})


