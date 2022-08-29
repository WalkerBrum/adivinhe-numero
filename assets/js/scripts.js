const btnSendNumber = document.querySelector('#send-number');
const number = document.querySelector('#number');
const message = document.querySelector('#message');
let numberToBeGues;


async function getNumber() {

    const response = await fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300');
    const json = await response.json();

    numberToBeGues = json.value;

    return numberToBeGues;
}

window.onload = async () => {

    response = await getNumber();
    
}

btnSendNumber.addEventListener("click", function(e) {

    e.preventDefault();

    const number = document.querySelector('#enter-number');

    const value = number.value;
    changeNumber(value);
    showMessage(value);
});

const changeNumber = (value) => {

    if (isNaN(value)) return;

    number.innerHTML = value;
}

const showMessage = (value) => {
    console.log('número sorteado = ' + numberToBeGues);
    console.log('número digitado = ' + value);
    if (0 > value >= 300) {
        message.innerHTML = 'Erro! Número deve estar entre 1 e 300.';
    } else if (value > numberToBeGues) {
        message.innerHTML = 'É maior!';
    } else if (value < numberToBeGues) {
        message.innerHTML = 'É menor!'
    } else {
        message.innerHTML = 'Erro! Deve ser inserido um número válido entre 1 e 300'
    }
}




