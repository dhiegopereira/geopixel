const apiKey = 'AIzaSyCo_Hu2WvZJ_MNjUVyTKD0vkIqGSwW-nBc';
let coordinates = []

function getGeolocation(apiKey, cityName) {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(cityName)}&key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === 'OK') {
                console.log(data);
                const address_components = data.results[0].address_components;
                const location = data.results[0].geometry.location;

                if (coordinates.length === 5) {
                    coordinates.shift();
                }
                coordinates.push({ address_components, location });
                initMap();
                getWeatherData(address_components[0].long_name)
            } else {
                console.error(`Failed to retrieve geolocation for ${cityName}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}


const searchCity = document.querySelector('#search-city')

searchCity.addEventListener('keypress', (e) => {
    if (e.code === 'Enter') {
        getGeolocation(apiKey, searchCity.value);
        searchCity.value = ''
    }
});

function initMap() {
    const map = new google.maps.Map(document.querySelector('#map'), {
        center: coordinates[coordinates.length - 1].location,
        zoom: 12
    });

    new google.maps.Marker({
        position: coordinates[coordinates.length - 1].location,
        map: map,
        title: ''
    });
}


const apiKeyWeather = '064f56ad8fe92d3a40d184dbe3251ee8';

function getWeatherData(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityName)}&appid=${apiKeyWeather}&units=metric`;

    const translations = {
        "clear sky": "céu limpo",
        "few clouds": "poucas nuvens",
        "scattered clouds": "nuvens dispersas",
        "broken clouds": "nuvens quebradas",
        "shower rain": "chuva isolada",
        "rain": "chuva",
        "thunderstorm": "trovoada",
        "snow": "neve",
        "mist": "névoa",
        // Adicione mais traduções conforme necessário
    };

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const weather = document.querySelector('#weather');
            weather.innerHTML = '';

            // Extrair dados de temperatura e outras informações conforme necessário
            const temperature = `Temperatura: ${data.main.temp}`;
            const maxTemperature = `Max: ${data.main.temp_max}`;
            const minTemperature = `Min: ${data.main.temp_min}`;
            // Obter a descrição em inglês do clima
            const weatherDescriptionEnglish = data.weather[0].description;

            // Traduzir a descrição para o português
            const weatherDescriptionPortuguese = translations[weatherDescriptionEnglish] || weatherDescriptionEnglish;

            const weatherDescription = `Descrição: ${weatherDescriptionPortuguese}`;
            const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

            const iconImage = document.createElement("img");
            iconImage.src = iconUrl;
            iconImage.alt = "Weather Icon";  // Adicione um texto alternativo adequado

            // Supondo que você tenha um elemento no seu HTML com o ID "weather-icon"
            weather.appendChild(iconImage);




            weather.append(temperature, '\t')
            weather.append(maxTemperature, '\t')
            weather.append(minTemperature, '\t')
            weather.append(weatherDescription, '\t')
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Verifica se o navegador suporta a API de geolocalização
if ("geolocation" in navigator) {
    // Obtém a localização do usuário
    navigator.geolocation.getCurrentPosition(
        function (position) {

            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${apiKey}`)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        const address_components = data.results[0].address_components[3];
                        const location = data.results[0].geometry.location;

                        console.log(address_components);

                        if (coordinates.length === 5) {
                            coordinates.shift();
                        }
                        coordinates.push({ address_components, location });
                        initMap();
                        getWeatherData(address_components.long_name)
                    } else {
                        console.error(`Failed to retrieve geolocation for ${cityName}`);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        },
        function (error) {
            // Tratamento de erro
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    console.error("Permissão negada pelo usuário.");
                    break;
                case error.POSITION_UNAVAILABLE:
                    console.error("Informações de localização indisponíveis.");
                    break;
                case error.TIMEOUT:
                    console.error("Tempo de solicitação expirado.");
                    break;
                default:
                    console.error("Erro desconhecido ao obter localização.");
            }
        }
    );
} else {
    console.error("Geolocalização não suportada neste navegador.");
}
