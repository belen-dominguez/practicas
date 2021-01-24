const tChart = document.getElementById('tempChart');
const pChart = document.getElementById('precpChart');
const wChart = document.getElementById('windChart');

const setChart = (data) => {


  /*Datos de hora de API viene en UNIX, para convertirlos a milisegundos y extraer la hora, hay que multiplicarlo por 1000
  https://coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
  */

  /*CHART DATA*/
    const nextHours = []
    data.forEach(item => {
       let getHour = new Date((item.dt)*1000)
       nextHours.push(`${getHour.getHours()}:00`)
    })

    const maxTemp = [];
    data.forEach(item => {
        maxTemp.push(Math.round(item.temp)) 
    })

    const probPrecip = []
    data.forEach(item => {
        probPrecip.push(`${Math.round(item.pop)}`) 
    })
   

    const windData = []
    data.forEach(item => {
        windData.push(`${Math.round(item.wind_speed * 3.6)} km/h`) 
    })

    const windDeg = []
    data.forEach(item => {
        windDeg.push(Math.round(item.wind_deg) ) 
    })


   /*CHARTS*/
    const tempChart = new Chart(tChart, {
        type: 'line',
        data: {
            labels: nextHours,
            datasets: [{
                label: 'Temperatura',
                data: maxTemp,
                fill: false,
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            legend: {
                labels: {
                    defaultFontFamily: "'Open Sans', sans-serif"
                }
            },
            
        }
    });


    const precipChart = new Chart(pChart, {
        type: 'line',
        data: {
            labels: nextHours,
            datasets: [{
                label: 'Precipitaciones',
                data: probPrecip,
                borderColor: [
                    'blue'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                        //suggestedMin: -1,
                    }
                }]
            },
            legend: {
                labels: {
                    defaultFontFamily: "'Open Sans', sans-serif"
                }
            },
        }
    });


    let correctDeg = []
    for(let i= 0; i < windDeg.length; i++){

        if(windDeg[i] > 0 && windDeg[i] < 90) {
            correctDeg.push(windDeg[i]  + 270)
        }
        else if(windDeg[i] > 90 && windDeg[i] < 360){
            correctDeg.push(windDeg[i]  - 90)
        }
       
    }


    wChart.innerHTML = windData.reduce((html, item, i) => {
        return html += `
            <div class="item">
                <p>${item}</p>
                <img style="transform: rotate(${correctDeg[i]}deg) scaleX(-1)" src="./img/arrow.svg" width="30" alt="">
                <p>${nextHours[i]}</p>
            </div>
        `
    },"")

}

