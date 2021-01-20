const container = document.querySelector('.container');
const bookContainer = document.getElementById('book-detail');
const favContainer = document.getElementById('fav-container');

let subjectBook = []
let arrIMgCover = []

const getProducts = async (category) => {

    if(container.classList.contains('noDisplay')){
        container.classList.remove('noDisplay')
        bookContainer.classList.remove('display')
    }
    
    let url = `https://openlibrary.org/subjects/${category}.json?limit=50`
    
    const response = await fetch(url)
    const data = await response.json()
    
    subjectBook = data.works
    subjectBook && getImgCover(subjectBook)
    displayTitleCat(category)

}


const getImgCover = async (arrBooks) => {

     let arrID =  arrBooks.map(book => {

        if(book.cover_id){
            return book.cover_id
        }
        if(book.cover_i){
            return book.cover_i
        }

    })

    for(let i=0; i < arrID.length; i++){

        if(arrID[i] == undefined){
            arrID[i] = 442957;

        }
       let imgURL = `https://covers.openlibrary.org/b/id/${arrID[i]}-M.jpg`

       arrBooks[i] = {...arrBooks[i], imgURL}
       
    }

   showImg(arrBooks)
}


const showImg = (arrIMg) => {

    const infoToCheck = ["author_key", "author_name", "key", "lending_edition", "authors","title", "cover_i", "cover_id","imgURL" ]


    let arrReduce = arrIMg.map(( item) => {
            /*aca solo levanto las props de cada item*/
        return filter = Object.keys(item)
             /*filtro cada item para que me devuelva las props que encesito*/
            .filter(key => {
                return  infoToCheck.includes(key)
                
            })
             /*que me devuelva por cada item nu objecto con las prop que necesito*/
            .reduce((obj, key) => {
                
                obj[key] = item[key]
                return obj
            },{})
     })


     for(let i = 0; i< infoToCheck.length; i++){

        for (let j = 0 ; j< arrReduce.length; j++){
            
            if(arrReduce[j][infoToCheck[i]] == undefined){
    
                arrReduce[j][infoToCheck[i]] = "No information"
            }
        }
     }

   
     dislayAllBooks(arrIMg,arrReduce)
   

}



/*SEARCH*/
const fetchSearch = async (search) => {

    if(container.classList.contains('noDisplay')) {
        container.classList.remove('noDisplay')    
    }

    let searchResults = [];
    const url = `https://openlibrary.org/search.json?q=${search}&limit=20`

    const response = await fetch(url);
    const data = await response.json()

    searchResults = [...data.docs]

    getImgCover(searchResults)
}


/*Book details*/
let bookDetails = {}
let bookInfo = {}
const fetchBookDetails = async (urlWork, urlBook, imgSrc, bookDetailHolder) => {
    const responseBook = await fetch(urlBook);
    const dataBook = await responseBook.json();

    const responseWork = await fetch(urlWork);
    const dataWork = await responseWork.json();

    bookDetails = {...dataBook, ...dataWork, imgSrc, bookDetailHolder}

    bookInfo = {
        img: imgSrc,
        title: bookDetailHolder.title,
        author: bookDetailHolder.author,
        publishers: "",
        publish_date:"",
        description: ""
    }

    const infoToCheck = ["publishers", "publish_date", "description"]
    
    infoToCheck.forEach(item => {
    
        if(bookDetails[item] == undefined){
            bookInfo[item] = 'No information'
        }
        else {
            
            if(item == 'description'){
                
                if(typeof( bookDetails[item]) == 'object'){

                    bookInfo[item] = bookDetails[item].value
                }
                else {
                
                    bookInfo[item] = bookDetails[item]
                }
            }
            else if(item == 'publishers'){
                bookInfo[item] = bookDetails[item][0]
            }
            else {

                bookInfo[item]=  bookDetails[item]
            }
        }
     })

    displayBookDetails(bookInfo)
}


const getBookDetails =  (e) => {
    const bookDetailHolder = e.target.parentElement.parentElement.dataset;
    const imgSrc = e.target.src
  

    /*diferencia entre url de works y book es q al id se le cambia la ultima letra. works es W y book es M */
    let bookRefrence = bookDetailHolder.work.split('/')[2].split('');
    let index = bookRefrence.length -1;
    bookRefrence.splice(index, 1, 'M');
    let bookID = bookRefrence.join('');

    const urlWork = `https://openlibrary.org${bookDetailHolder.work}.json`
    const urlBook = `https://openlibrary.org/books/${bookID}.json`
    
     fetchBookDetails(urlWork, urlBook, imgSrc, bookDetailHolder)

}


/*favorites*/
const favoriteBook = []
const saveFavorites = ( ) => {

    
    const btnFav = document.querySelector('.book-fav_link')
    
    if(btnFav.innerHTML == 'Saved'){
        btnFav.innerHTML = 'Save to Favorites';
        let index = favoriteBook.indexOf(bookInfo)
        favoriteBook.splice(index, 1)
        
    }
    else {
        btnFav.innerHTML = 'Saved';
        favoriteBook.push({...bookInfo, isSaved: true});
    }
    
    const favQty = document.getElementById('fav-qty');
    favQty.innerHTML = (favoriteBook.length)
}


/*change Slide*/
let currentItem = 0;
const changeSlide = (number) => {
    const slideItems = document.querySelectorAll('.slide-item')

    for(let i = 0; i < slideItems.length; i++){
        slideItems[i].classList.add('noDisplay')
    }

    currentItem = currentItem + number

    if(currentItem < 0){
        currentItem = (slideItems.length - 1)
    }
    if(currentItem > (slideItems.length - 1)){
        currentItem = 0
    }

    slideItems[currentItem].classList.remove('noDisplay');

}

getProducts('horror')