import express from 'express';
import bodyParser from 'body-parser';
import registerUser from './chainbase.js';
import cors from 'cors';
import fs from 'fs';

const app = express();
app.use(cors());

app.use(express.json());


app.post('/retrieve-data', async (req, res) => {
    const address = req.body.address;
    console.log('Received address:', address);
    await registerUser(address); // Wait for registration to finish

    // Read registered users metrics after registration
    const jsonData = JSON.parse(fs.readFileSync('userData.json', 'utf8'));
    res.json(jsonData);
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});