let result = (function solve() {
    let url = 'https://judgetests.firebaseio.com/schedule/';
    let id = 'depot';
    let arrivingAt = '';

    function depart() {
        $.ajax({
            method: 'GET',
            url: url + id + '.json',
            success: handleSuccess,
            error: handleError
        });
    }

    function handleSuccess(data) {
        $('#info').find('span').text('Next stop ' + data.name);
        arrivingAt = data.name;
        id = data.next;
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', false);
    }

    function handleError() {
        $('#info').find('span').text('Error');
        $('#depart').prop('disabled', true);
        $('#arrive').prop('disabled', true);
    }

    function arrive() {
        $('#info').find('span').text('Arriving at ' + arrivingAt);
        $('#depart').prop('disabled', false);
        $('#arrive').prop('disabled', true);
    }

    return {
        depart,
        arrive
    };

})();

