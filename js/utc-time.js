//time UTC

var interval = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    var t = new Date(d.getTime() + d.getTimezoneOffset() * 60000);
    document.getElementById("utc-time").innerHTML = t;
}

