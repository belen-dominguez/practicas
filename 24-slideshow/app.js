let tabContainer = document.querySelectorAll('.tab-container')
const allContainers = document.querySelectorAll('.container')
const slideContainer = document.querySelector('.slides')
const nroSlides = document.querySelectorAll('.slides');
let slides = document.querySelectorAll('.slide')
slides = Array.from(slides)
const btnPrev = document.querySelectorAll('.btn-prev');
const btnNext = document.querySelectorAll('.btn-next');


const addActiveClassChild = (firstchild) => {
    
    let  containerWidth, nrOfChildActive
    
    nrOfChildActive= 0;
    
    let slideItem   = firstchild.parentElement
    containerWidth = slideItem.offsetWidth
    nrOfChildActive = Math.round(containerWidth/firstchild.offsetWidth);
        
    for(let j = 0; j < nroSlides.length; j++){
        
        for (let i = 0; i < nrOfChildActive; i++){
            
            slideItem.children[i].classList.add('active')
        }
    }  
  
}

const prevOneSlide = (currentItem, e) => {  
    let slideChildren = e.target.offsetParent.previousElementSibling.children
    slideChildren = Array.from(slideChildren)
    
    
    if (currentItem == 0){
        slideChildren[currentItem].classList.remove('active')
        currentItem = (slideChildren.length - 1)
        slideChildren[currentItem].classList.add('active')
    }
    else {
        slideChildren[currentItem].classList.remove('active')
        slideChildren[--currentItem].classList.add('active') //aca al currentItem 
    }
}

const nextOneSlide = (currentItem, e) => {
    let slideChildren = e.target.offsetParent.parentElement.firstElementChild.children
    slideChildren = Array.from(slideChildren)
    
    if (currentItem == (slideChildren.length - 1)){
        slideChildren[currentItem].classList.remove('active')
        currentItem = 0
        slideChildren[currentItem].classList.add('active')
    }
    else {
        slideChildren[currentItem].classList.remove('active')
        slideChildren[++currentItem].classList.add('active')
    }
}

const prevMultiSlide = (e) => {
    
    let slideChildren = e.target.offsetParent.previousElementSibling.children
    slideChildren = Array.from(slideChildren)
    
    let currentItem = []; //este arr va a tener los indices de los slides que necesito mostrar con active

    for(item in slideChildren){
      
      if(slideChildren[item].className.includes('active')){
         currentItem.push(item)
       }
    }
    
    
    for(let i = 0; i < slideChildren.length; i++){
        slideChildren[i].classList.remove('active')
    }

    if(currentItem.length == 1){
        prevOneSlide(currentItem, e)
    }
    
    currentItem.pop()

    if (currentItem[0] == 0){

        let nroItemsArr = currentItem.length

        if(nroItemsArr == 1){ //este sirve para cuando muestro 2 imgs - 50%

            currentItem[0] = (slideChildren.length - 1);
        }
        else if(nroItemsArr > 1){
           

            let j = nroItemsArr 
            for(let i = 0; i < nroItemsArr; i++){ 
                
                currentItem[i] = (slideChildren.length - j);
              
                j--
            }
        }
    }
    
    let newItem = currentItem[0] -- ;
    currentItem.push(newItem)
    
    slideChildren.forEach((item, i) => {

        if(slideChildren[currentItem[i]]){

            slideChildren[currentItem[i]].classList.add('active')
        }
        else {
            return
        }
        
    })

}
const nextMultiSlide = (e) => {

    let slideChildren = e.target.offsetParent.parentElement.firstElementChild.children
    slideChildren = Array.from(slideChildren)

   let currentItem = [];

   for(item in slideChildren){
     
    if(slideChildren[item].className.includes('active')){
        currentItem.push(item)
      }
   }
   
   for(let i = 0; i < slideChildren.length; i++){
       slideChildren[i].classList.remove('active')
   }

   if(currentItem.length == 1){
        nextOneSlide(currentItem, e)
    }
   /*aca elimino el primer item del array porq necesito que se le quite la clase active*/
    currentItem.shift()
   
   let lastIndex = currentItem.length - 1;

   if (currentItem[lastIndex] == (slideChildren.length - 1)){

        let nroItemsArr = currentItem.length

        if(nroItemsArr == 1){ //este sirve para cuando muestro 2 imgs - 50%
            currentItem[lastIndex] = 0;
        }
        else if(nroItemsArr > 1){
            
            let j = (nroItemsArr - 1)
            for(let i = 0; i < nroItemsArr; i++){ 

                currentItem[lastIndex - j] = i;
                j--
            }
        }
    }
    
    let newItem = currentItem[lastIndex] ++ ;
    currentItem.push(newItem)
    
   slideChildren.forEach((item, i) => {

       if(slideChildren[currentItem[i]]){

           slideChildren[currentItem[i]].classList.add('active')
       }
       else {
           return
       }
       
   })
}

const initSlidesonTab = (slideContainerId) => {

    const slideContainer = document.getElementById(`${slideContainerId}`).children[0]

    let slides = slideContainer.children
    slides = Array.from(slides);

    for(let i=0; i< slides.length; i++){

        if(slides[i].classList.contains('active')){
            slides[i].classList.remove('active')
        }
    }

    slides.forEach((slide, i) => {

        if(i == 0){
            slide.classList.add('active')
            addActiveClassChild(slide)
        }
    })
}

/* aca me fijo que contnedores tienen la clase active y a los primeros hijos las aplico el active para dsps calcular el width*/
const initSlides = () => {
    let slides;

    for(let i= 0; i < allContainers.length; i++){

        if(allContainers[i].classList.contains('active')){

            slides = allContainers[i].children[0].children
            slides = Array.from(slides);

            slides.forEach((slide, i) => {

                if(i == 0){
                    
                    slide.classList.add('active')
            
                    addActiveClassChild(slide )
                    
                }
                
            })
        }
    }
}


for(let i = 0; i < btnPrev.length; i++){
  
    btnPrev[i].addEventListener('click', prevMultiSlide )
}

for(let i = 0; i < btnNext.length; i++){
  
    btnNext[i].addEventListener('click', nextMultiSlide )
}

const openTab = (e, item) => {
    
    let tabContainerChildren = e.target.parentNode.children
    
    for (i = 0; i < tabContainerChildren.length; i++) {
        tabContainerChildren[i].classList.remove('active')
        
    }

    e.target.classList.add('active')

   let tabcontent = e.target.parentNode.parentNode.children
   
    for (i = 1; i < tabcontent.length; i++) {
       
         tabcontent[i].classList.remove('active')

         if(tabcontent[i].id){

            if(tabcontent[i].id == item){
                tabcontent[i].classList.add('active')
            }
         }
    }
    
    initSlidesonTab(item)
}

const openTabDestination = ( e) => {
    
    let selectedCountry = e.target.options.selectedIndex;
    const countryOptions = document.querySelectorAll('.country-destinations')

    countryOptions.forEach(item => {
        
        if(item.id === countryOptions[selectedCountry].id){
            item.classList.add('active')
        }
        else {
            item.classList.remove('active')
        }
        
    })
    
    let selectedName = e.target.options[selectedCountry].value
    
    initSlidesonTab(selectedName)

}

const initSlidesOnClassChange = () => {

}

const chageNroSlide = (nr, selectedBtn) => {

    /*seleccionamos el contenedor de los btn y agregar class Active al btn seleccionado*/
    let selectedParentSlide = selectedBtn.parentNode.attributes.id.value;
    let allChangeSlideBtn = document.querySelector('#'+`${selectedParentSlide}`).children
    
    for(let i = 0; i< allChangeSlideBtn.length; i++){
        allChangeSlideBtn[i].classList.remove('activeBtn')
    }
    selectedBtn.classList.add('activeBtn')

    /*filtro x el tab que este active*/
   tabContainer = Array.from(tabContainer)
   const activeTab = tabContainer.filter(item  => {
       return item.className.includes('active')
   })

   /*selecciono los hijos del slide de dicho tab*/
   let activeSlide = activeTab[0].children[0].children
    let checkActualClass = activeSlide[1].classList
    let actualClass;

    /*aca modificamos la clase por la que selecciono el usuario*/
    for(let i= 0; i < checkActualClass.length; i++){
        if(checkActualClass[i].includes('-c')){
            actualClass = checkActualClass[i]
        }
    }
    
    let toReplace = actualClass.split('-')[1]
    let newStr = 'c' + nr;
    let newClass = actualClass.replace(toReplace, newStr);


    activeSlide = Array.from(activeSlide)

    activeSlide.forEach(item => {
        item.classList.remove(actualClass);
        item.classList.remove('active');
        item.classList.add(newClass);
    })

    activeSlide.forEach((slide, i) => {

        if(i == 0){
            
            slide.classList.add('active')
    
            addActiveClassChild(slide )
            
        }
        
    })

}

initSlides()