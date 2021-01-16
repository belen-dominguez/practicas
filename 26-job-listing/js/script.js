let jobListing = []
let setCountry = 'gb';
let setPage = 1;
let countryArr = []

// var obj = {
//     value: '',
//     letMeKnow() {
//       console.log(`The variable has changed to ${this.testVar}`);
//       algo(this.testVar)
//     },
//     get testVar() {
//       return this.value;
//     },
//     set testVar(value) {
//       this.value = value;
//       this.letMeKnow();
//     }
//   }
  
//   console.log(obj.testVar)
  
//   obj.testVar = 'us';
//   console.log(obj.testVar)


const setCountryUrl = (country) => {
    setCountry = country; 
    setPage = 1;
    countryArr = []
    getJobListing(setCountry, setPage)
}

const setPageUrl = (page) => {
    // if( page == 1){
    //     setPage = page
    // }
    // else if(page !== 'null'){
    //     setPage = setPage + page
    // }
    // else {
    //     setPage = setPage
    // }
    
    // if(country !== 'null'){
    //     setCountry = country; 
    //     setPage = 1;

    // }
    // else {
    //     setCountry = setCountry;
    // }

    setPage = setPage + page

    getJobListing(setCountry, setPage)

}



const getJobListing = async (country, page ) => {
    const APP_KEY = "18b2fcba280e5abb57c8449c63957481"
    const APP_ID = "2a693841"


    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}?app_id=${APP_ID}&app_key=${APP_KEY}`;

    const response = await fetch(url)
    const data = await response.json();

    jobListing =  data.results;
    countryArr.push(...jobListing)

    jobListing && displayJob(countryArr)

    // const response = await fetch(url, {
    //     'mode': 'cors',
    //     'headers': {
    //         'Access-Control-Allow-Origin': '*',
    //         "Content-Type" : "application/x-www-form-urlencoded"
    //     }
    // });
    // https://cors-anywhere.herokuapp.com/
    
}


const displayJob = (arrJobs = []) => {
    const jobDiv = document.querySelector('.job-listing-container');
    let jobsToDisplay = [];
    
    /*TIPO TRABAJO*/
    if( arrJobs.length != 0){
        jobsToDisplay = arrJobs
    }
    else {
        jobsToDisplay = jobListing
    }

  
    jobDiv.innerHTML = jobsToDisplay.reduce((html, job) => {

        let contract;
        let dateCreated; 
       
        /*TIPO DE TRABAJO*/
        if(job.contract_time){
            contract = job.contract_time.split('_').join(' ').toUpperCase()
        }
        else {
            contract = "No Info"
        }

        /*DIA CREADO*/
        if(job.created){
            /*86 400 000 milliseconds son 24hrs*/
            let published = new Date(job.created).getTime();
            let currentDate = new Date().getTime()
            dateCreated = Math.round((currentDate- published) / 86400000)
        }

        return html + `
            <div class="job-item" id="${job.id}">
                <img class="company-logo" src="./icon.png" alt="${job.company.display_name}">
                <p class="intro-details"><span class="date">${dateCreated} days ago</span>&middot; <span class="contract">${contract}</span></p>
                <h3>${job.title}</h3>
                <p class="company-name">${job.company.display_name}</p>
                <div class="item-footer">
                     <p class="company-location">${job.location.area[0]}</p>
                     <button onclick="openModalDetails(event)" class="btn">Details</button>
                </div>
                <div class="modal" id="modal-${job.id}">
                    <div class="modal-header">
                        <div class="modal-header-up">
                            <h2>${job.company.display_name}</h2>
                            <i onClick="closeModal(event)" class="far fa-times-circle" style="cursor:pointer"></i>
                        </div>
                        <div class="detail">
                            <p>Location: <span>${job.location.area[0]}, ${job.display_name}</span></p>
                            <p>Category: <span>${job.category.label}</span></p>
                        </div>
                    </div>
                    <div class="modal-description">
                        <div class="description-header">
                            <div class="left">

                                <p class="intro-details"><span class="date">${dateCreated} days ago</span>&middot; <span>${contract}</span></p>
                                <h3>${job.title}</h3>
                            </div>
                            <a href="${job.redirect_url}" class="btn" target="_blank">Apply Now</a>
                        </div>
                        <div class="description-content">
                        ${job.description}
                        </div>
                    </div>
                </div>
            </div>
        `
    },"")
}


 getJobListing(setCountry, setPage)






  
