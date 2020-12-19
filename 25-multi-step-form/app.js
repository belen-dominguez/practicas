const totalCost = document.getElementById('plan-value');
const btnValue = document.querySelectorAll('.btn');
let radio = document.querySelectorAll('input[type="radio"]')
const checkBox = document.querySelectorAll('input[type="checkbox"]')
const stepContainer = document.querySelectorAll('.step-container');
const tableServices = document.querySelectorAll('.services-table');
const tablePlans = document.querySelectorAll('.plan-table');
const nxtBtn = document.querySelector('.nxtBtn');
const prevBtn = document.querySelector('.prevBtn');

let totalplanValue = 0;
let planPrice  = 0;
let planChoice;
let servicePrice  = 0;

totalCost.innerText = totalplanValue;


/*actualizar valor del plan*/
const upgradeTotalCost = (isChecked, value, name, inputSelected) => {

    let tableContainer = inputSelected.parentElement.parentElement;
   
    if(name == "plan"){
        planPrice =   Number(`${value}`);
        planChoice = inputSelected.id
        /*agregar estilo a div si es seleccionado*/
        for(i=0; i < tablePlans.length; i++){
            tablePlans[i].classList.remove('selected')
        }
        tableContainer.classList.add('selected');
    }
    console.log(planChoice)
    
    if(name == "servicio"){
        if(isChecked){
            servicePrice = servicePrice + Number(`${value}`);
            tableContainer.classList.add('selected');

            inputSelected.labels[0].innerText = "Quitar"
        }
        else {
            servicePrice = servicePrice - Number(`${value}`);
            tableContainer.classList.remove('selected');

            inputSelected.labels[0].innerText = "Seleccionar"
        }
    }

    totalplanValue =  planPrice + servicePrice;

    totalCost.innerText = totalplanValue;

}

for(i=0; i < btnValue.length; i++){

    btnValue[i].addEventListener('click',(e) => {
        /*con radio*/
        let value = e.target.control.value;
        let name = e.target.control.name;
        let isChecked = e.target.control.checked;
        let inputSelected = e.target.control

        upgradeTotalCost(isChecked, value, name, inputSelected)
    })

}
/* sacar checked de inputs en checkbox*/
for(i=0; i < checkBox.length; i++){

    checkBox[i].checked = "false";

}


/*activar btn prev y next*/
prevBtn.style.display = "none";
nxtBtn.style.display = "none";

let currentContainer = 0;


for(i=0; i < radio.length; i++){

    radio[i].addEventListener('click', () => {
        nxtBtn.style.display = "block";
    })

}



const nextStep = (value) => {

    prevBtn.style.display = "block";
    
    for(i=0; i < stepContainer.length; i++){
        stepContainer[i].classList.remove('active')
    }
    currentContainer = currentContainer + value;

    if(currentContainer == 0){
        prevBtn.style.display = "none";
      
    }
    if(currentContainer == 2){
        nxtBtn.style.display = "none";
      
    }
 
    stepContainer[currentContainer].classList.add('active')
}


/*resumen */
const selectedPlan = document.getElementById('selected-plan');
const extraServices = document.getElementById('extra-services');

console.log(planChoice)
selectedPlan.innerHTML = planChoice;
