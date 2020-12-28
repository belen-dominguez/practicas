const totalCost = document.getElementById('plan-value'); 
const btnValue = document.querySelectorAll('.btn');
let radio = document.querySelectorAll('input[type="radio"]')
const checkBox = document.querySelectorAll('input[type="checkbox"]')
const stepContainer = document.querySelectorAll('.step-container');
const tableServices = document.querySelectorAll('.services-table');
const tablePlans = document.querySelectorAll('.plan-table');
const nxtBtn = document.querySelector('.nxtBtn');
const prevBtn = document.querySelector('.prevBtn');
const costDisplay = document.querySelector('.user-selection')
const extraServices = [];

let totalplanValue = 0;
let planPrice  = 0;
let planChoice;
let servicePrice  = 0;

totalCost.innerText = totalplanValue;

/*actualizar precios anual o menual */
let percentOff = [];
for(let i = 0; i < radio.length; i++){

    percentOff.push((radio[i].value * 20) / 100);
}
let percentOffExtraSS = [];
for(let i = 0; i < checkBox.length; i++){

    percentOffExtraSS.push((checkBox[i].value * 20) / 100);
}

const btnMothPrice = document.querySelector('.btn-price-month');
btnMothPrice.disabled = true

const updatePrice = (optionSelected, btn) => {
   /*estilos al btn seleccionado*/
    const btnPriceChange = document.querySelectorAll('.btn-price-calc')
    
    btnPriceChange.forEach(item => {
        item.classList.remove('selected')
        item.disabled = false
    })
    btn.classList.add('selected')
    btn.disabled = true
   

    const typeInput = [radio, checkBox];
  
    /*update valores de servicios*/
    if(optionSelected == 'anual'){

        typeInput.map(item => {
        
            for(let i = 0; i < item.length; i++){

                /*cambio valor del valur*/
                if(item[i].attributes.type.value == "radio" ){
                    item[i].value = Number(item[i].value) - percentOff[i];
                }
                if(item[i].attributes.type.value == "checkbox"){
                    item[i].value = Number(item[i].value) - percentOffExtraSS[i];
                }
                
                /*cambio innertext del precio */
                let str = item[i].previousElementSibling.innerText.split(' ')
                str[1] = item[i].value;
                let newStr = str.join(' ')
    
                item[i].previousElementSibling.dataset.value =  item[i].value
                item[i].previousElementSibling.innerText = newStr
            }


        })

    
        // for(let i = 0; i < radio.length; i++){

        //     /*cambio valor del valur*/
        //     radio[i].value = Number(radio[i].value) - percentOff[i];
            
        //     /*cambio innertext del precio */
        //     let str = radio[i].previousElementSibling.innerText.split(' ')
        //     str[1] = radio[i].value;
        //     let newStr = str.join(' ')

        //     radio[i].previousElementSibling.dataset.value =  radio[i].value
        //     radio[i].previousElementSibling.innerText = newStr
        // }
        // for(let i = 0; i < checkBox.length; i++){

        //     /*cambio valor del valur*/
        //     checkBox[i].value = Number(checkBox[i].value) - percentOffExtraSS[i];
            
        //     /*cambio innertext del precio */
        //     let str = checkBox[i].previousElementSibling.innerText.split(' ')
        //     str[1] = checkBox[i].value;
        //     let newStr = str.join(' ')

        //     checkBox[i].previousElementSibling.dataset.value =  checkBox[i].value
        //     checkBox[i].previousElementSibling.innerText = newStr
        // }

    }
    if(optionSelected == 'month'){

        typeInput.map(item => {
        
            for(let i = 0; i < item.length; i++){
  
                /*cambio valor del valur*/
                if(item[i].attributes.type.value == "radio" ){
                   
                    item[i].value = Number(item[i].value) + percentOff[i];
                }
                if(item[i].attributes.type.value == "checkbox"){
                   
                    item[i].value = Number(item[i].value) + percentOffExtraSS[i];
                }
                
                /*cambio innertext del precio */
                let str = item[i].previousElementSibling.innerText.split(' ')
                str[1] = item[i].value;
                let newStr = str.join(' ')
    
                item[i].previousElementSibling.dataset.value =  item[i].value
                item[i].previousElementSibling.innerText = newStr
            }
            
        })
        
    }
    updateTotalCost(optionSelected)

}

/*actualziar percio al cambiar de menusal a anual y viceversa*/
let priceUpdated;
const updateTotalCost = (optionSelected) => {
   
    
    let planSelected = document.querySelectorAll('.plan-container.selected')

    planSelected = Array.from(planSelected)
  
    planSelected.forEach(item => {
        //console.log(item.children[0].children[1].dataset.value)
    })
    priceUpdated = planSelected.reduce((acc,item) => {
        return acc += Number(item.children[0].children[1].dataset.value)
        
    },0)
   
    totalCost.innerText = priceUpdated;
}

/*actualizar valor del plan*/
const upgradeTotalCost = (isChecked, value, name, inputSelected) => {

    let tableContainer = inputSelected.parentElement.parentElement;
    let extraServiceSelected = inputSelected.parentNode.children[0].innerHTML

   
    if(name == "plan"){
        planPrice =   Number(`${value}`);
        planChoice = inputSelected.id
        /*agregar estilo a div si es seleccionado*/
        for(i=0; i < tablePlans.length; i++){
            tablePlans[i].classList.remove('selected')
        }
        tableContainer.classList.add('selected');
    }
    
    if(name == "servicio"){
        if(isChecked){
            servicePrice = servicePrice + Number(`${value}`);
            tableContainer.classList.add('selected');

            inputSelected.labels[0].innerText = "Quitar";

           /*agregar extra ss al array*/ 
            extraServices.push(extraServiceSelected)
        }
        else {
            servicePrice = servicePrice - Number(`${value}`);
            tableContainer.classList.remove('selected');

            inputSelected.labels[0].innerText = "Seleccionar"

            /*eliminar extra ss al array*/
           let extraServiceOff = extraServices.indexOf(extraServiceSelected)
           extraServices.splice(extraServiceOff, 1)
        }
    }


    // totalplanValue =  planPrice + servicePrice;

    // totalCost.innerText = totalplanValue;
    updateTotalCost()
    
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
    nxtBtn.style.display = "block";
    costDisplay.style.display = "flex";
    
    for(i=0; i < stepContainer.length; i++){
        stepContainer[i].classList.remove('active')
    }
    currentContainer = currentContainer + value;

    if(currentContainer == 0){
        prevBtn.style.display = "none";
      
    }
    if(currentContainer == 2){
        nxtBtn.style.display = "none";
        finalStep();
      
    }
 
    stepContainer[currentContainer].classList.add('active')
}


/*resumen */
const finalStep = () => {
    const selectedPlan = document.getElementById('selected-plan');
    const extraServicesTable = document.getElementById('extra-services');
    const totalCostFinal = document.getElementById('plan-value-final');
    
    //totalCostFinal.innerHTML = totalplanValue; 
    totalCostFinal.innerHTML = priceUpdated
    selectedPlan.innerHTML = planChoice.toUpperCase();
    costDisplay.style.display = "none";

    if(extraServices.length > 0){

        extraServicesTable.innerHTML = extraServices.reduce((html, item) => {
            return html + `
                <li>${item}</li>
            `
        })
    } else {
        extraServicesTable.innerHTML = "No hay servicios adicionales seleccionados"
    }

}