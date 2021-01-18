/*SEARCH*/
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

searchBtn.addEventListener('click', () => {
    let userInput = searchInput.value;
    let search = userInput.split(' ').join('+')

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

    const container = document.querySelector('.container')
    container.classList.add('noDisplay')
    
    const bookContainer = document.getElementById('book-detail')
    bookContainer.classList.add('display')

    const infoToDisplay = {
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
       }
       
        
    })

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
                <a href="#" class="book-fav_link" onclick="saveFavorites('${infoToDisplay.img}')">Save to Favorites</a>
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
                  ${infoToDisplay.description.value}
               </p>
            </div>
        </div>
    </div>
    `
}

const displayFav = () => {
    console.log(favoriteBook)

    const favContainer = document.getElementById('fav-container')
    favContainer.classList.add('display')

    const favItemContainer = document.querySelector('.fav-book-container')
    favItemContainer.innerHTML = favoriteBook.reduce((html, book) => {
        return html + `
        <div class="cover-div">
            <a  href="#" >
                <img  src="${book}" alt="">
            </a>
        </div>
        `
    },"")
}

const closeFav = () => {
    const favContainer = document.getElementById('fav-container')
    favContainer.classList.remove('display')
}