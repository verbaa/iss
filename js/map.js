// To contain the Google API map JS
var issLocation = {}; // initiate empty lat-long object
var issLat = 45.5163719; // code fellows latitude
var issLng = -122.6765228; // code fellows longitude
var map; // google map object
var issLocRequests = 0; // counts every time new location is recieved
var parkedDataIss; // Holds lat-long obj
var reticleMarker;
var reticleImage; //iss png

var needMarker = false;
var mapOptions = {
    center: {lat: issLat, lng: issLng},
    zoom: 5,
    mapTypeId: 'satellite',
    draggable: false,
    scrollwheel: false,
}


function initMap() {
    geocoder = new google.maps.Geocoder();
    map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
}


// Recieves the ISS location from JSONP
function findISS() {
    var script = document.createElement('script');
    script.src = 'http://api.open-notify.org/iss-now.json?callback=issLoc'
    document.head.appendChild(script);
    // console.log("Iss Location updated");
    script.parentNode.removeChild(script);
    // console.log("Iss location script cleared");
    issLocRequests++;
}


// ISS location data is stored in this
function issLoc(data) {
    issLat = data.iss_position.latitude;
    issLng = data.iss_position.longitude;
    issLocation = data;
    parkedDataIss = new google.maps.LatLng(issLat, issLng);
    map.panTo(new google.maps.LatLng(issLat, issLng));
    // console.log("issLocation");
    document.getElementById("theISSIsLocatedLng").textContent = "Latitude: " + issLat;
    document.getElementById("theISSIsLocatedLat").textContent = "Longitude: " + issLng;
    if (!needMarker) {
        setMarker();
        needMarker = true;
    }
}

//Gets new ISS data and sets map center every 5 seconds
var locationTimer = setInterval(findISS, 5000);


function setMarker() {
    reticleImage = new google.maps.MarkerImage(
        'img/ship.png',          // marker image
        new google.maps.Size(93, 93),    // marker size
        new google.maps.Point(0, 0),      // marker origin
        new google.maps.Point(32, 32));  // marker anchor point
    var reticleShape = {
        coords: [32, 32, 32, 32],           // 1px
        type: 'rect'                     // rectangle
    };

    console.log("blocked");

    reticleMarker = new google.maps.Marker({
        position: parkedDataIss,
        map: map,
        icon: reticleImage,
        shape: reticleShape,
        optimized: false,
        zIndex: 5
    });
    google.maps.event.addListener(map, 'bounds_changed',
        function () {
            reticleMarker.setPosition(map.getCenter());
        });

}

console.log("unseen");
