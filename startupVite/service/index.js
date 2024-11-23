import express from 'express';
import fetch from 'node-fetch';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

const app = express();
const { getUser, getUserByToken, createUser, updateUserLevel } = await import('./database.js').then(module => module.default || module);
const authCookieName = 'token';
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('trust proxy', true);


const apiRouter = express.Router();
app.use(`/api`, apiRouter);

//Weather endpoint
app.get('/api/weather', async (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  try {
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

//Secure Router Connections (login endpoints)
const secureApiRouter = express.Router();
apiRouter.use('/secure', secureApiRouter);

secureApiRouter.post('/auth/create', async (req, res) => {
  if (await getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({
      id: user._id,
    });
  }
});

secureApiRouter.post('/auth/login', async (req, res) => {
  const user = await getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

secureApiRouter.delete('/auth/logout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Retrieve current user level
secureApiRouter.get('/level', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await getUserByToken(authToken);
  if (user) {
    res.json({ level: user.level });
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

// Update user level
secureApiRouter.put('/level', async (req, res) => {
  const authToken = req.cookies[authCookieName];
  const user = await getUserByToken(authToken);
  if (user) {
    const { level } = req.body; // Expecting level in the request body
    const updatedUser = await updateUserLevel(user.email, level);
    res.json({ level: updatedUser.level });
  } else {
    res.status(404).send({ msg: 'User not found' });
  }
});

app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.post('/api/secure/auth/create', (req, res) => {
  try {
      // Valid response
      res.json({ success: true });
  } catch (err) {
      // Always send a response
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});