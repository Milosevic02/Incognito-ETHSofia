function getTransactions(address) {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
      }
    };
  
    const url = `https://api.chainbase.online/v1/account/txs?address=${address}&chain_id=1`;
  
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log('Transactions Data:');
        
        // Check if transactions exist
        if (data && data.data && data.data.length > 0) {
          data.data.forEach((tx, index) => {
            // Extract only the most important information
            console.log(`Transaction #${index + 1}:`);
            console.log(`- Hash: ${tx.hash}`);
            console.log(`- From: ${tx.from}`);
            console.log(`- To: ${tx.to}`);
            console.log(`- Value: ${(tx.value / 1e18).toFixed(4)} ETH`); // Convert from Wei to ETH
            console.log(`- Date: ${new Date(tx.timestamp * 1000).toLocaleString()}`);
            console.log('-----------------------------------');
          });
        } else {
          console.log('No transactions found for this address.');
        }
      })
      .catch(error => console.error('Error fetching transactions:', error));
  }
  
  function getTokenBalance(address) {
    const options = {
      method: 'GET',
      headers: {
        'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
      }
    };
  
    const url = `https://api.chainbase.online/v1/account/tokens?chain_id=1&address=${address}`;
  
    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            console.log('Token Balance Data:');

            let tokenNames = [];
            let totalBalance = 0;

            if (data && data.data && data.data.length > 0) {
            data.data.forEach((token, index) => {
                tokenNames.push(token.name);
                totalBalance += parseFloat(token.current_usd_price);
            });

            console.log('Token Names:', tokenNames);
            console.log('Total Balance:', totalBalance);
            } else {
            console.log('No token balances found for this address.');
            }
        })
        .catch(error => console.error('Error fetching token balance:', error));
    }
  
  const address = '0xcf10a8e7c907144cc87721ac1fd7ac75a8aebec7';
  //getTransactions(address);
  getTokenBalance(address);
  