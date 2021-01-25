var cityNameInputEl = document.querySelector("#cityname");
var cityFormEl = document.querySelector("#city-form");
var apiKey = "c20559f5ed4e6410cc850ed0d132b5dd";

var formSubmitHandler = function(event) {
    event.preventDefault();

    var cityname = cityNameInputEl.value.trim();

    if (cityname) {
        getCity(cityname);
        cityNameInputEl.textContent = "";
    } else {
        alert("Please enter a City Name")
    }

};

var getCity = function(city) {

    var apiKey = "c20559f5ed4e6410cc850ed0d132b5dd";

    var apiUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" +city+"&appid=c20559f5ed4e6410cc850ed0d132b5dd";

    // make a get request to url
    fetch(apiUrl) 
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var cityname = data['city']['name'];
            console.log("City Name is: " + cityname)
            var humidity = data['list']['0']['main']['humidity'];
            console.log("Humidity is: " + humidity)
            var windspeed = data['list']['0']['wind']['speed'];
            console.log("Windspeed is: " + windspeed)
            var pressure = data['list']['0']['main']['pressure'];
            console.log("Pressure is: " + pressure)

            var currentdate = moment().format('L');
            console.log("The current Date is: " + currentdate)

            document.querySelector("#city").innerHTML = " " + cityname + " " + currentdate;
            document.querySelector("#humidity").innerHTML = " " + humidity + "%";
            document.querySelector("#wind").innerHTML = " " + windspeed;
            document.querySelector("#pressure").innerHTML = " " + pressure;

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

            //loop to display weather forecast 1-5 card innerHTML
            for (var i = 1; 1 < 5; i++) {
                var fivedays = moment().add(i, 'days').format('L');
                document.querySelector(".date"+i).innerHTML = "<span class='block'><b>"+fivedays+"</b></span>";
                document.querySelector(".temperature"+i).innerHTML = "<span class='block'><b>"+"Temp: "+temperature[i]+"</b></span>"
                document.querySelector(".humidity"+i).innerHTML = "<span class='block'><b>"+"Temp: "+humiditycard[i]+"</b></span>"
            }
        })

};







cityFormEl.addEventListener("submit", formSubmitHandler)
