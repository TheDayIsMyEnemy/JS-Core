const url = 'https://phonebook-93495.firebaseio.com/phonebook';
const person = $('#person');
const phone = $('#phone');

$('#btnLoad').on('click', loadData);
$('#btnCreate').on('click', postData);

function loadData() {
    $('#phonebook').empty();
    $.ajax({
       method: 'GET',
       url: url + '.json'
    }).then(displayData).catch(displayError)
}

function postData() {
    let name = person.val();
    let phoneVal = phone.val();
    let postData = JSON.stringify({name:name, phone:phoneVal});

    $.ajax({
        method: 'POST',
        url: url + '.json',
        data: postData,
        success:onSuccess,
        error:displayError
    });

    function onSuccess(res) {
        displayElement(name, phoneVal, res.name);
    }

    person.val('');
    phone.val('');
}

function displayData(data) {
    for (let key in data) {
        if(data[key] != null){
            displayElement(data[key].name, data[key].phone, key);
        }
    }
}

function displayElement(name, phone, key) {
    let li = generateLi(name, phone, key);
    appendElement(li);
}

function generateLi(name, phone, key) {
    let li = $(`<li>${name}: ${phone}</li>`)
        .append($('<a href="#">[Delete]</a>')
            .click(function () {
                $.ajax({
                    method: 'DELETE',
                    url: url + '/' + key + '.json'
                }).then(()=> $(li).remove())
                    .catch(displayError);
            }));
    
    return li;
}

function appendElement(e) {
    $('#phonebook').append(e);
}

function displayError(err) {
    console.log(err);
}