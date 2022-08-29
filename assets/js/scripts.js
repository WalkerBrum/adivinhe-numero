const btnSendNumber = document.querySelector('#send-number');
const number = document.querySelector('#number');
let numberAleatory;

btnSendNumber.addEventListener("click", function(e) {

    e.preventDefault();

    const number = document.querySelector('#enter-number');

    const value = number.value;
    changeNumber(value);
    console.log(numberAleatory)
});

const changeNumber = (value) => {

    if (isNaN(value)) return;

    number.innerHTML = value;
}

async function getNumber() {

    const response = await fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300');
    const json = await response.json();

    return json.value
}

window.onload = async () => {

    response = await getNumber();
    
    numberAleatory = response;
}

