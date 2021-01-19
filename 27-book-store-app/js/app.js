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

    let infoToDisplay = {};
    if(typeof(data) == 'string' ){
        let searchBook = favoriteBook.filter(item => item.title == data);
       
    
        infoToDisplay = {
            img: searchBook[0].img,
            title: searchBook[0].title,
            author: searchBook[0].author,
            publishers: searchBook[0].publishers,
            publish_date:searchBook[0].publish_date,
            description: searchBook[0].description
        }

    }
    else {
        infoToDisplay = {
            img: data.imgSrc,
            title: data.bookDetailHolder.title,
            author: data.bookDetailHolder.author,
            publishers: "",
            publish_date: "",
            description: ""
        }

        const infoToCheck = ["publishers", "publish_date", "description"]

    infoToCheck.forEach(item => {
    
        if(data[item] == undefined){
           infoToDisplay[item] = 'No information'
    
       }
       else {
        infoToDisplay[item]=  data[item]

        if(infoToDisplay[item] == 'description'){
            infoToDisplay[item] =   data[item].value
        }

       }
     })

    }


    console.log(infoToDisplay)

    const container = document.querySelector('.container')
    container.classList.add('noDisplay')
    
    const bookContainer = document.getElementById('book-detail')
    bookContainer.classList.add('display')

    // const infoToDisplay = {
    //     img: data.imgSrc,
    //     title: data.bookDetailHolder.title,
    //     author: data.bookDetailHolder.author,
    //     publishers: "",
    //     publish_date: "",
    //     description: ""
    // }

    // const infoToCheck = ["publishers", "publish_date", "description"]

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


    bookContainer.innerHTML = `
    <div class="go-back">
        <a href="#" onclick="backToHome(event)">Go Back</a>
    </div>
    <div class="book-detail-container">
        <div class="left">
            <div class="book-img">
                <img src="${infoToDisplay.img}" alt="">
            </div>
            <div class="book-fav">
                <a href="#" id="saveFavBtn" class="book-fav_link" onclick="saveFavorites('${infoToDisplay.img}','${infoToDisplay.title}','${infoToDisplay.author}')">Save to Favorites</a>
                <a href="" class="book-fav_link">Share</a>
            </div>
        </div>
        <div class="right">
            <h2>${infoToDisplay.title}</h2> 
            <h3>${infoToDisplay.author}</h3>
            <div class="details"> <!--sale de /books-->
                <p>Publisher: ${infoToDisplay.publishers[0]}</p>
                <p>Publish Date: ${infoToDisplay.publish_date}</p>
            </div>
            <div class="summary"> 
                <p>Description:</p>
               <p>
                  ${infoToDisplay.description}
               </p>
            </div>
        </div>
    </div>
    `


    const btnSaveFav = document.getElementById('saveFavBtn')
    let checkIsFav = favoriteBook.filter(item => item.title == infoToDisplay.title)

     if(checkIsFav.length == 1){

         if(checkIsFav[0].isSaved){
            btnSaveFav.innerHTML = 'Saved'
         }
     }

    displayTitleCat(`${infoToDisplay.title}`)
}


const prueba = () => {
    console.log(bookDetails)
}

const displayFav = () => {

    const favContainer = document.getElementById('fav-container')
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