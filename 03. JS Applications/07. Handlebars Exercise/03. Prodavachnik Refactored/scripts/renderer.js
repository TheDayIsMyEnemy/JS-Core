async function showHomeView() {

    $('main').empty();
    let headers = window.headers.defaultHeaders;

    if(sessionStorage.getItem('authToken') != null){
        headers = window.headers.autHeaders;
    }

    let homeView = await $.get('./templates/home-template.hbs');
    let homeTemplate = Handlebars.compile(homeView);
    let result = homeTemplate({title:'Welcome', body:'Welcome to our advertisement site.'});
    $('main').append(result);

    let source = await $.get('./templates/header-template.hbs');
    let template = Handlebars.compile(source);
    let html = template({headers:headers});

    $('#headers').html(html);
    attachEventsToLinks();
}

async function showRegisterView() {
    let source = await $.get('./templates/login-template.hbs');
    let template = Handlebars.compile(source);
    let html = template(window.logAndRegView.registerView);

    $('main').html(html);
    attachRegisterEvent();
}

async function showLoginView() {
    let source = await $.get('./templates/login-template.hbs');
    let template = Handlebars.compile(source);
    let html = template(window.logAndRegView.loginView);

    $('main').html(html);
    attachLoginEvent();
}

async function showAdvertsView(adverts) {

    // Helper method for attaching onclick events inside template
    Handlebars.registerHelper('json', function (context) {
        return JSON.stringify(context);
    });

    adverts.forEach(v => v.isOwner = v._acl.creator == sessionStorage.getItem('userId') ? true : false);
    adverts = adverts.sort((a, b) => b.viewsCount - a.viewsCount);

    let source = await $.get('./templates/viewAd-template.hbs');
    let template = Handlebars.compile(source);
    let html = template({ads: adverts});

    $('main').html(html);
}

async function showCreateAdView() {
    let source = await $.get('./templates/createAd-template.hbs');
    let template = Handlebars.compile(source);
    let html = template({sectionId:'viewCreateAd', classType:'viewCreateAd', titleForm:'Create new Advertisement',
        formId:'formCreateAd', btnId:'buttonCreateAd', btnValue:'Create'});
    $('main').html(html);

    attachCreateAdEvent();
}

async function showEditAdView(advert) {

    let source = await $.get('./templates/createAd-template.hbs');
    let template = Handlebars.compile(source);
    let html = template({sectionId:'viewEditAd', classType:'viewEditAd',
        titleForm:'Edit existing advertisement', formId:'formEditAd', btnId:'buttonEditAd', btnValue:'Edit'});
    $('main').html(html);

    $('#formEditAd input[name=id]').val(advert._id);
    $('#formEditAd input[name=title]').val(advert.title);
    $('#formEditAd textarea[name=description]').val(advert.description);
    $('#formEditAd input[name=datePublished]').val(advert.date);
    $('#formEditAd input[name=price]').val(advert.price);
    $('#formEditAd input[name=image]').val(advert.image);
    $('#formEditAd input[name=viewsCount]').val(advert.viewsCount);
    $('#formEditAd input[name=publisher]').val(advert.publisher);

    attachEditAdEvent();
}

async function showReadMoreView(advert) {
    let source = await $.get('./templates/readMore-template.hbs');
    let template = Handlebars.compile(source);
    let html = template({link: advert.image, title:advert.title, description:advert.description,
        publisher:advert.publisher, date: advert.date, views: advert.viewsCount});

    $('main').html(html);
}

async function showInfo(message) {

    let source = await $.get('./templates/infobox-template.hbs');
    let template = Handlebars.compile(source);
    let html = template(getBox('infoBox', 'infoBox', message));

    $('main').append(html);

    setTimeout(function () {
        $('#infoBox').fadeOut()
    }, 3000)
}

async function showError(errorMsg) {
    let source = await $.get('./templates/infobox-template.hbs');
    let template = Handlebars.compile(source);
    let html = template(getBox('errorBox', 'errorBox', 'Error: ' + message));

    $('main').append(html);
}