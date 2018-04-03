$(() => {
    renderCatTemplate();

    function renderCatTemplate() {
        let source = $('#cat-template').html();
        let template = Handlebars.compile(source);
        let html = template({cats: window.cats});
        $('#allCats').append(html);

        $('.btn-primary').on('click', function () {
           let btn = $(this);
           if(btn.text() === 'Show status code'){
               btn.text('Hide status code');
           }
           else{
               btn.text('Show status code');
           }
           btn.next('div').toggle();
        });
    }

})
