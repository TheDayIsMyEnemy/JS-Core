function showView(element) {
    $('main > section').hide()
    $(element).show();
}

function hideView(element) {
    $(element).hide()
}

function showHomeView() {
    $('main > section').hide()
    showView('#viewHome');
    showView('#linkHome');

    if (sessionStorage.getItem('authToken') == null) {
        showView('#linkLogin');
        showView('#linkRegister');
        hideView('#linkListAds');
        hideView('#linkCreateAd');
        hideView('#linkLogout');
    }
    else {
        showView('#linkListAds');
        showView('#linkCreateAd');
        showView('#linkLogout');
        hideView('#linkLogin');
        hideView('#linkRegister');
        $('#loggedInUser').text("Welcome, " + sessionStorage.getItem('username') + "!")
    }
}

function showRegisterView() {
    $('#formRegister').trigger('reset');
    showView('#viewRegister');
}

function showLoginView() {
    $('#formLogin').trigger('reset')
    showView('#viewLogin');
}

function showAdvertsView(adverts) {
    $('#ads table').find('tr').each((i, e) => {
        if (i > 0) {
            $(e).remove()
        }
    });

    adverts = adverts.sort((a,b) => b.viewsCount - a.viewsCount);

    for (let advert of adverts) {
        let tr = ($('<tr>')
            .append(`<td>${advert.title}</td>`)
            .append(`<td>${advert.publisher}</td>`)
            .append(`<td>${advert.description}</td>`)
            .append(`<td>${advert.price}</td>`)
            .append(`<td>${advert.date}</td>`))

        let td = ($('<td>').append($('<a href="#">[Read More]</a>')
                .on('click', function () {
                    incrementViews(advert);
                })));

        if (advert._acl.creator == sessionStorage.getItem('userId')) {
                $(td).append($('<a href="#">[Delete]</a>').on('click', function () {
                    deleteAd(advert);
                }))
                .append($('<a href="#">[Edit]</a>').on('click', function () {
                    showEditAdView(advert);
                }));
        }

        tr.append(td);
        $('#ads table').append(tr);
    }

    showView('#viewAds');
}

function showCreateAdView() {
    $('#formCreateAd').trigger('reset');
    showView('#viewCreateAd')
}

function showEditAdView(advert) {
    $('#viewEditAd').trigger('reset');
    $('#formEditAd input[name=id]').val(advert._id);
    $('#formEditAd input[name=title]').val(advert.title);
    $('#formEditAd textarea[name=description]').val(advert.description);
    $('#formEditAd input[name=datePublished]').val(advert.date);
    $('#formEditAd input[name=price]').val(advert.price);
    $('#formEditAd input[name=image]').val(advert.image);
    $('#formEditAd input[name=viewsCount]').val(advert.viewsCount);
    $('#formEditAd input[name=publisher]').val(advert.publisher);
    showView('#viewEditAd');
}

function showReadMoreView(advert) {
    let element = $('#readMore');
    element.trigger('reset');
    element.find('img').attr('src', advert.image).css('width','128');
    element.find('#title').text(advert.title)
    element.find('#descrp').text(advert.description);
    element.find('#publ').text(advert.publisher);
    element.find('#date').text('Date: ' + advert.date);
    element.find('#views').text('Views: ' + advert.viewsCount)
    showView('#readMore');
}

function showInfo(message) {
    let infoBox = $('#infoBox');
    infoBox.text(message);
    infoBox.show();
    setTimeout(function () {
        $('#infoBox').fadeOut()
    }, 3000)
}

function showError(errorMsg) {
    let errorBox = $('#errorBox')
    errorBox.text("Error: " + errorMsg)
    errorBox.show()
}