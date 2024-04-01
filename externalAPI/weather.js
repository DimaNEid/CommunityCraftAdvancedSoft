const axios = require('axios');


async function fetchTemperature(city) {
    try {
        const apiKey = '624fcba8a319670eb896b5639477b7e2'; 
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        
        
        const response = await axios.get(apiUrl);
        
      
        const temperature = response.data.main.temp;
        
        return temperature;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
}

module.exports = { fetchTemperature };