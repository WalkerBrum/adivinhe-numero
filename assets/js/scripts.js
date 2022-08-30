const btnSendNumber = document.querySelector('#send-number');
const inputToGuess = document.querySelector('#enter-number');
const number = document.querySelector('#digit');
const numbers = document.querySelector('#numbers')
const message = document.querySelector('#message');
const buttonRestart = document.querySelector('#button-restart');
const messageString = document.querySelector('#message-string')
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

    if (isNaN(value)) {
        messageString.innerHTML = 'ERRO! Digite um número válido!'
        return;
    }

    className = value.split("");

    const numerClassMap = {
        0: 'zero',
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
        5: 'five',
        6: 'six',
        7: 'seven',
        8: 'eight',
        9: 'nine',
    }

    number.setAttribute('class', numerClassMap[className[0]]);
    console.log(className.length)
    if (className.length > 1) {

        for (let i = 1; i < className.length; i++) {

            document.querySelector('#numbers').appendChild("div")
            const div = document.querySelector('div');
            div.setAttribute('class', numerClassMap[className[i]]);
        }
    }
    
    messageString.innerHTML = '';

}

const disabledAttributes = (attibute) => attibute.setAttribute('disabled', 'disabled');

const changeAttributeBtnSendNumber = () => {

    btnSendNumber.classList.remove('send-number');
    btnSendNumber.style.background = '#DDDDDD';
    btnSendNumber.style.cursor = 'auto';

}

const addButtonRestart = () => {

    buttonRestart.innerHTML = '<button>';
    
    const selectButton = document.querySelector('button')
   
    selectButton.innerHTML = '<i class="far fa-redo"></i><span>NOVA PARTIDA</span>';

    disabledAttributes(inputToGuess);
    disabledAttributes(btnSendNumber);

    changeAttributeBtnSendNumber();

}

const showMessage = (value) => {
    
    if (value < 1 || value > 300) {
        message.innerHTML = 'ERRO! O número digitado deve estar entre 1 e 300!';
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

// Função para mostrar número
const showNumber = (value) => {
 
}




