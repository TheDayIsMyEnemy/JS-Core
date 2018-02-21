function attachEvents() {
    var items = $('#items li');
    items.on('click', function () {
        var li = $(this);
        if(!li.attr('data-selected'))
        {
            li.css('background-color', '#DDD');
            li.attr('data-selected', 'true');
        }
        else{
            li.removeAttr('data-selected');
            li.css('background-color', '');
        }
    })

     $('#showTownsButton').on('click', function () {
         var result = $('#selectedTowns');
         var towns = [];
         var selectedTowns = $('#items li');
         for (let obj of selectedTowns) {
             if($(obj).attr('data-selected') === 'true'){
                 towns.push($(obj).text());
             }
         }
         result.text('Selected towns: ' + towns.join(', '));
     })
}