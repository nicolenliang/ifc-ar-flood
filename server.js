const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

require('dotenv').config();

// Enable CORS for Google API
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/google-terrain-image', async (req, res) => {
    const { lat, lng, zoom, size, maptype } = req.query;
    const key = process.env.GOOGLE_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&maptype=${maptype}&key=${key}`;

    axios.get(url, {
        responseType: 'arraybuffer',
    })
    .then(response => {
        console.log('Axios Response: ', response.data);
        res.set('Content-Type', 'image/jpg');
        res.status(200).send(response.data);
    })
    .catch(error => {
        console.log('Error fetching terrain image: ', error);
        res.status(500).send('Error fetching terrain image: ', error);
    });
});


app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});