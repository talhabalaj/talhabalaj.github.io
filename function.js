// Getting Location of Mobile Client using GPS
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, handleError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}
// showing the Position and passing to weather API
function showPosition(position) {
    var lat =position.coords.latitude;
    var long = position.coords.longitude;
    dataRec = {
    	lat,
    	long
    };
    getResultBylatLong(dataRec.lat, dataRec.long);
}
// Handling Error For GPS 
function handleError(error) {
	  switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}
// Getting to know about the Client function
var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
// Defining the Main Variable
var dataRec = {};
// Getting to know about the Client
if( isMobile.any()) {
	// Getting Coodinates by GPS
	getLocation();
} else {
	// Getting Coodinates, City name, Country name by IP
	locURL = "https://freegeoip.net/json/";
	sampleLocURL = "location.json";
    $.ajax({
	       url: locURL,
	       dataType: 'json',
	       async:false,
	       success: function(data) {
	        var country = data.country_code;
	        var city = data.city;
	        var lat = data.latitude;
	        var long = data.longitude;
	        dataRec = {
	        	city,
	        	country,
	        	lat,
	        	long
	        }; 
        }
   	});
    getResultByIP(dataRec.city, dataRec.country, dataRec.lat, dataRec.long);
}
// Getting The Weather on Phone with their GPS
function getResultBylatLong(lat, long) {
	// So Here We are creating a Function That Does the Magic
	_("lat").textContent = lat + " N";
	_("long").textContent = long + " E";
	var apikey = "8691065341cc4bc2b2030259170801";
	var url = "https://api.apixu.com/v1/current.json?key="+ apikey + "&q=" + lat +"," + long;
	getJSON(url);
}
// Getting The Weather on PC with their IP
function getResultByIP(city, country, lat, long) {
	// So Here We are creating a Function That Does the Magic
	_("lat").textContent = lat + " N";
	_("long").textContent = long + " E";
	var apikey = "8691065341cc4bc2b2030259170801";
	var url = "https://api.apixu.com/v1/current.json?key="+ apikey + "&q=" + city +"," + country;
	getJSON(url);
}
// Helper Function
function _(rl) {
	return document.getElementById(rl);
}
// Main JSON Implementation 
function getJSON(url) {
	$(document).ready(function() {
		$.getJSON(url, function( data ) {
			loc = data.location.name;
			cont = data.location.country;
			lat = data.location.lat;
			lon = data.location.lon;
			cond = data.current.condition.text;
			icon = data.current.condition.icon;
			if(icon.startsWith("//cdn.apixu.com/weather/64x64/night/")){
				icon = icon.substr(36, 7);	
			} else {
				icon = icon.substr(34, 7);	
			}
			temp = Number(Math.round(data.current.temp_c));
			_("weatherImage").src = "icons/" + icon;
			_("weatherTemp").textContent = temp + "°C";
			_("weatherCondition").textContent = cond;
			_("weatherLocation").textContent = loc + ", " + cont;
			_("lat").textContent = lat + " N";
			_("long").textContent = lon + " E";
			document.getElementsByTagName('title')[0].innerHTML = "Today's Weather in " + loc;
		});
	});
}