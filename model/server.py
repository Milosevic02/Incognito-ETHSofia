from flask import Flask, request, jsonify
import pandas as pd
import joblib

app = Flask(__name__)

kmeans = joblib.load('model/kmeans_model.pkl')

def predict_cluster(new_data):
    new_df = pd.DataFrame([new_data], columns=['balance', 'NumberOfTransaction', 'lastTransaction', 'firstTransaction', 'NFTCount', 'NativeBalance'])
    cluster = kmeans.predict(new_df)
    return cluster[0]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  
    predicted_cluster = predict_cluster(data)
    
    csv_file_path = f'model/clusters/cluster_{predicted_cluster}.csv'
    addresses_in_cluster = pd.read_csv(csv_file_path)
    
    addresses_list = addresses_in_cluster['address'].tolist()
    
    return jsonify({'cluster': int(predicted_cluster), 'addresses': addresses_list})

if __name__ == '__main__':
    app.run(debug=True)
