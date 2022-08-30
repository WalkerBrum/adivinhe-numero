const btnSendNumber = document.querySelector('#send-number');
const inputToGuess = document.querySelector('#enter-number');
const number = document.querySelector('#number');
const message = document.querySelector('#message');
const buttonRestart = document.querySelector('#button-restart');
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

const changeNumber = (value) => {

    if (isNaN(value)) return;

    number.innerHTML = value;
}

const disabledAttributes = (attibute) => attibute.setAttribute('disabled', 'disabled');

const changeAttributeBtnSendNumber = () => {
    btnSendNumber.classList.remove('send-number');
    btnSendNumber.style.background = '#DDDDDD';
    btnSendNumber.style.cursor = 'auto';
}

const addButtonRestart = () => {

    buttonRestart.innerHTML = '<button>NOVA PARTIDA</button>';

    disabledAttributes(inputToGuess);
    disabledAttributes(btnSendNumber);

    changeAttributeBtnSendNumber();
}

const showMessage = (value) => {
    
    if (value < 1 || value > 300) {
        message.innerHTML = 'ERRO';
        message.style.color = '#CC3300';
        number.style.color = '#CC3300';
        addButtonRestart();

    } else if (value == numberToBeGues) {
        message.innerHTML = 'Você acertou!!!!';
        message.style.color = '#32BF00';
        number.style.color = '#32BF00';
        addButtonRestart();

    } else if (value > numberToBeGues) {
        message.innerHTML = 'É maior!';
        message.style.color = '#FF6600';

    } else if (value < numberToBeGues) {
        message.innerHTML = 'É menor!';
        message.style.color = '#FF6600';
    } 
}

const clearGuess = () => inputToGuess.value = '';

btnSendNumber.addEventListener("click", function(e) {

    e.preventDefault();

    const value = inputToGuess.value;

    changeNumber(value);

    showMessage(value);

    clearGuess();
});

buttonRestart.addEventListener("click", function(e) {

    e.preventDefault();

    location.reload();
});




