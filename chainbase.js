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

    async function getNFTBalance(address) {
      const options = {
        method: 'GET',
        headers: {
          'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
        }
      };
  
      let url = `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&limit=100`;
  
      try {
          const initialResponse = await fetch(url, options);
          const initialData = await initialResponse.json();
  
          let NFTs = [];
          NFTs.push(...initialData.data.map(token => token.contract_address));
  
          const totalPages = Math.ceil(initialData.count / 100);
  
          if (totalPages > 1) {
              const fetchPromises = [];
              for (let i = 2; i <= totalPages; i++) {
                  const pageUrl = `https://api.chainbase.online/v1/account/nfts?chain_id=1&address=${address}&limit=100&page=${i}`;
                  fetchPromises.push(fetch(pageUrl, options).then(response => response.json()));
              }
  
              const pagesData = await Promise.all(fetchPromises);
  
              pagesData.forEach(page => {
                  NFTs.push(...page.data.map(token => token.contract_address));
              });
          }
  
          console.log(`Total NFTs: ${NFTs.length}`);
      } catch (error) {
          console.error('Error fetching NFT balance:', error);
      }
  }
  
  
  const address = '0xcf10a8e7c907144cc87721ac1fd7ac75a8aebec7';
  //getTransactions(address);
  //getAccBalance(address); 
  getNFTBalance(address); 