
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

    console.log(data)
    countryName = data.translations.es;
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



getWeather()

/*Search*/
const search = document.querySelector('.search-input')

let searchValue;
search.addEventListener('keypress', (e) => {
    if (e.keyCode == 13) {

        searchValue = e.target.value
       
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=a522f2ef4539ef4c9a9ba5633f7658d0&lang=es&units=metric `;

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
    //const cityOptions = selectCity.children

    let selectedCity = e.target.value
    let cityData = countries.filter(item => item.city == selectedCity)
    console.log(cityData)

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