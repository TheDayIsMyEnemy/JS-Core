function addItem() {
    var newItemText = document.getElementById('newItemText');
    var newItemValue = document.getElementById('newItemValue');
    var option = document.createElement('option');
    option.value = newItemValue.value;
    option.textContent = newItemText.value;
    document.getElementById('menu').appendChild(option);
    newItemText.value = '';
    newItemValue.value = '';
}