const express = require('express');
const https = require('https');
const app = express();
app.use(express.urlencoded({extended: true}));

app.get("/", function(req, res){
    const city = "San Diego";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7a6c96760e0291cac0329b07c8f521df&units=imperial"; // inserting user input for city name into API call
    renderData(url, res, city);
});


app.listen(3000, function(){
    console.log('Server open on port 3000');
});

function renderData(url, res, city) {
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const country = weatherData.sys.country;
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const description = weatherData.weather[0].description;
            const max = weatherData.main.temp_max;
            const min = weatherData.main.temp_min;

            const iconId = weatherData.weather[0].icon;
            const icon = "http://openweathermap.org/img/wn/" + iconId + "@2x.png";

            res.render("index.ejs", {
                cityName: city,
                countryName: country,
                weatherCondition: description,
                icon: icon,
                temp: temp,
                max: max,
                min: min,
                humidity: humidity
            });
            
        });
    });
}
