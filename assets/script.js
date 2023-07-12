var inputCity = '';
var currentDate = dayjs().format("(MM/DD/YYYY)");
$('#todaysDate').text(currentDate)

function getCords(url) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lon = data[0].lon;
            var lat = data[0].lat;
            var cords = [lat, lon]
            return cords
        })
        .then(function (data) {
            var weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall?lat='+ data[0] + '&lon='+ data[1] +'&exclude=minutely,hourly&units=imperial&appid=fbbc0ff2ad4eb4bfe4580caab86f90b3'
            console.log(weatherUrl)
            fetch(weatherUrl)
                .then(function (response) {
                    return response.json()
                })
                .then(function (data) {
                    console.log(data)
                    var weatherIcon = data.current.weather[0].icon;
                    var iconUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
                    $('#wicon').attr('src', iconUrl)
                    $('#cityName').text(inputCity + ' ' + currentDate)
                    $('#cityTemp').text('Temperature: ' + data.current.temp + '℉')
                    $('#cityWind').text('Wind: ' + data.current.wind_speed + 'MPH')
                    $('#cityHumidity').text('Humidity: ' + data.current.humidity + '%')
                })
        })
}

$('#searchBtn').on('click', function() {
    inputCity = $('#cityInput').val()
    var geoUrl = 'http://api.openweathermap.org/geo/1.0/direct?q=' + inputCity + '&limit=5&appid=fbbc0ff2ad4eb4bfe4580caab86f90b3'
    getCords(geoUrl)
})


