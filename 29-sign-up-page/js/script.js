
/*password*/
const pssInput = document.querySelector('input[type="password"]')
const setVisibility = document.getElementById('visible')
const submitBtn = document.querySelector('button[type="submit"]')

submitBtn.disabled = true;
let pass = {
    length: false,
    letter: false,
    number: false,
    caps: false,
    specialChar: false
}

setVisibility.addEventListener('click', () => {

    setVisibility.classList.toggle('fa-eye-slash')

    pssInput.getAttribute('type') == 'password' ?  pssInput.setAttribute('type', 'text') : pssInput.setAttribute('type','password')
})


const checkLength = (check) => {
    
    if(pssInput.textLength >= 8){
     
        check.innerHTML = '<i class="far fa-check-circle"></i>8 characters of more';

        pass.length = true;
    }
    else {
        check.innerHTML = '<i class="far fa-times-circle"></i>8 characters of more';

        pass.length = false;
    }
}

const checkLetterCaps = (input, checkL, checkCap) => {
   
   /*check letter*/
    let letterLow = /[a-z]/g;

    if(input.match(letterLow)){
        checkL.innerHTML = '<i class="far fa-check-circle"></i>At least 1 letter'

        pass.letter = true;
    }
    else {
        checkL.innerHTML = '<i class="far fa-times-circle"></i>At least 1 letter';

        pass.letter = false;
    }


    /*check CAps*/
    let upLowCase = /[A-Z]/g;
 
     if(input.match(letterLow && upLowCase)){
        checkCap.innerHTML = '<i class="far fa-check-circle"></i>A mixture of both uppercase and lowercase letters';

        pass.caps = true;
     }
     else {
        checkCap.innerHTML = '<i class="far fa-times-circle"></i>A mixture of both uppercase and lowercase letters';

        pass.caps = false;
     }

}

const checkNumber = (input, check) => {
    let numbers = /[0-9]/g;
 
    if(input.match(numbers)){
        check.innerHTML = '<i class="far fa-check-circle"></i>At least 1 number';

        pass.number = true;
    }
    else {
        check.innerHTML = '<i class="far fa-times-circle"></i>At least 1 number';

        pass.number = false;
    }
}

const checkSpecialChar = (input, check) => {
    let specChar = /[!@#\$%\^\&*\)\(+=._?/"'\[\]\{\}]/g;
  
    if(input.match(specChar)){
        check.innerHTML = '<i class="far fa-times-circle"></i>No special characters';

        pass.specialChar = false;
    }
    else {
        check.innerHTML = '<i class="far fa-check-circle"></i>No special characters';

        pass.specialChar = true;
    }
}

const checkIfPass = () => {
    
    let arr = Object.keys(pass)

    if(arr.every(item => pass[item] == true)){
        submitBtn.disabled = false;
    }
    else {
        submitBtn.disabled = true;
    }
}

pssInput.addEventListener('keyup', () => {
    let checkList = document.querySelector('.check-points').children;
    checkList = Array.from(checkList);

    let input = pssInput.value;

    /*https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions*/
   
   /*length */
   let one = checkList.filter(item => item.className == "check-one")[0]
   checkLength(one)

    /* 1 letter & caps   regExp = /[a-zA-Z]/g */
    let two = checkList.filter(item => item.className == "check-two")[0];
    let four = checkList.filter(item => item.className == "check-four")[0];
    checkLetterCaps(input, two, four)
        
     /* 1 number */
    let three = checkList.filter(item => item.className == "check-three")[0];
    checkNumber(input, three)

      /*Special characters*/
    let five = checkList.filter(item => item.className == "check-five")[0];
    checkSpecialChar(input, five)

    checkIfPass()
})


pssInput.addEventListener('focus', () => {
    const checkList = document.querySelector('.check-points'); 

    checkList.classList.remove('hide')
})



