import express from 'express';
import registerUser from './chainbase.js';
import { rentProtectedData, sendTargetedMails } from './iexec.js';
import cors from 'cors';
import fs from 'fs';
import { spawn, spawnSync } from 'child_process';
import { axios } from 'axios';


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
    modelParams.numberOfUsers = req.body.numberOfUsers;
    modelParams.walletBalance = req.body.walletBalance;
    modelParams.nativeBalance = req.body.nativeBalance;
    modelParams.yearOfLastTransaction = req.body.yearOfLastTransaction;
    modelParams.yearOfFirstTransaction = req.body.yearOfFirstTransaction;
    modelParams.numberOfNFTs = req.body.numberOfNFTs;
    modelParams.numberOfTransactions = req.body.numberOfTransactions;





    // Sending mails
    sendTargetedMails(walletAddresses, req.body.adName, req.body.description);

    res.sendStatus(200);
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});