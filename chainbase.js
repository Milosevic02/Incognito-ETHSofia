var numOfTransaction = 0;
var lastPage = 1;
function getTransactions(address) {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
      }
    };
  
    const url = `https://api.chainbase.online/v1/account/txs?address=${address}&chain_id=1&limit=100`;
  
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        let lastTransaction;
        for (let i = 0; i < data.data.length; i++) {
          const token = data.data[i];
          if (token.from_address === address) {
            lastTransaction = token;
            numOfTransaction = token.nonce;
            break;
          }
        }
        lastPage = Math.floor(data.count/100) + 1;
        getFirstTransaction(address,lastPage);
        console.log(`Number of transaction: ${numOfTransaction}`);
        console.log(`Number of pages: ${lastPage}`);
        console.log(`Last transaction: ${lastTransaction.block_timestamp}`);
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }

  function getFirstTransaction(address,page){
    const options = {
        method: 'GET',
        headers: {
          'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
        }
      };

      const url = `https://api.chainbase.online/v1/account/txs?chain_id=1&address=${address}&limit=100&page=${page}`;
      fetch(url, options)
        .then(response => response.json())
        .then(data => {
            for (let i = data.data.length-1; i >= 0; i--) {
                const transaction = data.data[i];
                if (transaction.nonce === 0) {
                    console.log(`First transaction imestamp: ${transaction.block_timestamp}`);
                    break;
                }
            }
        })
        .catch(error => console.error('Error fetching transactions:', error));
  }
  
  function getAccBalance(address) {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
      }
    };
  
    const url = `https://api.chainbase.online/v1/account/tokens?chain_id=1&address=${address}&limit=100`;
  
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            let totalBalance = 0;

            if (data && data.data && data.data.length > 0) {
            data.data.forEach((token, index) => {
                totalBalance += parseFloat(token.current_usd_price);
            });

            console.log('Total Balance:', totalBalance);
            } else {
            console.log('No token balances found for this address.');
            }
        })
        .catch(error => console.error('Error fetching token balance:', error));
    }
  
  const address = '0xcf10a8e7c907144cc87721ac1fd7ac75a8aebec7';
  getTransactions(address);
  //getAccBalance(address);  