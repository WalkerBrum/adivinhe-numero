const btnSendNumber = document.querySelector('#send-number');
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

const addButtonRestart = () => {
    buttonRestart.innerHTML = '<button>NOVA PARTIDA</button>'
}

const showMessage = (value) => {
    
    console.log('número sorteado = ' + numberToBeGues);
    console.log('número digitado = ' + value);
    if (value < 1 || value > 300) {
        console.log('entrou');
        message.innerHTML = 'ERRO! Número deve estar entre 1 e 300.';
        message.style.color = '#CC3300';
        number.style.color = '#CC3300';
        addButtonRestart();
    } else if (value == numberToBeGues) {
        message.innerHTML = 'Parabéns! Você acertou!';
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

btnSendNumber.addEventListener("click", function(e) {

    e.preventDefault();

    const number = document.querySelector('#enter-number');

    const value = number.value;
    changeNumber(value);
    showMessage(value);
});




