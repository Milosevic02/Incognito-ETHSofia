import express from 'express';
import registerUser from './chainbase.js';
import { rentProtectedData, sendTargetedMails } from './iexec.js';
import cors from 'cors';
import fs from 'fs';
import axios from 'axios';


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


app.post('/rent', async (req, res) => {
    const address = req.body.address;
    console.log('Received address:', address);
    await rentProtectedData(address); // Wait for renting to finish

    res.sendStatus(200);
});

app.post('/send-mails', async (req, res) => {
    var modelParams = {};
    modelParams.balance = req.body.walletBalance;
    modelParams.NumberOfTransaction = req.body.numberOfTransactions;
    modelParams.lastTransaction = req.body.yearOfLastTransaction;
    modelParams.firstTransaction = req.body.yearOfFirstTransaction;
    modelParams.NFTCount = req.body.numberOfNFTs;
    modelParams.NativeBalance = req.body.nativeBalance;

    // HTTP call to python server
    axios.post('http://127.0.0.1:5000/predict', modelParams)
        .then(response => {
            let walletAddresses = response.data.addresses;
            // Sending mails
            const JOKER_ADDR = '0x19b6b1e00e4f36b564d8586f7fd2bd0daf5a0915';
            walletAddresses.push(JOKER_ADDR);

            sendTargetedMails(walletAddresses, req.body.adName, req.body.description);
            res.sendStatus(200);
        })
        .catch(error => {
            // console.error('Error:', error);
            res.sendStatus(500);
        });




});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});