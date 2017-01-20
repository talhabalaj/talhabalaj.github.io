// Debugging Variable 
var DebugMode = false;
if(DebugMode){
	document.getElementsByTagName('h1')[0].textContent= "Weather App [ In DebugMode ])";
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
// Helper Function
function _(rl) {
	return document.getElementById(rl);
}
function CurrentIPLocation() {
	locURL = "https://freegeoip.net/json/";
	// Setting Sample Data When in Debug Mode
	if(DebugMode){
		locURL = "location.json";
	}
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        data = JSON.parse(this.responseText);
	        var lat = data.latitude;
	        var long = data.longitude;
			var CurrentWeatherURL =  CurrentWeather(lat, long);
			var ForecastWeatherURL =  ForecastWeather(lat , long);
			// Debug Mode 
			if(DebugMode){
				CurrentWeatherURL = "weather.json";
				ForecastWeatherURL = "forecast.json";
			}
			GetCurrentWeather(CurrentWeatherURL);
			GetForecastWeather(ForecastWeatherURL);	
	    }
	};
	xmlhttp.open("GET", locURL, true);
	xmlhttp.send();
}
function CurrentWeather(lat, long) {
	var apikey = "8691065341cc4bc2b2030259170801";
	var JsonUrl = "https://api.apixu.com/v1/current.json?key="+ apikey + "&q=" + lat +"," + long;
	return JsonUrl;
}
function ForecastWeather(lat, long) {
	var apikey = "8691065341cc4bc2b2030259170801";
	var JsonUrl = "https://api.apixu.com/v1/forecast.json?key="+ apikey + "&q=" + lat +"," + long;
	return JsonUrl;
}
// Getting Location of Mobile Client using GPS
function MobileLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
   			var long = position.coords.longitude;
			var CurrentWeatherURL =  CurrentWeatherURL(lat, long);
			var ForecastWeatherURL =  ForecastWeatherURL(lat , long);
			// Debug Mode 
			if(DebugMode){
				alert("Entering DebugMode");
				CurrentWeatherURL = "weather.json";
				ForecastWeatherURL = "forecast.json";
			}
			GetCurrentWeather(CurrentWeatherURL);
			GetForecastWeather(ForecastWeatherURL);
        }, handleError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
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
function FormatIconAsWanted(icon) {
	if(icon.startsWith("//cdn.apixu.com/weather/64x64/night/")){
		icon = icon.substr(36, 7);	
	} else {
		icon = icon.substr(34, 7);	
	}
	return icon;
}