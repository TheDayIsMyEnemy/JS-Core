function attachEvents() {
    let url = 'https://messenger-dd1a8.firebaseio.com/messenger';

    $('#submit').on('click', function () {
        let obj = {
            author: $('#author').val(),
            content: $('#content').val(),
            timestamp: Date.now()
        };
        let postData = JSON.stringify(obj);
        let request = {
          method: 'POST',
          url: url + '.json',
            data: postData,
          success: refreshMessages,
        };
        $.ajax(request);
    });

    $('#refresh').on('click', refreshMessages);

    function refreshMessages() {
        $.ajax({
            method: 'GET',
            url: url + '.json',
            success: displayMessages,
        });
    }

    function displayMessages(data) {
        let message = '';
        for (let k in data) {
            message+= data[k]['author'] + ': ' + data[k]['content']+'\n';
        }
        $('#messages').text(message);
    }
}