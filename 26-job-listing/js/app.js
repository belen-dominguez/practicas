const prueba = [
    {
        id: "1",
        created: "2021-01-08T16:54:03Z",
        uno: 'el cielo azul',
        chau: 'el cielo bordo goma',
        pirulo: 'papa',
        pipon: 'tururu',
        pitulo: {
            hola: 'el carbon azul',
            chau: 'el cielo bordo',
            pirulo: 'tacho',
            pipon: 'goma'
        },
        papa: {
           algo: [ 'el carbon azul','el cielo bordo','toronja',], 
            pipon: 'goma'
        },
    },
    {
        id: "2",
        created: "2021-01-12T17:54:51Z",
        dos: 'el carbon azul',
        chau: 'el cielo bordo',
        pirulo: 'tacho',
        pipon: 'goma',
        pitulo: {
            cara: 'el carbon azul',
            solo: 'el cielo bordo',
            pirulo: 'papa',
            pipon: 'goma'
        },
        papa: {
           algo: [ 'el carbon azul','el cielo bordo','tacho',], 
            pipon: 'goma'
        },
     },
    {
        id: "3",
        created: "2021-01-15T17:54:51Z",
        tres: 'el pasto verde goma',
        chau: 'morcilla',
        pirulo: 'pupu',
        pipon: 'choclo',
        pitulo: {
            cara: 'el carbon azul',
            solo: 'el cielo bordo',
            pirulo: 'toronja',
            pipon: 'goma'
        },
        papa: {
           algo: [ 'el carbon azul','el cielo bordo','tacho',], 
            pipon: 'goma'
        },
    },
    {
        id: "4",
        cuatro: 'el pasto verde goma',
        created: "2021-01-07T16:54:03Z",
        chau: 'morcilla',
        pirulo: 'pupu',
        pipon: 'papa',
        pitulo: {
            cara: 'el carbon azul',
            solo: 'el cielo bordo',
            pirulo: 'papa',
            pipon: 'goma'
        },
        papa: {
           algo: [ 'salame','el cielo bordo','tacho',], 
            pipon: 'goma'
        },
    },
    {
        id: "5",
        cuatro: 'el pasto verde goma',
        created: "2021-01-01T17:54:51Z",
        chau: 'toronja',
        pirulo: 'pupu',
        pipon: 'papa',
        pitulo: {
            cara: 'el carbon azul',
            solo: 'el cielo bordo',
            pirulo: 'toronja',
            pipon: 'goma'
        },
        papa: {
           algo: [ 'el carbon azul','el cielo bordo','chuleta',], 
            pipon: 'goma'
        },
    },
]

/*OPRUEBA FECHA*/
// prueba.forEach(job => {

//     if(job.created){
//         /*86 400 000 milliseconds son 24hrs*/
//         let published = new Date(job.created).getTime();
//         let currentDate = new Date().getTime()
//         let algo6 = Math.round((currentDate- published) / 86400000)
//     }
// })

/*PRUEBA filter by title*/
// let jobsToFilter = []
// const newJOb = [...prueba]

// /*aca pusheo todos los objetos que contengan la palabra buscada*/
// let algo = newJOb.forEach(job => {
//     for(let property in job){
//         /*aca me fijo si el primer nivel de propiedades tiene un objeto*/
//         if(typeof(job[property])=== 'object'){
//             let subObj = job[property]

//             for(let prop in subObj){
//                 /*ahora me fjio si el subObjeto contiene un array para analizarlo*/
//                 if(Array.isArray(subObj[prop])){

//                     if(subObj[prop].includes('toronja')){

//                         jobsToFilter.push(job)
//                     }
//                 }
//                 else {
//                     if( subObj[prop].includes('toronja') ){
                        
//                         jobsToFilter.push(job)
//                     }
//                 }
//             }

//          }
//         else {
//             if( job[property].includes('toronja') ){
//                 jobsToFilter.push(job)
//             }
//         }
//      }

// })
// /*buscar duplicados*/
// let valueArr = jobsToFilter.map(item => item.id)
//     valueArr.forEach((item, i) =>{ 

//     // console.log(valueArr.indexOf(item), i)

//       if(valueArr.indexOf(item) != i ){
//           valueArr.splice(i,1)
          
//          }
         
//     });

// /*crear el array con los elementos unicos, eliminando los duplcados*/
// let selectedJobFiltered = jobsToFilter.filter((item, i) => {
//     return item.id == valueArr[i]
// })

// console.log(selectedJobFiltered)




/*Filter by full time*/
const filterFullTime = document.getElementById("filter-type")

filterFullTime.addEventListener('click', (e) => {

    let fullTimeJob = [];

    if(e.target.checked){
        fullTimeJob =  countryArr.filter(job => {
            return  job.contract_time =="full_time"
          })
    }
    if(!e.target.checked){
        fullTimeJob = jobListing;
       
    }

     displayJob(fullTimeJob)

})


/*Filter by location*/
const filterLocation = (value) => {
    setCountryUrl(value)
}

/*filter title*/
const filterTitle = () => {
    const inputFilterTitle = document.getElementById('filter-title-value')
    const filterTitleValue = inputFilterTitle.value.toUpperCase();

    let jobsToFilter = []
    let selectedJobFiltered = []
    const newJOb = [...countryArr]
  
    /*aca pusheo todos los objetos que contengan la palabra buscada*/
     newJOb.forEach(job => {
        for(let property in job){
            /*aca me fijo si el primer nivel de propiedades tiene un objeto*/
            if(typeof(job[property])=== 'object'){
                let subObj = job[property]

                for(let prop in subObj){

                    /*ahora me fjio si el subObjeto contiene un array para analizarlo*/

                    if(Array.isArray(subObj[prop])){
            
                        if(subObj[prop].includes(filterTitleValue)){

                            jobsToFilter.push(job)
                        }
                    }
                    else {
        
                        if( subObj[prop].includes(filterTitleValue) ){
                            
                            jobsToFilter.push(job)
                        }
                    }
                }

            }
            else if(typeof(job[property]) === 'number'){
               let propToString = job[property].toString()
               
                if( propToString.includes(filterTitleValue) ){
                    jobsToFilter.push(job)
                }

            }
            else {
                let propToString = job[property].toUpperCase()
                if( propToString.includes(filterTitleValue) ){
                    jobsToFilter.push(job)
                }
            }
        }

    })
    /*buscar duplicados*/
    let valueArr = jobsToFilter.map(item => item.id)
    let checkDuplicates = [];

    for(let i=0; i < valueArr.length; i++){
        if(valueArr.indexOf(valueArr[i]) != i){
            checkDuplicates.push(false)
        }
        else {
            checkDuplicates.push( true)
        }
    }


    /*crear el array con los elementos unicos, eliminando los duplcados*/
    selectedJobFiltered = jobsToFilter.filter((item, i) => {
        //console.log(item.id , valueArr[i])

        if(checkDuplicates[i] === true){

            return item
        }
    })
 
    displayJob(selectedJobFiltered)

    inputFilterTitle.value = ""
}

/*reset filter*/
const resetFilter = () => {
    displayJob(countryArr)
}

/*modal handler*/
const openModalDetails = (e) => {
    
    const parentId = e.target.parentElement.parentElement.attributes.id.value
    const modal = document.getElementById(`${parentId}`).lastElementChild;
    modal.classList.add('display')
}
const closeModal = (e) => {
    const parentId = e.target.offsetParent.attributes.id.value
    const modal = document.getElementById(`${parentId}`);
 
     modal.classList.remove('display')
}

/*load more*/
const loadMore = () => {
    setPageUrl( 1)
}

