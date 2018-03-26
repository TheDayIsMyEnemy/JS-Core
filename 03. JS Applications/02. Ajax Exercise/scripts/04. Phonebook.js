function attachEvents() {
    let url = 'https://phonebook-nakov.firebaseio.com/phonebook';
    $('#btnLoad').on('click', load);
    $('#btnCreate').on('click', create);

    function load() {
        $.ajax({
           method: 'GET',
           url: url+ '.json',
           success:  loadPhonebookEntries
        });
    }

    function create() {
        let person = $('#person');
        let phone = $('#phone');
        let postData = JSON.stringify({name:person.val(), phone:phone.val()});
        $.ajax({
           method: 'POST',
           url: url + '.json',
            data:postData,
            success: load
        });
        person.val('');
        phone.val('');
    }

    function loadPhonebookEntries(data) {
        $('#phonebook').empty();
        for(let k in data){
                let li = createLi(data[k]['person'], data[k]['phone'], k);
                $('#phonebook').append(li);
        }
    }

    function createLi(name, phone, key) {
        let li = $(`<li>${name}: ${phone}</li>`);
        let btn = $('<button>[Delete]</button>').on('click', function () {
            $.ajax({
               method: 'DELETE',
               url: url+ '/' + key + '.json'
            }).then(() => $(li).remove());
        });
        li.append(btn);
        return li;
    }
}