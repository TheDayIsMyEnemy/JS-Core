function move(command) {
    let availableTowns = $('#available-towns');
    let selectedTowns = $('#selected-towns');
    let div = $('#output');

    if(command == 'right'){
        let value = availableTowns.val();
        $('#available-towns option:selected').remove();
        selectedTowns.append($('<option>').text(value));
    }
    else if(command == 'left'){
        let value = selectedTowns.val();
        $('#selected-towns option:selected').remove();
        availableTowns.append($('<option>').text(value));
    }
    else if(command == 'print'){
        let result = selectedTowns.children().toArray().map(v=> $(v).text().trim()).join('; ');
        div.append(result);
    }
}

//auhor's solution
function move(direction) {
    if (direction === 'right') {
        let townsToMove = $('#available-towns').find('option:selected');
        townsToMove.prop('selected', false);
        $('#selected-towns').append(townsToMove);
    }
    if (direction === 'left') {
        let townsToMove = $('#selected-towns').find('option:selected');
        townsToMove.prop('selected', false);
        $('#available-towns').append(townsToMove);
    }
    if (direction === 'print') {
        let townsToPrint = $('#selected-towns').find('option').toArray().map(o => o.textContent);
        $('#output').text(townsToPrint.join('; '));
    }
}