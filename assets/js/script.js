
var cityNameInputEl = document.querySelector("#cityname");
var cityFormEl = document.querySelector("#city-form");
var apiKey = "c20559f5ed4e6410cc850ed0d132b5dd";
var recentsearch = {};
var clearhistorybtn = document.querySelector("#clear-history");
var id = 0;
var index = 0;

var clearHistory = function() {
    localStorage.clear();
    
    location.reload();

}

var saveSearch = function() {
    localStorage.setItem("recentsearch", JSON.stringify(recentsearch));
}

var loadCity = function () {

    recentsearch = JSON.parse(localStorage.getItem("recentsearch"));

    if (!recentsearch) {
        recentsearch = {
            recentcity: [],
            recentcoord: [],
            uvindex: [],
        }
    } 

    if (recentsearch.recentcity.length > 0) {
        for (var i = 0; 0 <= recentsearch.recentcity.length; i++) {
            if (i === recentsearch.recentcity.length) {break; } else {
            var recentlist = document.getElementById("recent-list");
            var listEl = document.createElement("li");
        
            var recentButtonEl = document.createElement("button");
            recentButtonEl.classList = "recent-btn";
            recentButtonEl.setAttribute("onclick", "clickButton(this.id)");

            recentButtonEl.textContent = recentsearch.recentcity[i].city;
            recentButtonEl.setAttribute("id", "new-"+i);
            listEl.appendChild(recentButtonEl);
            recentlist.appendChild(listEl);
            }
        }
    }

    console.log(recentsearch);

    $.each(recentsearch, function(list, arr) {
        console.log(list, arr);
    })

}

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityname = cityNameInputEl.value.trim();

    if (cityname) {
        getCity(cityname);

        cityNameInputEl.textContent = "";

        var recentlist = document.getElementById("recent-list");
        var listEl = document.createElement("li");
        console.log(listEl);
    
        var recentButtonEl = document.createElement("button");
        recentButtonEl.classList = "recent-btn";
        recentButtonEl.setAttribute("onclick", "clickButton(this.id)");

        recentButtonEl.setAttribute("id", "new-"+id);
        recentButtonEl.textContent = cityname;

        console.log("The NEW id: " + id);
    
        listEl.appendChild(recentButtonEl);
        recentlist.appendChild(listEl);
    } else {
        alert("Please enter a City Name")
    }

    recentsearch.recentcity.push({
        city: cityname,
        searchID: id
    })
    
    
    saveSearch();
    id++;

};

var clickButton = function(clicked_id) {
    var location = document.getElementById(clicked_id).textContent;
    alert("Searching recent selected history: " + location);

    console.log(location);

    getCity(location);
}

var getCity = function(city) {

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" +city+"&appid=c20559f5ed4e6410cc850ed0d132b5dd";

    // make a get request to url
    fetch(apiUrl) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var cityname = data['city']['name'];
            var humidity = data['list']['0']['main']['humidity'];
            var windspeed = data['list']['0']['wind']['speed'];
            var lat = data['city']['coord'];

            console.log(data)
            console.log("City Name is: " + cityname)
            console.log("Humidity is: " + humidity)
            console.log("Windspeed is: " + windspeed)
            console.log(lat)

            recentsearch.recentcoord.push({
                lat: lat.lat,
                lon: lat.lon,
            })

            saveSearch();

            index++;

            var currentdate = moment().format('L');
            console.log("The current Date is: " + currentdate)

            document.querySelector("#city").innerHTML = " " + cityname + " " + currentdate;
            document.querySelector("#humidity").innerHTML = " " + humidity + "%";
            document.querySelector("#wind").innerHTML = " " + windspeed;

            //temperate variables
            var temp1 = (data['list']['0']['main']['temp'] - 273.15).toFixed(2);
            var temp2 = (data['list']['7']['main']['temp'] - 273.15).toFixed(2);
            var temp3 = (data['list']['15']['main']['temp'] - 273.15).toFixed(2);
            var temp4 = (data['list']['23']['main']['temp'] - 273.15).toFixed(2);
            var temp5 = (data['list']['31']['main']['temp'] - 273.15).toFixed(2);

            var temperature = ["temp", temp1, temp2, temp3, temp4, temp5];
            console.log(temperature[1]);

            //humidity variables
            var hum1 = data['list']['0']['main']['humidity'];
            var hum2 = data['list']['7']['main']['humidity'];
            var hum3 = data['list']['15']['main']['humidity'];
            var hum4 = data['list']['23']['main']['humidity'];
            var hum5 = data['list']['31']['main']['humidity'];

            var humiditycard = ["hum", hum1, hum2, hum3, hum4, hum5];
            console.log(humiditycard);

            var icon1 = data['list']['0']['weather']['0']['icon'];
            var icon2 = data['list']['7']['weather']['0']['icon'];
            var icon3 = data['list']['15']['weather']['0']['icon'];
            var icon4 = data['list']['23']['weather']['0']['icon'];
            var icon5 = data['list']['31']['weather']['0']['icon'];

            var icons = ["icon", icon1, icon2, icon3, icon4, icon5];
            console.log(icons);

            //loop to display weather forecast 1-5 card innerHTML
            for (var i = 1; 1 < 5; i++) {
                if (i === 6) {break;} else {
                var fivedays = moment().add(i, 'days').format('L');
                document.querySelector(".date"+i).innerHTML = "<span class='block'><b>"+fivedays+"</b></span>";
                document.querySelector(".temperature"+i).innerHTML = "<span class='block'><b>"+"Temp: "+temperature[i]+"</b></span>";
                document.querySelector(".humidity"+i).innerHTML = "<span class='block'><b>"+"Humidity: "+humiditycard[i]+"</b></span>";
                document.querySelector(".icon"+i).innerHTML = "<img class='weather-icon' src='http://openweathermap.org/img/w/" + icons[i] + ".png'/>";}
            }

            var index = recentsearch.recentcoord.length - 1;

            console.log(index);
            
            var latitude = recentsearch.recentcoord[index].lat;
            var longitude = recentsearch.recentcoord[index].lon;

            console.log(latitude);
            console.log(longitude);

            var apiUv = "http://api.openweathermap.org/data/2.5/uvi?lat="+latitude+"&lon="+longitude+"&appid=c20559f5ed4e6410cc850ed0d132b5dd";

            // make a get request to url
            fetch(apiUv) 
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    var uv = data['value'];

                    recentsearch.uvindex.push({uv})

                    saveSearch()

                    if (uv <= 3) {
                        document.querySelector("#uv").innerHTML = "<b class='uv1'>" + uv + "</b>";
                    } else if (
                        uv <= 6
                    ) {
                        document.querySelector("#uv").innerHTML = "<b class='uv2'>" + uv + "</b>";
                    } else if (
                        uv <= 9
                    ) {
                        document.querySelector("#uv").innerHTML = "<b class='uv3'>" + uv + "</b>";
                    }
                })
        })
    
};

loadCity();
cityFormEl.addEventListener("submit", formSubmitHandler)
clearhistorybtn.addEventListener("submit", clearHistory)