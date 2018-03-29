function attachEvents() {
    let url = 'https://baas.kinvey.com/';
    let base64auth = btoa('guest:pass');
    let authHeaders = {'Authorization':'Basic ' + base64auth};
    
    function request(method, url, data) {
        return $.ajax({
           method: method,
           url: url,
           headers: authHeaders,
           data: JSON.stringify(data)
        });
    }
    
    $('#getVenues').on('click', function () {
        let date = $('#venueDate').val();
        request('POST', url+ `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date}`,'')
            .then(getVenues);
    });

    function getVenues(ids) {
       for(let id of ids){
           request('GET', url+ `appdata/kid_BJ_Ke8hZg/venues/${id}`,'')
               .then(displayVenue);
       }
    }

    function displayVenue(venue) {
        let div = $(`<div class="venue" id="${venue._id}"></div>`);
        let span = $(`<span class="venue-name"><input class="info" type="button" value="More info">${venue.name}</span>`)
            .click(function () {
               div2.toggle();
               span2.toggle();
               p1.toggle();
               p2.toggle();
            });
        let div2 = $(`<div class="venue-details" style="display: none;"></div>`);
        let table = $('<table>');
        let tr = $(`<tr><th>Ticket Price</th><th>Quantity</th><th></th></tr>`);
        let tr2 = $(`<tr>`);
        let td = $(`<td class="venue-price">${venue.price} lv</td>`);
        let td2 = $(`<td>`);
        let select = $(`<select class="quantity"></select>`)
            .append('<option value="1">1</option>')
            .append('<option value="2">2</option>')
            .append('<option value="3">3</option>')
            .append('<option value="4">4</option>')
            .append('<option value="5">5</option>');
        let td3 = $(`<td>`).append('<input class="purchase" type="button" value="Purchase">').click(() => buyTickets(venue, select));
        let span2 = $(`<span class="head" style="display: none;">Venue description:</span>`);
        let p1 = $(`<p class="description" style="display: none;">${venue.description}</p>`);
        let p2 = $(`<p class="description" style="display: none;">Starting time: ${venue.startingHour}</p>`);


        $('#venue-info').append(div);
        div.append(span);
        div.append(div2);
        div2.append(table);
        table.append(tr);
        table.append(tr2);
        tr2.append(td);
        tr2.append(td2);
        td2.append(select);
        tr2.append(td3);
        div.append(span2);
        div.append(p1);
        div.append(p2);
    }
    
    function buyTickets(venue, select) {
        let qty = select.val();
        let price = Number(venue.price);
        let span = $(`<span class="head">Confirm purchase</span>`);
        let div = $(`<div class="purchase-info"></div>`)
            .append($(`<span>${venue.name}</span>`))
            .append($(`<span>${qty} x ${price}</span>`))
            .append($(`<span>Total: ${qty * price} lv</span>`))
            .append($(`<input type="button" value="Confirm">`)
                .click(function () {
                    request('POST', url + `rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${venue._id}&qty=${qty}`,'')
                        .then(displayTicketConfirmation)
                }));

        $('#venue-info').empty();
       $('#venue-info').append(span);
       $('#venue-info').append(div);

    }
    
    function displayTicketConfirmation(fragment) {
        $('#venue-info').empty();
        $('#venue-info').append('<p>You may print this page as your ticket.</p>');
        $('#venue-info').append(fragment.html);
    }
}