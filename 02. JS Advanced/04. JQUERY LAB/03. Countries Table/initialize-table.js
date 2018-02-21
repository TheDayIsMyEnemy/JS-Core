function initializeTable() {
    $('#createLink').click(create);

    addCountry('Bulgaria', 'Sofia');
    addCountry('Germany', 'Berlin');
    addCountry('Russia', 'Moscow');

    function addCountry(country, capital) {
        var row = $('<tr>');
        row
            .append($('<td>').text(country))
            .append($('<td>').text(capital))
            .append($('<td>')
                .append($('<a href="#">[Up]</a>').click(moveRowUp))
                .append($('<a href="#">[Down]</a>').click(moveRowDown))
                .append($('<a href="#">[Delete]</a>').click(deleteRow)));
        $('#countriesTable').append(row);
        fixRowLinks();
    }

    function create() {
        var country = $('#newCountryText').val();
        var capital = $('#newCapitalText').val();
        addCountry(country, capital);
    }

    function deleteRow() {
        let row = $(this).parent().parent();
        row.remove();
        fixRowLinks();
    }

    function moveRowUp() {
        let row = $(this).parent().parent();
        row.insertBefore(row.prev());
        fixRowLinks();
    }

    function moveRowDown() {
        let row = $(this).parent().parent();
        row.insertAfter(row.next());
        fixRowLinks();
    }

    function fixRowLinks() {
        // Show all links in the table
        $('#countriesTable a').css('display', 'inline');

        // Hide [Up] link in first table data row
        let tableRows = $('#countriesTable tr');
        $(tableRows[2]).find("a:contains('Up')")
            .css('display', 'none');

        // Hide the [Down] link in the last table row
        $(tableRows[tableRows.length - 1]).find("a:contains('Down')")
            .css('display', 'none');
    }
}