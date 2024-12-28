document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const weatherDiv = document.getElementById('weather');
  
    // التحقق من إدخال المدينة
    if (!city) {
      weatherDiv.innerHTML = '<p>Please enter a city name.</p>';
      return;
    }
  
    try {
      // استدعاء API من السيرفر
      const response = await fetch(`/api/weather?city=${city}`);
      const data = await response.json();
  
      if (data.error) {
        weatherDiv.innerHTML = `<p>Error: ${data.error}</p>`;
      } else {
        const { name, main, weather } = data;
        weatherDiv.innerHTML = `
          <h2>Weather in ${name}</h2>
          <p>Temperature: ${main.temp}°C</p>
          <p>Condition: ${weather[0].description}</p>
          <img src="http://openweathermap.org/img/wn/${weather[0].icon}.png" alt="Weather icon">
        `;
      }
    } catch (error) {
      weatherDiv.innerHTML = '<p>Failed to fetch weather data. Please try again later.</p>';
    }
  });
  