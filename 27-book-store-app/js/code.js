/* app*/
/*Cat title*/
const displayTitleCat = (category) => {
    const titleCat = document.getElementById('show-cat');
    titleCat.innerHTML = category;
    
}

/*SEARCH*/
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');


searchBtn.addEventListener('click', () => {
    let userInput = searchInput.value;
    let search = userInput.split(' ').join('+')
    
    displayTitleCat(`${userInput} search`)
    fetchSearch(search);

    searchInput.value = "";
})

/*Back to home*/
const backToHome = (e) => {
    const container = document.querySelector('.container')
    container.classList.remove('noDisplay')
    
    const bookContainer = document.getElementById('book-detail')
    bookContainer.classList.remove('display')
}


/*display book info*/

const displayBookDetails = (data) => {
   
    if(typeof(data) == 'string' ){
        data = favoriteBook.filter(item => item.title == data)[0];
    }
    // else {
    //     infoToDisplay = {
    //         img: data.imgSrc,
    //         title: data.bookDetailHolder.title,
    //         author: data.bookDetailHolder.author,
    //         publishers: "",
    //         publish_date: "",
    //         description: ""
    //     }

    //     const infoToCheck = ["publishers", "publish_date", "description"]

    // infoToCheck.forEach(item => {
    
    //     if(data[item] == undefined){
    //        infoToDisplay[item] = 'No information'
    
    //    }
    //    else {
    //     infoToDisplay[item]=  data[item]

    //     if(infoToDisplay[item] == 'description'){
    //         infoToDisplay[item] =   data[item].value
    //     }

    //    }
    //  })

    // }

    if(favContainer.classList.contains('display')){
        favContainer.classList.remove('display')
    }

    // const container = document.querySelector('.container')
    container.classList.add('noDisplay')
    
    const bookContainer = document.getElementById('book-detail')
    bookContainer.classList.add('display')


    bookContainer.innerHTML = `
    <div class="go-back">
        <a href="#" onclick="backToHome(event)">Back to Home</a><span> / ${data.title}</span>
    </div>
    <div class="book-detail-container">
        <div class="left">
            <div class="book-img">
                <img src="${data.img}" alt="">
            </div>
            <div class="book-fav">
                <a href="#" id="saveFavBtn" class="book-fav_link" onclick="saveFavorites('${data.img}','${data.title}','${data.author}')">Save to Favorites</a>
                <a href="" class="book-fav_link">Share</a>
            </div>
        </div>
        <div class="right">
            <h2>${data.title}</h2> 
            <h3>${data.author}</h3>
            <div class="details"> 
                <p>Publisher: ${data.publishers}</p>
                <p>Publish Date: ${data.publish_date}</p>
            </div>
            <div class="summary"> 
                <p>Description:</p>
               <p>
                  ${data.description}
               </p>
            </div>
        </div>
    </div>
    `


    const btnSaveFav = document.getElementById('saveFavBtn')
    let checkIsFav = favoriteBook.filter(item => item.title == data.title)

     if(checkIsFav.length == 1){

         if(checkIsFav[0].isSaved){
            btnSaveFav.innerHTML = 'Saved'
         }
     }

    displayTitleCat(`${data.title}`)
}



const displayFav = () => {

   
    favContainer.classList.add('display')

    const favItemContainer = document.querySelector('.fav-book-container')

    favItemContainer.innerHTML = favoriteBook.reduce((html, book) => {
        return html + `
        <div class="fav-item">
            <a  href="#" onclick="displayBookDetails('${book.title}')">
                <img  src="${book.img}" alt="">
                <div>
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
            </a>
        </div>
        `
    },"")
}

const closeFav = () => {
    const favContainer = document.getElementById('fav-container')
    favContainer.classList.remove('display')
}

/*script*/
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

//    localStorage.setItem(`${cat}`, `${JSON.stringify(subjectBook)}` );

//    pruebaArr = JSON.parse(localStorage.getItem('prueba') || "[]");

  
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

   
    if(arrIMg[0].cover_i){
       
        container.innerHTML = arrReduce.reduce((html, book) => {
          
            return html + `
                <div class="cover-div" id="${book.cover_i}" data-authorLink="${book.author_key[0]}" data-author="${book.author_name[0]}" data-work="${book.key}" data-title="${book.title}">
                    <a  href="#book-detail" onclick="getBookDetails(event)">
                        <img class="imgData" id="${book.cover_i}" src="${book.imgURL}" alt="">
                        <h4>${book.title}</h4> 
                    </a>
                </div>
                `
         },"")
    }

    if(arrIMg[0].cover_id) {
        container.innerHTML = arrReduce.reduce((html, book) => {
           

            return html + `
            <div class="cover-div" id="${book.lending_edition}" data-authorLink="${book.authors[0].key}" data-author="${book.authors[0].name}" data-work="${book.key}" data-title="${book.title}">
                <a  href="#" onclick="getBookDetails(event)">
                    <img class="imgData" id="${book.cover_id}" src="${book.imgURL}" alt="">
                    <h4>${book.title}</h4> 
                    <p>${book.authors[0].name}</p>
                </a>
            </div>
            `
        },"")
    }

}



/*SEARCH*/
const fetchSearch = async (search) => {
    //const container = document.querySelector('.container')
  
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
                    
                    //bookInfo[item] =   bookDetails[item]
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
const saveFavorites = (image, title, author ) => {

    
    // let data = {
    //     img: image,
    //     title: title,
    //     author: author,
    //     publishers: bookDetails.publish_date[0],
    //     publish_date: bookDetails.publish_date,
    //     description: bookDetails.description,
    //     isSaved: ""
    // }
  
    
    const btnFav = document.querySelector('.book-fav_link')
    
    if(btnFav.innerHTML == 'Saved'){
        btnFav.innerHTML = 'Save to Favorites';
        //let index = favoriteBook.indexOf(data)
        let index = favoriteBook.indexOf(bookInfo)
        favoriteBook.splice(index, 1)
        
    }
    else {
        btnFav.innerHTML = 'Saved';
        //favoriteBook.push({...data, isSaved: true});
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