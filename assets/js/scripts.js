const btnSendNumber = document.querySelector('#send-number');
const inputToGuess = document.querySelector('#enter-number');
const digits = document.querySelector("#digits");
const buttonRestart = document.querySelector('#button-restart');
const message = document.querySelector('#message');

// Para receber valor a ser encontrado
let numberToBeGues;

// Para fazer requisição de um número aleatório na API
async function getNumber() {
    
    const response = await fetch('https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300');
    const json = await response.json();

    numberToBeGues = json.value;

    return numberToBeGues;

}

// Criar digito 
const createDigit = (number) => {
    const digitContainer = document.createElement('div');
    digitContainer.className = 'd' + number;

    digitContainer.innerHTML = `
        <div class="part-up"></div>
        <div class="part-down"></div>
    `;

    return digitContainer;
}

// Mostrar números
const showNumber = (value) => {

    const numberDigits = value; 

    numberDigits.split("").forEach((number) => {
        digits.appendChild(createDigit(number))
    });
}

// Tratar error a digitir valores não númerericos no input e trocar números quando digitados no input
const changeNumber = (value) => {

    const messageString = document.querySelector('#message-string');

    if (isNaN(value)) {
        messageString.innerHTML = 'ERRO! Digite um número válido!'
        return;
    } else {
        messageString.innerHTML = '';
    }
    
    digits.innerHTML = '';

    showNumber(value);

}

// Desabilitar atributos
const disabledAttributes = (attibute) => attibute.setAttribute('disabled', 'disabled');

// Trocar atributos do botão
const changeAttributeBtnSendNumber = () => {

    btnSendNumber.classList.remove('send-number');
    btnSendNumber.style.background = '#DDDDDD';
    btnSendNumber.style.cursor = 'auto';

}

// Adicionar botão restart
const addButtonRestart = () => {

    buttonRestart.innerHTML = '<button>';
    
    const selectButton = document.querySelector('button')
   
    selectButton.innerHTML = '<i class="far fa-redo"></i><span>NOVA PARTIDA</span>';

    disabledAttributes(inputToGuess);
    disabledAttributes(btnSendNumber);

    changeAttributeBtnSendNumber();

}

// Mostrar mensagem de acordo com valor inserido no input
const showMessage = (value) => {
    
    if (value < 1 || value > 300) {
        message.innerHTML = 'ERRO! O número digitado deve estar entre 1 e 300!';
        message.style.color = '#CC3300';
        addButtonRestart();

    } else if (value == numberToBeGues) {
        message.innerHTML = 'Parabéns! Você acertou!!!';
        message.style.color = '#32BF00';
        addButtonRestart();

    } else if (value > numberToBeGues) {
        message.innerHTML = 'É maior!';
        message.style.color = '#FF6600';

    } else if (value < numberToBeGues) {
        message.innerHTML = 'É menor!';
        message.style.color = '#FF6600';
    } 

}

// Limpar valor do input
const clearGuess = () => inputToGuess.value = '';

window.onload = async () => {

    response = await getNumber();

}

// Acionar funções ao clicar no botão enviar
btnSendNumber.addEventListener("click", function(e) {

    e.preventDefault();

    const value = inputToGuess.value;

    changeNumber(value);

    showMessage(value);

    clearGuess();

});

// Acionar funções ao clicar no botão Nova partida
buttonRestart.addEventListener("click", function(e) {

    e.preventDefault();

    location.reload();

});







