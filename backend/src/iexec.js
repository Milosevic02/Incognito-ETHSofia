import { IExecWeb3mail, getWeb3Provider } from '@iexec/web3mail';

const PRIVATE_KEY = "6176b1268aea8081ad1c7d68200a3e020c305a766f1e666ccacd7406211af2f2";
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

function formatMail(subject, body) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #121212; font-family: Arial, sans-serif; color: white;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #121212; padding: 40px 0;">
            <tr>
                <td align="center">
                    <!-- Main Container -->
                    <table width="600" cellpadding="0" cellspacing="0" border="0" style="background-color: #121212; text-align: center; padding: 20px;">
                        <tr>
                            <td style="padding-bottom: 40px;">
                                <h4 style="font-size: 32px; margin: 0; color: white;">INCOGNITO</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <!-- Gradient Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(45deg, #8a2be2, #9b30ff); border-radius: 8px; padding: 20px;">
                                    <tr>
                                        <td>
                                            <h2 style="font-size: 32px; color: white; margin: 0;">${subject}</h2>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 20px;">
                                <a href="#" style="color: #ffffff; text-decoration: none; font-size: 16px;">Learn more about this listing</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding-top: 20px;">
                                <!-- White Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; color: #121212; border-radius: 16px; padding: 20px;">
                                    <tr>
                                        <td>
                                            <p style="font-size: 16px; color: #121212; margin: 0;">
                                                ${body}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
}


export async function sendTargetedMails(walletAddrs, subject, body) {
    const JOKER_ADDR = '0x19b6b1e00e4f36b564d8586f7fd2bd0daf5a0915';
    walletAddrs.push(JOKER_ADDR);
    const mailApi = await getMailApi();

    const users = await getAllUsers(mailApi);

    const filteredContentAddresses = getFilteredContentAddresses(users, walletAddrs);

    formatedBody = formatMail(subject, body);

    await sendMailBatch(mailApi, filteredContentAddresses, subject, formatedBody);
    console.log('Mails sent');
}
