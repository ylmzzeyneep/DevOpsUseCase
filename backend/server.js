const express = require('express');
const axios = require('axios');  // Axios'u import ettik
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

app.get('/data', (req, res) => {
    const data = {
        name: 'Zeynep',
        age: 23,
        location: 'TURKIYE',
    };
    res.json(data);
});

app.get('/health', (req, res) => {
    axios.get('http://34.133.27.32:30922/health')  
        .then(response => {
            if (response.status === 404) {
                res.status(404).send('Backend is healthy and external health check passed!');
            } else {
                res.status(500).send('External health check failed.');
            }
        })
        .catch(error => {
            res.status(500).send('Error with external health check.');
        });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
