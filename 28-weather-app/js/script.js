
/* get icon : http://openweathermap.org/img/wn/01d@2x.png

https://openweathermap.org/weather-conditions#How-to-get-icon-URL

*/

let weatherDetails = {}
const getWeather = async (url) => {
   
    const response = await fetch(url)
    const data = await response.json()
   
    if(response.status !== 200) {
        alert('Se ha producido un error. Por favor intentelo nuevamente.')
    }

    mainDetails(data)
    weeklyDetails(data.daily)
    setChart((data.hourly).slice(0,9))
}

let countryCodes = []
const getCountryCodes = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all')
    const data = await response.json()

    countryCodes = data
}


window.addEventListener('load', () => {
    let long;
    let lat;
    const API_KEY = 'a522f2ef4539ef4c9a9ba5633f7658d0'

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            lat = position.coords.latitude;
            long = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}1&lon=${long}&appid=${API_KEY}&lang=es&units=metric `;

            getWeather(url)
        })
    }else {
       alert('not available')
    }

})

let countryName;
const getCountryName = async (code) => {
    const url = `https://restcountries.eu/rest/v2/alpha/${code}`
    const response = await fetch(url)
    const data = await response.json()

    countryName = data.translations.es;
    modalInfo(data)
}

const getCoordinates = async (url) => {
    const API_KEY = 'a522f2ef4539ef4c9a9ba5633f7658d0'
    const response = await fetch(url)
    const data = await response.json()

    if(response.status !== 200) {
        alert('Se ha producido un error. Por favor ingrese una Ciudad')
    }
    const newUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}1&lon=${data.coord.lon}&appid=${API_KEY}&lang=es&units=metric `;
    
    getWeather(newUrl)
    getCountryName(data.sys.country)
}





/*Search*/
const search = document.querySelector('.search-input')

let searchToDisplay;
search.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {

       let searchValue = e.target.value
       searchToDisplay = e.target.value
        if(searchValue.includes(',')){
            
            let removeComma  = searchValue
            .split(' ')[0]
            .split('')
            let index = removeComma.length - 1
            removeComma.splice(index, 1)
            searchToDisplay = removeComma.join('')

            searchValue = searchValue.split(' ').join('') ;
        }

        const API_KEY = 'a522f2ef4539ef4c9a9ba5633f7658d0'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${API_KEY}&lang=es&units=metric`;

        getCoordinates(url)

        e.target.value = "";
    }
})


/*Select Location */
const selectCountry = document.getElementById('country')
const selectCity = document.getElementById('city')

selectCountry.addEventListener('change', (e) => {
    const countrySelected = e.target.value;

   const citiesSelected = countries.filter(country => {
        return country.country == countrySelected
    })

    displayCities(citiesSelected)
})

selectCity.addEventListener('change', (e) => {

    let selectedCity = e.target.value
    let cityData = countries.filter(item => item.city == selectedCity)

    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityData[0].lat}1&lon=${cityData[0].long}&appid=a522f2ef4539ef4c9a9ba5633f7658d0&lang=es&units=metric `;

    getWeather(url)
})

/*Open tabs*/
const btnTabs = document.querySelectorAll('.tabs button')

for(let i= 0; i< btnTabs.length; i++){
    btnTabs[i].addEventListener('click', (e) => {
      
        let selectedTab = e.target
        /*style*/
        for(let i= 0; i< btnTabs.length; i++){
            btnTabs[i].classList.remove('active')
        }
        selectedTab.classList.add('active')

        let graphics = document.querySelector('.daily-info-graph').children
        let graphicsArr = Array.from(graphics)

        let selectedGraph = graphicsArr.filter(item => {
           
            if(item.attributes.id){
                return item.attributes.id.value == e.target.classList[0]
  
            }
        })
        
        for(let i=0; i< graphics.length; i++){
            graphics[i].classList.add('noDisplay')
        }

        selectedGraph[0].classList.remove('noDisplay')
        
    })
}


/*MOdal*/
const modal = document.getElementById('modal')

modal.addEventListener('click', (e) => {

    if(e.target.attributes.id){
        if(e.target.attributes.id.value == 'modal'){
            modal.classList.add('noDisplay') 
        }
    }
})

const openModal = () => {
    modal.classList.remove('noDisplay')
}

const closeModal = () => {
    modal.classList.add('noDisplay')
}


/*country codes container */
const countryCodeDiv = document.getElementById('code');

const openSideMenu = () => {
    const searchInput = document.querySelector('.search-code input')
    searchInput.value = "";
    
    countryCodeDiv.classList.remove('noDisplay')
    displaySideMenuInfo()
}
const closeSideMenu = () => {
    countryCodeDiv.classList.add('noDisplay')
}

const filterResults = (e) => {
    let input = e.target.value.toLowerCase()

    let filterItems = countryCodes.filter((item, i) => {
       
        if(item.translations.es ){
            let cName = (item.translations.es).toLowerCase()
            return cName.includes(input)
        }
        else {
            return item.name.includes(input)
        }

    })

    displaySideMenuInfo(filterItems)
}

const copyToclipboard = (e) => {
    
    let spanID = e.target.previousElementSibling.id
    let tempInputElement = document.createElement("input");
    tempInputElement.type = "text";
    tempInputElement.value = spanID;

    document.body.appendChild(tempInputElement);
    tempInputElement.select()
    tempInputElement.setSelectionRange(0, 99999);
    document.execCommand("Copy");
    document.body.removeChild(tempInputElement);

   /*code from https://codepen.io/bharatramnani94/post/copy-text-to-clipboard-using-vanilla-javascript */
}


/*Capitalize Words */
const capitalizeWords = (word) => {

    let newString = word
    .split(' ')
    .map(word => {
        let arrLetters = word.split('')
        let firstLetter = arrLetters[0].toUpperCase()
        arrLetters.splice(0,1, firstLetter)
        let capWord = arrLetters.join('')
        word = capWord 
        return word
    })
    .join(' ')

    return newString
}


getWeather()
getCountryCodes()