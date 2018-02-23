function calendar(input) {
    let date = new Date(input[2], input[1], 0);
    let daysInMonth = date.getDate();
    date.setDate(1);
    let startingDay = date.getDay();
    if (startingDay == 0) {
        startingDay = 7;
    }
    let content = $('#content');
    let monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    let table = $('<table><tr><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th><th>Sun</th></tr></table>');
    table.append($('<caption>' + monthNames[input[1] - 1] + ' ' + input[2] + '</caption>'))
    let currentDay = 1-startingDay;
    let finished = false;
    while(!finished) {
        let currentRow = $('<tr></tr>');
        for (let j = 0; j < 7; j++) {
            let currentCol;
            currentDay++;
            if (currentDay > 0 && currentDay <= daysInMonth) {
                currentCol = $('<td>' + currentDay + '</td>');
                if (currentDay === input[0]) {
                    currentCol.addClass('today');
                }
            }
            else {
                currentCol = $('<td></td>');
            }

            currentCol.appendTo(currentRow);
            if (currentDay === daysInMonth) {
                finished = true;
            }
        }

        currentRow.appendTo(table);
    }
    content.append(table);
}