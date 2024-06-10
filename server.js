const express = require('express');
const cors = require('cors'); // Import cors library
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json());

// Configure CORS to allow requests from your front-end origin
app.use(cors({
  origin: 'http://127.0.0.1:3000' // Replace with your actual front-end origin
}));

app.post('/oauth/token', async (req, res) => {
  try {
    const response = await axios.post('https://ee5b28b6trial.authentication.us10.hana.ondemand.com/oauth/token?grant_type=client_credentials', req.body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': req.headers.authorization
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.get('/datasetSchemas', async (req, res) => {
  try {
    const response = await axios.get('https://aiservices-trial-dar.cfapps.us10.hana.ondemand.com/data-manager/api/v3/datasetSchemas', {
      headers: {
        'Authorization': req.headers.authorization
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
