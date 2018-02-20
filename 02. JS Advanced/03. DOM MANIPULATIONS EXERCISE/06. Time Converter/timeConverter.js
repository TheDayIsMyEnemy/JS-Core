function attachEventsListeners() {
    var arr = document.querySelectorAll('input');
    arr[1].addEventListener('click', function () {
        var hours = Number(arr[0].value) * 24;
        arr[2].value = hours;
        arr[4].value = hours * 60;
        arr[6].value = hours * 3600;
    });
    arr[3].addEventListener('click', function () {
        var value = Number(arr[2].value);
        arr[0].value = value / 24;
        arr[4].value = value * 60;
        arr[6].value = value * 3600;
    });
    arr[5].addEventListener('click', function () {
        var v = Number(arr[4].value);
        arr[2].value = v / 60;
        arr[0].value = (v / 60) / 24;
        arr[6].value = v * 60;
    });
    arr[7].addEventListener('click', function () {
        var seconds = Number(arr[6].value);
        arr[0].value = (seconds / 3600) / 24;
        arr[2].value = seconds / 3600;
        arr[4].value = seconds / 60;
    });
}