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
    
    return jsonify({'cluster': int(predicted_cluster)})

if __name__ == '__main__':
    app.run(debug=True)
