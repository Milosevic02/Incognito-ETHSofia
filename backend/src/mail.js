import { IExecWeb3mail, getWeb3Provider } from '@iexec/web3mail';

const PRIVATE_KEY = process.env.MAIL_SENDER_PRIVATE_KEY;

async function getMailApi() {
    const web3Provider = await getWeb3Provider(PRIVATE_KEY);
    const web3mail = new IExecWeb3mail(web3Provider);
    return web3mail;
}

async function getAllUsers(mailApi) {
    //Must skip last 15 users (new auth is pushed at the beggining)
    // They have authorization on data even if new account is made
    const contactsList = await mailApi.fetchMyContacts();
    return contactsList.slice(0, contactsList.length - 15);
}

async function sendMail(mailApi, user) {
    await mailApi.sendEmail({
        protectedData: user.address,
        emailSubject: 'Anon Email',
        emailContent: 'Henlo fren from batch function',
    });
}

async function sendMailBatch(mailApi, users) {
    for (let user of users) {
        await sendMail(mailApi, user);
    }
}


// For testing purposes
async function main() {
    const mailApi = await getMailApi();
    const users = await getAllUsers(mailApi);

    console.log(users);

    await sendMailBatch(mailApi, users);
}

main();