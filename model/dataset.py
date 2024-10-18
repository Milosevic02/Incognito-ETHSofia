import pandas as pd
import random
import string

def generate_eth_address():
    return "0x" + ''.join(random.choice('0123456789abcdef') for _ in range(40))

data = {
    'address': [generate_eth_address() for _ in range(10000)],
    'balance': [round(random.uniform(0.1, 100000), 2) for _ in range(10000)],  # balance in ETH
    'NumberOfTransaction': [random.randint(1, 5000) for _ in range(10000)],  # number of transactions
    'lastTransaction': [random.randint(2019, 2024) for _ in range(10000)],  # year of last transaction
    'firstTransaction': [random.randint(2017, 2024) for _ in range(10000)],  # year of first transaction
    'NFTCount': [random.randint(0, 500) for _ in range(10000)],  # number of NFTs
    'NativeBalance': [round(random.uniform(0.1, 50), 2) for _ in range(10000)]  # native token balance in ETH
}

df = pd.DataFrame(data)
df.to_csv('dataset.csv', index=False)

df.head()
