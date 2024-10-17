const maxRetries = 3;

async function getTransactions(address, retryCount = maxRetries) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
            }
        };

        const url = `https://api.chainbase.online/v1/account/txs?address=${address}&chain_id=1&limit=100`;
        const response = await fetch(url, options);
        const data = await response.json();

        let lastTransaction;
        let numOfTransaction = 0;
        for (let i = 0; i < data.data.length; i++) {
            const token = data.data[i];
            if (token.from_address === address) {
                lastTransaction = token;
                numOfTransaction = token.nonce;
                break;
            }
        }
        lastPage = Math.floor(data.count / 100) + 1;
        console.log(`Number of transaction: ${numOfTransaction}`);
        console.log(`Number of pages: ${lastPage}`);
        console.log(`Last transaction: ${lastTransaction.block_timestamp}`);

        return {
            numOfTransaction,
            lastTransactionTime: lastTransaction?.block_timestamp
        };

    } catch (error) {
        console.error('Error fetching transactions:', error);
        if (retryCount > 0) {
            console.log(`Retrying getTransactions... Attempts left: ${retryCount}`);
            return await getTransactions(address, retryCount - 1);
        }
        throw error;
    }
}

async function getFirstTransaction(address, page, retryCount = maxRetries) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
            }
        };

        const url = `https://api.chainbase.online/v1/account/txs?chain_id=1&address=${address}&limit=100&page=${page}`;
        const response = await fetch(url, options);
        const data = await response.json();

        for (let i = data.data.length - 1; i >= 0; i--) {
            const transaction = data.data[i];
            if (transaction.nonce === 0) {
                console.log(`First transaction timestamp: ${transaction.block_timestamp}`);
                return transaction.block_timestamp;
            }
        }
    } catch (error) {
        console.error('Error fetching first transaction:', error);
        if (retryCount > 0) {
            console.log(`Retrying getFirstTransaction... Attempts left: ${retryCount}`);
            return await getFirstTransaction(address, page, retryCount - 1);
        }
        throw error;
    }
}

async function getAccBalance(address, retryCount = maxRetries) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
            }
        };

        const url = `https://api.chainbase.online/v1/account/tokens?chain_id=1&address=${address}&limit=100`;
        const response = await fetch(url, options);
        const data = await response.json();

        let totalBalance = 0;
        if (data && data.data && data.data.length > 0) {
            data.data.forEach((token) => {
                totalBalance += parseFloat(token.current_usd_price);
            });
            console.log('Total Balance:', totalBalance);
        } else {
            console.log('No token balances found for this address.');
        }
        return totalBalance;

    } catch (error) {
        console.error('Error fetching token balance:', error);
        if (retryCount > 0) {
            console.log(`Retrying getAccBalance... Attempts left: ${retryCount}`);
            return await getAccBalance(address, retryCount - 1);
        }
        throw error;
    }
}
async function getNFTs(address, retryCount = maxRetries) {
  const options = {
      method: 'GET',
      headers: {
          'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
      }
  };

  const url = `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&limit=100`;

  try {
      const initialResponse = await fetch(url, options);
      const initialData = await initialResponse.json();

      if (!initialData || !initialData.data || !Array.isArray(initialData.data)) {
          console.error('No NFTs found or data format is invalid.');
          throw new Error('Invalid data format or no NFTs found.');
      }

      let NFTs = initialData.data.map(token => token.contract_address);
      const totalPages = Math.ceil(initialData.count / 100);

      if (totalPages > 1) {
          const fetchPromises = [];
          for (let i = 2; i <= totalPages; i++) {
              const pageUrl = `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&limit=100&page=${i}`;
              fetchPromises.push(fetch(pageUrl, options).then(response => response.json()));
          }
          const pagesData = await Promise.all(fetchPromises);

          pagesData.forEach(page => {
              if (page && page.data && Array.isArray(page.data)) {
                  NFTs.push(...page.data.map(token => token.contract_address));
              } else {
                  console.warn(`Page data is invalid or empty:`, page);
              }
          });
      }

      console.log(`Total NFTs: ${NFTs.length}`);
      return NFTs;

  } catch (error) {
      console.error('Error fetching NFT balance:', error.message);

      if (retryCount > 0) {
          console.log(`Retrying getNFTs... Attempts left: ${retryCount}`);
          return await getNFTs(address, retryCount - 1);
      }
      throw error; 
  }
}

async function getNativeBalance(address, retryCount = maxRetries) {
    try {
        const options = {
            method: 'GET',
            headers: {
                'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
            }
        };

        const url = `https://api.chainbase.online/v1/account/balance?chain_id=1&address=${address}`;
        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data.data) {
            const weiBalance = parseInt(data.data, 16);
            const etherBalance = weiBalance / 1e18;
            console.log(`Native balance: ${etherBalance} ETH`);
            return etherBalance;
        } else {
            throw new Error('Error fetching balance or invalid data format.');
        }

    } catch (error) {
        console.error('Error fetching native balance:', error);
        if (retryCount > 0) {
            console.log(`Retrying getNativeBalance... Attempts left: ${retryCount}`);
            return await getNativeBalance(address, retryCount - 1);
        }
        throw error;
    }
}

async function registerUser(address) {
    try {
        const transactionsData = await getTransactions(address);
        const firstTransactionTime = await getFirstTransaction(address, lastPage);
        const totalBalance = await getAccBalance(address);
        const nfts = await getNFTs(address);
        const nativeBalance = await getNativeBalance(address);

        const userData = {
            address,
            numberOfTransactions: transactionsData.numOfTransaction,
            lastTransactionTime: transactionsData.lastTransactionTime,
            firstTransactionTime,
            totalBalance,
            nfts,
            nativeBalance
        };

        const fs = require('fs');
        const jsonFileName = 'userData.json';
        fs.writeFileSync(jsonFileName, JSON.stringify(userData, null, 2));
        console.log(`User data saved to ${jsonFileName}`);
    } catch (error) {
        console.error('Error registering user:', error);
    }
}

const address = '0xcf10a8e7c907144cc87721ac1fd7ac75a8aebec7';
registerUser(address);
