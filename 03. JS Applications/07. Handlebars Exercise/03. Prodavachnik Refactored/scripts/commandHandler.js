const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_r1EzdJ35G'
const APP_SECRET = '20a8499d7d46433eb94eb9473b8d7a14'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}

function request(method, url, headers, data) {
    return $.ajax({
        method: method,
        url: BASE_URL + url,
        headers: headers,
        data: data
    });
}

function registerUser() {
    let username = $('#formRegister input[name=username]').val();
    let password = $('#formRegister input[name=passwd]').val();
    let user = {username, password};
   request('POST', 'user/' + APP_KEY + '/', AUTH_HEADERS, user)
       .then((res) => signInUser(res, 'Registration successful.'))
       .catch(handleAjaxError);
}

function loginUser() {
    let username = $('#formLogin input[name=username]').val();
    let password = $('#formLogin input[name=passwd]').val();
    let user = {username, password};
    request('POST', 'user/' + APP_KEY + '/login', AUTH_HEADERS, user)
        .then((res) => signInUser(res, 'Login successful.'))
        .catch(handleAjaxError);
}

function listAds() {
    request('GET', 'appdata/' + APP_KEY + '/prodavachnik', getAuthHeaders(), '')
        .then((res)=> showAdvertsView(res))
        .catch(handleAjaxError);
}

function createAd() {
    let title = $('#formCreateAd input[name=title]').val();
    let description = $('#formCreateAd textarea[name=description]').val();
    let date = $('#formCreateAd input[name=datePublished]').val();
    let price = $('#formCreateAd input[name=price]').val();
    let image = $('#formCreateAd input[name=image]').val();

    let ad = {title, description, date, price, publisher: sessionStorage.getItem('username'),
    image, viewsCount: 0};

    request('POST', 'appdata/' + APP_KEY + '/prodavachnik', getAuthHeaders(), ad)
        .then(function () {
            showInfo('Advertisement created.');
            listAds();
        })
        .catch(handleAjaxError);
}

function deleteAd(ad) {
    request('DELETE', 'appdata/' + APP_KEY + '/prodavachnik/' + ad._id, getAuthHeaders(), '')
        .then(function () {
            listAds()
            showInfo('Ad deleted.');
        })
        .catch(handleAjaxError);
}

function editAd() {
    let id = $('#formEditAd input[name=id]').val();
    let title =$('#formEditAd input[name=title]').val();
    let  description = $('#formEditAd textarea[name=description]').val();
    let date = $('#formEditAd input[name=datePublished]').val();
    let price = $('#formEditAd input[name=price]').val();
    let image = $('#formEditAd input[name=image]').val();
    let viewsCount = $('#formEditAd input[name=viewsCount]').val();
    let publisher = $('#formEditAd input[name=publisher]').val();
    request('PUT', 'appdata/' + APP_KEY + '/prodavachnik/' + id, getAuthHeaders(),
        {title, description, date, price, image, viewsCount, publisher})
        .then(function () {
            showInfo('Advert edited.');
            listAds();
        })
        .catch(handleAjaxError);
}

function incrementViews(advert) {
    advert.viewsCount++;
    request('PUT', 'appdata/' + APP_KEY + '/prodavachnik/' + advert._id, getAuthHeaders(),
        advert)
        .then(function (res) {
           showReadMoreView(res);
        })
        .catch(handleAjaxError);
}

function logoutUser() {
    sessionStorage.clear();
    showHomeView();
    showInfo('Logout successful.');
}

function signInUser(res, message) {
    saveAuthInSession(res);
    showHomeView();
    showInfo(message);
}

function saveAuthInSession(userInfo) {
    sessionStorage.setItem('username', userInfo.username);
    sessionStorage.setItem('authToken', userInfo._kmd.authtoken);
    sessionStorage.setItem('userId', userInfo._id);
}

function getAuthHeaders() {
    return {'Authorization': 'Kinvey ' + sessionStorage.getItem('authToken')};
}

function handleAjaxError(response) {
    let errorMsg = JSON.stringify(response)
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error."
    if (response.responseJSON && response.responseJSON.description)
        errorMsg = response.responseJSON.description
    showError(errorMsg)
}

