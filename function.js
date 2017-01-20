// Getting to know about the Client
if( isMobile.any()) {
	// Getting Coodinates by GPS
	MobileLocation();
} else {
	// Getting Coodinates, City name, Country name by IP
	CurrentIPLocation();
}
// Getting Current Weather
function GetCurrentWeather(CurrentWeatherURL) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        data = JSON.parse(this.responseText);
			loc = data.location.name;
			cont = data.location.country;
			lat = data.location.lat;
			lon = data.location.lon;
			cond = data.current.condition.text;
			icon = data.current.condition.icon;
			icon = FormatIconAsWanted(icon);
			temp = Number(Math.round(data.current.temp_c));
			_("weatherImage").src = "icons/" + icon;
			_("weatherTemp").textContent = temp + "°C";
			_("weatherCondition").textContent = cond;
			_("weatherLocation").textContent = loc + ", " + cont;
			_("lat").textContent = lat + " N";
			_("long").textContent = lon + " E";
			document.getElementsByTagName('title')[0].innerHTML = "Today's Weather in " + loc;	
	    }
	};
	xmlhttp.open("GET", CurrentWeatherURL, true);
	xmlhttp.send();
}
function GetForecastWeather(ForecastWeatherURL) {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
	    if (this.readyState == 4 && this.status == 200) {
	        data = JSON.parse(this.responseText);
	        // for (var i = data.forecast.forecastday.length; i >= 0; i--) {
	        // 	var data.forecast.forecastday[i].astro;
	        // }
	    }
	};
	xmlhttp.open("GET", ForecastWeatherURL, true);
	xmlhttp.send();
}