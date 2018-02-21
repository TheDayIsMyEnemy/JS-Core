function attachEvents() {
    $('.button').on('click', function () {
        $('a.button').removeClass('selected');
        $(this).addClass('selected');

       //if(!$(this).hasClass('selected')){
       //    $(this).addClass('selected');
       //}
       //else{
       //    $(this).removeClass('selected');
       //}
     })
}//