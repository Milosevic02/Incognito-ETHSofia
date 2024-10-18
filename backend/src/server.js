import express from 'express';
import registerUser from './chainbase.js';
import { rentProtectedData, sendTargetedMails } from './iexec.js';
import cors from 'cors';
import fs from 'fs';
import { spawn, spawnSync } from 'child_process';


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
    modelParams.adName = req.body.adName;
    modelParams.description = req.body.description;
    modelParams.numberOfUsers = req.body.numberOfUsers;
    modelParams.walletBalance = req.body.walletBalance;
    modelParams.nativeBalance = req.body.nativeBalance;
    modelParams.yearOfLastTransaction = req.body.yearOfLastTransaction;
    modelParams.yearOfFirstTransaction = req.body.yearOfFirstTransaction;
    modelParams.numberOfNFTs = req.body.numberOfNFTs;
    modelParams.numberOfTransactions = req.body.numberOfTransactions;



    // EXECUTING MODEL USING SHELL

    const paramString = `${modelParams.numberOfTransactions} ${modelParams.walletBalance} ${modelParams.nativeBalance} ${modelParams.yearOfLastTransaction} ${modelParams.yearOfFirstTransaction} ${modelParams.numberOfNFTs}`;
    const deploySh = spawnSync('sh', ['call-model.sh', paramString], {})


    //Read models result from file
    const data = fs.readFileSync('res.txt', 'utf8');
    const number = parseFloat(data.trim());

    var clusterPath = "clusters/" + number + ".csv";
    const cluster = fs.readFileSync(clusterPath, 'utf8');
    const walletAddresses = cluster.split('\n');

    fs.unlinkSync('res.txt');


    // Sending mails
    sendTargetedMails(walletAddresses, modelParams.adName, modelParams.description);

    res.sendStatus(200);
});

app.listen(8000, () => {
    console.log('Server listening on port 8000');
});