const url = 'https://api.openweathermap.org/data/2.5/weather?';
const icon_url = 'https://openweathermap.org/img/wn/';
const api_key = 'api-avain'; // Korvaa omalla API-avaimellasi

// HTML-elementit, joihin tiedot näytetään
const temp_span = document.querySelector('#temp');
const speed_span = document.querySelector('#speed');
const direction_span = document.querySelector('#direction');
const description_span = document.querySelector('#description');
const icon_img = document.querySelector('img');

// Funktio käyttäjän sijainnin saamiseksi
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude.toFixed(3);
                const lng = position.coords.longitude.toFixed(3);
                document.querySelector('#lat').innerHTML = lat + ',';
                document.querySelector('#lng').innerHTML = lng;
                // Kutsutaan getWeather-funktiota sijainnin perusteella
                getWeather(lat, lng);
            },
            error => {
                alert('Geolocation error: ' + error.message);
            }
        );
    } else {
        alert("Your browser does not support geolocation!");
    }
}

// Funktio sään hakemiseksi OpenWeather API:sta
const getWeather = (lat, lng) => {
    const address = `${url}lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`;
    
    axios.get(address)
        .then(response => {
            const json = response.data;
            temp_span.innerHTML = json.main.temp + '&#176;C';  // Celsius-aste
            speed_span.innerHTML = json.wind.speed + ' m/s';
            direction_span.innerHTML = json.wind.deg + '&#176;';  // Aste-symboli
            description_span.innerHTML = json.weather[0].description;
            
            // Päivitetään sääikoni
            const image = icon_url + json.weather[0].icon + '@2x.png';
            icon_img.src = image;
        })
        .catch(error => {
            alert('Error fetching weather: ' + error);
        });
}

// Kutsutaan getLocation-funktiota sivun latautuessa
getLocation();
