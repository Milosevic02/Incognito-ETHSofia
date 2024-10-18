import pandas as pd
import joblib

kmeans = joblib.load('model/kmeans_model.pkl')

def predict_cluster(new_data):
    new_df = pd.DataFrame([new_data], columns=['balance', 'NumberOfTransaction', 'lastTransaction', 'firstTransaction', 'NFTCount', 'NativeBalance'])
    
    cluster = kmeans.predict(new_df)
    return cluster[0]

new_user = {
    'balance': 100000,
    'NumberOfTransaction': 200,
    'lastTransaction': 2023,
    'firstTransaction': 2020,
    'NFTCount': 100,
    'NativeBalance': 10
}

predicted_cluster = predict_cluster(new_user)

addresses_in_cluster = pd.read_csv(f'model/clusters/cluster_{predicted_cluster}.csv')
print(f"Addresses in Cluster {predicted_cluster}:\n", addresses_in_cluster)
