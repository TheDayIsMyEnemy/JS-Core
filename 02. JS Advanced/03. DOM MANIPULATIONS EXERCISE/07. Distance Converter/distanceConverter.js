function attachEventsListeners() {

    var distanceObj = {
        km: 1000,
        m: 1,
        cm: 0.01,
        mm: 0.001,
        mi: 1609.34,
        yrd: 0.9144,
        ft: 0.3048,
        in: 0.0254,
    };

        var btn = document.getElementById('convert');

        btn.addEventListener('click', function () {
            var selected = document.querySelectorAll('option:checked');
            var inputDistance = Number(document.getElementById('inputDistance').value);
            var result = inputDistance * distanceObj[selected[0].value] / distanceObj[selected[1].value];
            document.getElementById('outputDistance').value = result;

        })
}