function increment(selector) {
    var item = $(selector);
    var fragment = document.createDocumentFragment();
    var textArea = $('<textarea>');
    var incrementBtn = $('<button>Increment</button>');
    var addBtn = $('<button>Add</button>');
    var list = $('<ul>');

    textArea.val(0);
    textArea.addClass('counter');
    textArea.attr('disabled', true);

    incrementBtn.addClass('btn');
    incrementBtn.attr('id', 'incrementBtn');
    addBtn.addClass('btn');
    addBtn.attr('id', 'addBtn');

    list.addClass('results');

    incrementBtn.on('click', function () {
        textArea.val(Number(textArea.val())+1);
    })
    
    addBtn.on('click', function () {
        var li = $('<li>');
        li.text(textArea.val());
        list.append(li);
    })

    textArea.appendTo(fragment);
    incrementBtn.appendTo(fragment);
    addBtn.appendTo(fragment);
    list.appendTo(fragment);

    item.append(fragment);
}