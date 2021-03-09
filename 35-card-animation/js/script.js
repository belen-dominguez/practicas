const container = document.querySelector('.container');
let cards;
const heroImg = document.querySelector('.hero img');
const menuBtn = document.querySelector('.filter-icon');
const btnOne = document.querySelector('.btn .one');
const btnTwo = document.querySelector('.btn .two');
const btnThree = document.querySelector('.btn .three');
const btnAll = document.querySelector('.btn .all');

let movies = []


const printMovies =  (movies) => {
    console.log(movies)
    /*images url https://image.tmdb.org/t/p/w500/*/
    
    container.innerHTML = movies.reduce((html, movie, i) => {
        const month = movie.release_date.split('-')[1]
        return html += `
         <div data-title="${movie.title}" data-content="c-${i}" id="${i}" class="card ${month}">
            <div class="inner-card">
                <div class="front">
                    <div class="image">
                        <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" alt="${movie.original_title}">
                    </div>
                     
                </div>
                <div class="back">
                    <h3>${movie.title}</h3>
                    <p>Release Date: ${movie.release_date}</p>
                    <p class="review">${movie.overview}</p>
                </div>
            </div>
         </div>
        `
    },"")

    cards = [...document.getElementsByClassName('card')];
    translateCards(cards);
    clickEventCards(cards);
}

const getMovies = async () => {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=ea62e617867b87697a8db24515b62c23&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1'
    const response = await fetch(url)
    const data = await response.json()
    
    movies = data.results;
    printMovies(data.results)
}
getMovies()

