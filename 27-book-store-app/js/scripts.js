const container = document.querySelector('.container');
const bookContainer = document.getElementById('book-detail')

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
let prueba5 = {}
const fetchBookDetails = async (urlWork, urlBook, imgSrc, bookDetailHolder) => {
    const responseBook = await fetch(urlBook);
    const dataBook = await responseBook.json();

    const responseWork = await fetch(urlWork);
    const dataWork = await responseWork.json();

    bookDetails = {...dataBook, ...dataWork, imgSrc, bookDetailHolder}

    prueba5 = {
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
            prueba5[item] = 'No information'
        }
        else {
            
            if(item == 'description'){
                
                if(typeof( bookDetails[item]) == 'object'){
                    
                    //prueba5[item] =   bookDetails[item]
                    prueba5[item] = bookDetails[item].value
                }
                else {
                
                    prueba5[item] = bookDetails[item]
                }
            }
            else if(item == 'publishers'){
                prueba5[item] = bookDetails[item][0]
            }
            else {

                prueba5[item]=  bookDetails[item]
            }
        }
     })

    //displayBookDetails(bookDetails)
    displayBookDetails(prueba5)
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
    console.log(prueba5)
    
    const btnFav = document.querySelector('.book-fav_link')
    
    if(btnFav.innerHTML == 'Saved'){
        btnFav.innerHTML = 'Save to Favorites';
        //let index = favoriteBook.indexOf(data)
        let index = favoriteBook.indexOf(prueba5)
        favoriteBook.splice(index, 1)
        
    }
    else {
        btnFav.innerHTML = 'Saved';
        //favoriteBook.push({...data, isSaved: true});
        favoriteBook.push({...prueba5, isSaved: true});
    }
    
    const favQty = document.getElementById('fav-qty');
    favQty.innerHTML = (favoriteBook.length)
}


getProducts('horror')