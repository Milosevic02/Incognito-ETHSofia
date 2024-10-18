import pandas as pd
from sklearn.cluster import KMeans
import joblib

# Učitaj podatke iz CSV fajla
df = pd.read_csv('dataset.csv')

# Odabir relevantnih karakteristika za klasterisanje
features = df[['balance', 'NumberOfTransaction', 'lastTransaction', 'firstTransaction', 'NFTCount', 'NativeBalance']]

# Određivanje broja klastera
k = 10

# Kreiranje K-means modela
kmeans = KMeans(n_clusters=k, random_state=42)

# Fitovanje modela na podatke
df['cluster'] = kmeans.fit_predict(features)

# Sačuvaj K-means model
joblib.dump(kmeans, 'kmeans_model.pkl')

# Sačuvaj adrese za svaki klaster u posebne CSV fajlove
for cluster_num in range(k):
    addresses = df[df['cluster'] == cluster_num]['address']
    addresses.to_csv(f'cluster_{cluster_num}.csv', index=False)

print("Klasterovani podaci i modeli su sačuvani.")
