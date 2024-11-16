import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Weather endpoint
app.get('/api/weather', async (req, res) => {
  const { latitude, longitude } = req.query;

  
  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
    // Fetch the weather data from the third-party API
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    const weatherCode = data.current_weather.weathercode;

    // Weather descriptions based on the weather code
    const weatherDescriptions = {
      0: 'Clear skies',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Freezing fog',
      51: 'Drizzle',
      53: 'Moderate drizzle',
      55: 'Heavy drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Light snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      95: 'Thunderstorm',
    };

    const description = weatherDescriptions[weatherCode] || 'Unknown weather';
    res.json({ description }); 
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: 'Error retrieving weather data.' });
  }
});


app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
