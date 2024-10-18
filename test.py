import pandas as pd
import joblib

# Učitaj K-means model
kmeans = joblib.load('kmeans_model.pkl')

# Funkcija za predviđanje klastera na osnovu novih podataka
def predict_cluster(new_data):
    # Pretvori nove podatke u DataFrame
    new_df = pd.DataFrame([new_data], columns=['balance', 'NumberOfTransaction', 'lastTransaction', 'firstTransaction', 'NFTCount', 'NativeBalance'])
    
    # Predviđanje klastera
    cluster = kmeans.predict(new_df)
    return cluster[0]

# Primer novih podataka
new_user = {
    'balance': 100000,
    'NumberOfTransaction': 200,
    'lastTransaction': 2023,
    'firstTransaction': 2020,
    'NFTCount': 100,
    'NativeBalance': 10
}

# Predviđanje klastera
predicted_cluster = predict_cluster(new_user)

# Učitaj adrese iz predviđenog klastera
addresses_in_cluster = pd.read_csv(f'cluster_{predicted_cluster}.csv')
print(f"Addresses in Cluster {predicted_cluster}:\n", addresses_in_cluster)
