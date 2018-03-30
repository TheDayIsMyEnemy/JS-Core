const BASE_URL = 'https://baas.kinvey.com/'
const APP_KEY = 'kid_Bk5afpd9G'
const APP_SECRET = '5762486163ca47119ed05e68833120c3'
const AUTH_HEADERS = {'Authorization': "Basic " + btoa(APP_KEY + ":" + APP_SECRET)}
const BOOKS_PER_PAGE = 10;

function request(method, url, headers, data) {
    return $.ajax({
        method: method,
        url: BASE_URL + url,
        headers: headers,
        data: data
    });
}

function loginUser() {
    let username = $('#formLogin input[name=username]').val();
    let password = $('#formLogin input[name=passwd]').val();
    let user = {username, password};
    request('POST', 'user/' + APP_KEY + '/login', AUTH_HEADERS, user)
        .then((res) => signInUser(res, 'Login successful.'))
        .catch(handleAjaxError);
}

function registerUser() {
    let username = $('#formRegister input[name=username]').val();
    let password = $('#formRegister input[name=passwd]').val();
    let user = {username, password};
    request('POST', 'user/' + APP_KEY + '/', AUTH_HEADERS, user)
        .then((res) => signInUser(res, 'Registration successful.'))
        .catch(handleAjaxError);
}

function listBooks() {
    request('GET', 'appdata/' + APP_KEY + '/books', getAuthHeaders(), '')
        .then(function (res) {
            showView('viewBooks');
            displayPaginationAndBooks(res);
        })
        .catch(handleAjaxError);
}


function createBook() {
    let title = $('#formCreateBook input[name=title]').val();
    let author = $('#formCreateBook input[name=author]').val();
    let description = $('#formCreateBook textarea[name=description]').val();
    let book = {title, author, description};
    request('POST', 'appdata/' + APP_KEY + '/books', getAuthHeaders(), book)
        .then(function () {
            listBooks();
            showInfo('Book created.');
        })
        .catch(handleAjaxError);
}

function deleteBook(book) {
    request('DELETE', 'appdata/' + APP_KEY + '/books/' + book._id, getAuthHeaders(), '')
        .then(function () {
            listBooks()
            showInfo('Book deleted.');
        })
        .catch(handleAjaxError);
}

function loadBookForEdit(book) {
    $('#formEditBook input[name=id]').val(book._id);
    $('#formEditBook input[name=title]').val(book.title);
    $('#formEditBook input[name=author]').val(book.author);
    $('#formEditBook textarea[name=description]').val(book.description);
    showView('viewEditBook');
}

function editBook() {
    let bookId = $('#formEditBook input[name=id]').val();
    let title = $('#formEditBook input[name=title]').val();
    let author = $('#formEditBook input[name=author]').val();
    let description = $('#formEditBook textarea[name=description]').val();

    request('PUT', 'appdata/' + APP_KEY + '/books/' + bookId, getAuthHeaders(), {title, author, description})
        .then(function () {
            showInfo('Book edited.');
            listBooks();
        })
        .catch(handleAjaxError);
}

function logoutUser() {
    sessionStorage.clear();
    showHomeView();
    showHideMenuLinks();
    showInfo('Logout successful.');
}

function signInUser(res, message) {
    saveAuthInSession(res);
    showHomeView();
    showHideMenuLinks();
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

function displayPaginationAndBooks(books) {
    let pagination = $('#pagination-demo')
    if (pagination.data("twbs-pagination")) {
        pagination.twbsPagination('destroy')
    }
    pagination.twbsPagination({
        totalPages: Math.ceil(books.length / BOOKS_PER_PAGE),
        visiblePages: 5,
        next: 'Next',
        prev: 'Prev',
        onPageClick: function (event, page) {
            let table = $('#books > table');
            table.find('tr').each((i, e) => {
                if (i > 0) {
                    $(e).remove()
                }
                ;
            });
            let startBook = (page - 1) * BOOKS_PER_PAGE
            let endBook = Math.min(startBook + BOOKS_PER_PAGE, books.length)
            $(`a:contains(${page})`).addClass('active')
            for (let i = startBook; i < endBook; i++) {
                let book = books[i];
                let tr = ($('<tr>')
                    .append($(`<td>${book.title}</td>`))
                    .append($(`<td>${book.author}</td>`))
                    .append($(`<td>${book.description}</td>`)));
                if (sessionStorage.getItem('userId') == book._acl.creator) {
                    let td = ($('<td>')
                        .append($('<a href="#">[Edit]</a>').on('click', function () {
                            loadBookForEdit(book);
                        }))
                        .append($('<a href="#">[Delete]</a>').on('click', function () {
                            deleteBook(book)
                        })));
                    tr.append(td);
                }
                table.append(tr);
            }

                }
            })
        }