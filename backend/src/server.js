import express from 'express';
import bodyParser from 'body-parser';
import registerUser from './chainbase.js';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());


app.post('/retrieve-data', (req, res) => {
    const address = req.body.address;
    console.log('Received address:', address);
    registerUser(address);
    res.send('Users data retrieved');
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});