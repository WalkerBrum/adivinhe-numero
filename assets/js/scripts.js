const btnSendNumber = document.querySelector('#send-number');
const number = document.querySelector('#number');

btnSendNumber.addEventListener("click", function(e) {
    e.preventDefault();

    const number = document.querySelector('#enter-number');

    const value = number.value;
    changeNumber(value);
    console.log(value);
});

const changeNumber = (value) => {

    if (isNaN(value)) return;

    number.innerHTML = value;
}
