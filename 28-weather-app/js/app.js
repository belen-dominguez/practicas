



/*Select Location */
const getCountries = [] 
countries.forEach(item => {
    if(!getCountries.includes(item.country)) {
        getCountries.push(item.country)
    }
})

let firtOPtion = '<option selected disabled>País</option>'

selectCountry.innerHTML = getCountries.reduce((html, country) => {
    return html += `
         <option value="${country}">${country}</option>
    `
},firtOPtion)

const displayCities = (citiesArr) => {
    let firtOPtion = '<option selected disabled>Seleccione una Ciudad</option>'
    selectCity.innerHTML = citiesArr.reduce((html, city) => {
        return html += `
             <option value="${city.city}" data-lat="${city.lat}" data-lat="${city.long}">${city.city}</option>
        `
    },firtOPtion)
}


/* City main details*/

const mainDetails = (data) => {

    const currentCityContainer = document.querySelector('.current-city');
    const currentDayContainer = document.querySelector('.current-day');
    const currentWeatherContainer= document.querySelector('.current-weather');
    const currentIconContainer = document.querySelector('.current-weather-detail img');
    const currentTempCont = document.querySelector('.current-weather-detail p');
    const currentFeelCont = document.querySelector('.w-feels');
    const currentHumidCont = document.querySelector('.w-humidity');
    const currentWindCont = document.querySelector('.w-wind');

/*city details*/
    let currentCity

    if(searchValue == undefined){
        let cityDetail = data.timezone
        let strArr = cityDetail.split('/')
        let lastItem = strArr.length - 1;
        currentCity = strArr[lastItem]
        
        if(currentCity.includes('_')){
            currentCity = currentCity.split('_').join(' ')
        }
    }
    else {
        currentCity =  capitalizeWords(searchValue)
    }




  /*day details*/
    let daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
    let getCurrentDay = new Date().getDay();
    let currentDay = daysOfWeek[getCurrentDay]
    let currentHour = new Date().getHours();
    let currentMin = new Date().getMinutes();

/*weather description*/
    let currentWeather =  capitalizeWords(data.current.weather[0].description)


    currentCityContainer.innerText = currentCity
    currentDayContainer.innerText = `${currentDay}, ${currentHour}:${currentMin}`;
    currentWeatherContainer.innerText = currentWeather;
    currentIconContainer.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`
    currentTempCont.innerHTML = `<p>${Math.round(data.current.temp)} <span> °C</span></p>`;
    currentFeelCont.innerHTML = `Sensación térmica: ${Math.round(data.current.feels_like)} °C`;
    currentHumidCont.innerHTML = `Humedad:: ${Math.round(data.current.humidity)} %`;
    currentWindCont.innerHTML = `Viento: a ${Math.round(data.current.wind_speed * 3.6)} km/h`;


    
}

/*weekly details*/
const weeklyDetails = (data) => {
    
    const dailyCont = document.querySelector('.days');
    let currentDay = new Date()
    let currentNro = currentDay.getDate()
    let daysArr = []

    

    for (let i= 0; i < 8; i++){
        /*proceso para conocer los proximos dias
        1. obtengo la fecha de hoy
           let uno = new Date()
           resultado -> Date Sat Jan 23 2021 15:48:58 GMT-0300 (hora estándar de Argentina)
        2. Sobre esa fecha extraigo el numero
            let dos = uno.getDate()
            resultado -> 23
        3. a setDate() le paso el nro de hoy y le voy sumando 1 hasta conseguir los proximos 7
           let tres = uno.setDate(dos + 1)
           resultado -> 1611514138969
        4. El resultado de arriba es la fecha de mañana pero en milisegundas, entonces lo paso por new Date()
            new Date(tres)
           resultado -> Date Sun Jan 24 2021 15:48:58 GMT-0300 (hora estándar de Argentina)
        */
        let day = new Date(currentDay.setDate(currentNro++))

        /*ahora paso la fecha a castellano, hago un split() para quedarme solo con el nombre del dia. por ultimo agarro las primeras 3 letras del dia con splice()
        */
        let daySum = day
            .toLocaleString('es-AR', {
                    dateStyle: 'full'
            })
            .split(' ')[0]
            .slice(0,3)
       
        daysArr.push( daySum)
    }


    dailyCont.innerHTML = data.reduce((html, day,i) => {
       
        return html + `
            <div class="day-item">
                <p>${daysArr[i]}</p>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="">
                <p>${Math.round(day.temp.max)}° . <span>${Math.round(day.temp.min)}°</span> </p>
            </div>
        `
    },"")

}
