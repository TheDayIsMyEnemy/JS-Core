function subtract() {
    var firstNum = Number(document.getElementById('firstNumber').value);
    var secondNum = Number(document.getElementById('secondNumber').value);
    var result = firstNum - secondNum;
    document.getElementById('result').textContent = result;
}