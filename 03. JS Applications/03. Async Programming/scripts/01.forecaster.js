function attachEvents() {
    let weatherSymbols = {
      Sunny: '&#x2600;',
        'Partly sunny': '&#x26C5;',
        Overcast: '&#x2601;',
        Rain: '&#x2614;',
    };

    let current = $('#current');
    let upcoming = $('#upcoming');
    let url = 'https://judgetests.firebaseio.com/';

    $('#submit').on('click', function () {
        $.ajax({
           method: 'GET',
            url: url +'locations.json'
        }).then(getForecast).catch(displayError);
    });

    function getForecast(data) {
        let name = $('#location').val();
        let obj = data.find(v=> v.name == name);
        let code = obj.code;

        $('#forecast').css('display', 'block');

        $.ajax({
            method: 'GET',
            url: url+ `forecast/today/${code}.json`
        }).then(displayCurrentConditions);

        $.ajax({
            method: 'GET',
            url: url+ `forecast/upcoming/${code}.json`
        }).then(displayThreeDayForecast);
    }

    function displayCurrentConditions(data) {
        current.find('span').each((i,v)=> $(v).remove());
        current
            .append($(`<span class="symbol">${weatherSymbols[data.forecast.condition]}</span>`))
            .append($('<span class="condition"></span>')
                .append($(`<span class="forecast-data">${data.name}</span>`))
                .append($(`<span class="forecast-data">${data.forecast.low}&#176/${data.forecast.high}&#176</span>`))
                .append($(`<span class="forecast-data">${data.forecast.condition}</span>`)));
    }

    function displayThreeDayForecast(data) {
        upcoming.find('span').each((i,v)=> $(v).remove());
        for (let obj of data.forecast) {
            console.log(obj);
            upcoming
                .append($('<span class="upcoming"</span>')
                    .append($(`<span class="symbol">${weatherSymbols[obj.condition]}</span>`))
                    .append($(`<span class="forecast-data">${obj.low}&#176/${obj.high}&#176</span>`))
                    .append($(`<span class="forecast-data">${obj.condition}</span>`)));
        }
    }
    
    function displayError() {
        $('#forecast')
            .css('display', 'block')
            .text('Error');
    }
}