function createBook(selector, title, author , ISBN) {
    var select0r = $(selector);
    var count = select0r.children().length + 1;


    var div = $('<div>');
    div.attr('id', `book${count}`);
    div.css('border', 'medium none');
    var p1 = $(`<p>${title}</p>`);
    p1.attr('class', 'title');
    p1.appendTo(div);
    var p2 = $(`<p class="author">${author}</p>`)
    p2.appendTo(div);
    var p3 = $(`<p class="isbn">${ISBN}</p>`);
    p3.appendTo(div);
    var selectBtn = $('<button>Select</button>');
    var deselectBtn = $('<button>Deselect</button>')
    selectBtn.on('click', function () {
        div.css('border', '2px solid blue');
    });
    deselectBtn.on('click', function () {
        div.css('border', '');
    })
    selectBtn.appendTo(div);
    deselectBtn.appendTo(div);

    div.appendTo(select0r);

   // console.log(select0r);

}