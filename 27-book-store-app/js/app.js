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


/*display all book*/
const dislayAllBooks = (arrIMg,arrReduce) => {

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

/*display book info*/

const displayBookDetails = (data) => {
   
    if(typeof(data) == 'string' ){
        data = favoriteBook.filter(item => item.title == data)[0];
    }
   
    if(favContainer.classList.contains('display')){
        favContainer.classList.remove('display')
    }

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
                <a href="#" id="saveFavBtn" class="book-fav_link" onclick="saveFavorites()">Save to Favorites</a>
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


/*display favorites*/
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