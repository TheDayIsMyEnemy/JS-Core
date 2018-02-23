function timer() {
    var starTime = $('#start-timer');
    var stopTimer = $('#stop-timer');

    var timer;
    var running = false;
    var hours = $('#hours');
    var mins = $('#minutes');
    var seconds = $('#seconds');


    
    function time() {
        var h = Number(hours.text());
        var m = Number(mins.text());
        var s = Number(seconds.text());
        s++;

       if(s == 60){
           s=0;
           m++;
       }
       if(s < 10){
           s= '0' + s;
       }
        seconds.text(s);
       if(m < 10){
           m = '0'+m;
       }
        if(m == 60){
            m = 0;
            h++;
        }
        if(h < 10){
            h = '0' + h;
        }
        mins.text(m);
        hours.text(h);

    }

    starTime.on('click',function () {
        if(!running){
            timer = setInterval(time,1000);
            running = true;
        }
    })

    stopTimer.on('click', function () {
        clearInterval(timer);
        running =false;
    })


}