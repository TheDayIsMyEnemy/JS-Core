function attachEvents(){
    let url = 'https://baas.kinvey.com/appdata/kid_Bk5afpd9G/books';
    let base64auth = btoa('Librarian:1');
    let authHeaders = {'Authorization':'Basic ' + base64auth,
        'Content-type': 'application/json'};

    function request(method, catchId,data) {
        return $.ajax({
            method: method,
            url: url+ catchId,
            headers: authHeaders,
            data: JSON.stringify(data)
        });
    }

    $('.load').on('click', loadBooks);
    $('.add').on('click', addBook);

    function loadBooks() {
        request('GET','').then(displayBooks).catch(displayError);
    }

    function addBook() {
        let element = $(this).parent();
        let data = getBookObj(element);
        clearInputFields(element);
        request('POST','',data).then(loadBooks).catch(displayError);
    }

    function editBook() {
        let element = $(this).parent();
        let catchId = '/' + element.attr('data-id');
        let data = getBookObj(element);
        request('PUT',catchId,data).then(loadBooks).catch(displayError);
    }

    function deleteBook() {
        let element = $(this).parent();
        let catchId = '/' + element.attr('data-id');
        let data = getBookObj(element);
        element.remove();
        request('DELETE',catchId,data).then(loadBooks).catch(displayError);
    }

    function displayBooks(data) {
        $('#books').empty();
        for(let c of data){
            let div = $('<div>').addClass('catch').attr('data-id', c._id)
                .append($(`<label>Title</label>`))
                .append($(`<input type="text" class="title" value="${c.title}"/>`))
                .append($('<label>Author</label>'))
                .append($(`<input type="text" class="author" value="${c.author}"/>`))
                .append($(`<label>ISBN</label>`))
                .append($(`<input type="text" class="isbn" value="${c.isbn}"/>`))
                .append($('<button class="update">Edit</button>').click(editBook))
                .append($('<button class="delete">Delete</button>').click(deleteBook));
            $('#books').append(div);
        }
    }

    function displayError(err) {
        console.log(err);
    }

    function getBookObj(element) {
        return {
            title: element.find('.title').val(),
            author: element.find('.author').val(),
            isbn: element.find('.isbn').val(),
        }
    }

    function clearInputFields(form) {
        form.find('.title').val('');
        form.find('.author').val('');
        form.find('.isbn').val('');
    }
}