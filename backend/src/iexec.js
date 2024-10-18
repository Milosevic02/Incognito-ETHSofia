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


export async function rentProtectedData(address) {
    await dataProtector.rentProtectedData({
        protectedData: address,
        price: 0,
        duration: 60 * 60 * 24 * 30
    })
}

function getFilteredContentAddresses(users, walletAddrs) {
    const contentAddresses = [];

    // Convert addresses to lowercase for case-insensitive comparison
    const lowercaseWalletAddrs = walletAddrs.map(addr => addr.toLowerCase());

    for (const user of users) {
        const lowercaseUserAddress = user.address.toLowerCase();
        const lowercaseUserOwner = user.owner.toLowerCase();

        if (lowercaseWalletAddrs.includes(lowercaseUserOwner)) {
            contentAddresses.push(lowercaseUserAddress);
        }
    }

    return contentAddresses;
}

export async function sendTargetedMails(walletAddrs) {
    const mailApi = await getMailApi();
    console.log("Wallets:");
    console.log(walletAddrs);

    const users = await getAllUsers(mailApi);
    console.log("Users:");
    console.log(users);

    const filteredContentAddresses = getFilteredContentAddresses(users, walletAddrs);
    console.log("Content addreses:");
    console.log(filteredContentAddresses);

    console.log(users.length);
    // await sendMailBatch(mailApi, filteredContentAddresses);
}
