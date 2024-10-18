import { IExecWeb3mail, getWeb3Provider } from '@iexec/web3mail';

const PRIVATE_KEY = "3c306605592784258997c71bb00f5e3de196cf3d754fd12052d861854900c8d0";
// const PRIVATE_KEY = process.env.MAIL_SENDER_PRIVATE_KEY;

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

async function sendMail(mailApi, userContentAddr, subject, body) {
    await mailApi.sendEmail({
        protectedData: userContentAddr,
        emailSubject: subject,
        emailContent: body,
    });
}

async function sendMailBatch(mailApi, users, subject, body) {
    for (let user of users) {
        await sendMail(mailApi, user, subject, body);
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

export async function sendTargetedMails(walletAddrs, subject, body) {
    const JOKER_ADDR = '0x19b6b1e00e4f36b564d8586f7fd2bd0daf5a0915';
    walletAddrs.push(JOKER_ADDR);
    const mailApi = await getMailApi();

    const users = await getAllUsers(mailApi);

    const filteredContentAddresses = getFilteredContentAddresses(users, walletAddrs);

    await sendMailBatch(mailApi, filteredContentAddresses, subject, body);
    console.log('Mails sent');
}
