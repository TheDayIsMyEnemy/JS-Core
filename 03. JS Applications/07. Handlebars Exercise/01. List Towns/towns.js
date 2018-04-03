function attachEvents() {
    $('#btnLoadTowns').on('click', function () {
        let towns = $('#towns').val().split(', ').map(t=> ({town: t}));
        console.log(towns);
        let source = $('#towns-template').html();
        let template = Handlebars.compile(source);
        let html = template({towns: towns});
        $('#root').append(html);
    });
}