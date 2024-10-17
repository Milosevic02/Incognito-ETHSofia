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
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }

function getBalance(address) {
    const options = {
        method: 'GET',
        headers: {
        'x-api-key': '2nZ3CN35HkCaXFfu9S4ukwVjW6t'
        }
    };

    const url = `https://api.chainbase.online/v1/account/tokens?chain_id=1&address=${address}`

    fetch(url, options)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
};
  
const address = '0xcf10a8e7c907144cc87721ac1fd7ac75a8aebec7';
//getTransactions(address);
getBalance(address)


  

  