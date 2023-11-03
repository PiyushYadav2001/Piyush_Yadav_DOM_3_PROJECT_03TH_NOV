const IPGEO_API_KEY = 'f5765fdd16e64dfba748e823311f4b1d';
const OPENWEATHERMAP_API_KEY = '05d012dd5a04cbe97f7ce0bd2adc746d'; // Replace with your OpenWeatherMap API key

const fetchDataButton = document.getElementById('fetchData');
const mapElement = document.getElementById('map');
const weatherDataElement = document.getElementById('weatherData');

fetchDataButton.addEventListener('click', fetchData);

async function fetchData() {
   await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${IPGEO_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const latitude = data.latitude;
            const longitude = data.longitude;
            
        

            displayLocationOnMap(latitude, longitude);
            fetchWeatherData(latitude, longitude);
        })
        .catch(error => console.error('Error fetching location data: ', error));
        console.log("Change the Browser window try MicroSoft edge")
}

function displayLocationOnMap(latitude, longitude) {
    mapElement.innerHTML = `
     <div>
     <p >Lat: ${latitude}</p> 
     <p id="p">Long:${longitude}</p>
     </div>
    <iframe
        width="1420px"
        height="665px"
        top="487px"
        left="154px"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        src="https://maps.google.com/maps?q=${latitude}, ${longitude}&output=embed">
    </iframe>`;
    fetchDataButton.classList.add("button")
    
}

function fetchWeatherData(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHERMAP_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // Extract and format weather data as needed
            weatherDataElement.innerHTML=`
            <h1 id="h1">Weather Data</h1>
            <div class="Weather-Data">
             <p class="p">Location : ${data.name}</p>
             <p >Lat : ${data.coord.lat}</p>
             <p class="pl">long : ${data.coord.lon}</p>
             <p class="p">TimeZone :${data.timezone}</p>
             <p class="p">Wind Speed :${data.wind.speed}</p>
             <p class="p">Pressure :${data.main.pressure}</p>
             <p class="p">Humidity : ${data.main.humidity}</p>
             <p class="p">Wind Direaction :${data.wind.deg}</p>
             <p class="p">UV index:</p>
             <p class="p">Feels Like :${data.main.feels_like}</p>
          
            </div>
            `
            
          
        })
        .catch(error => console.error('Error fetching weather data: ', error));
}
// ${}
// 