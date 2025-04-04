from fastapi import FastAPI
import tensorflow as tf
import numpy as np
from pydantic import BaseModel

app = FastAPI()

# Load the trained model
MODEL_PATH = "models/disaster_model.h5"
model = tf.keras.models.load_model(MODEL_PATH)

class InputData(BaseModel):
    features: list

@app.get("/")
def home():
    return {"message": "Disaster Management API is running!"}

@app.post("/predict/")
def predict(data: InputData):
    input_array = np.array(data.features).reshape(1, -1)
    prediction = model.predict(input_array)
    return {"prediction": prediction.tolist()}

# ✅ Optional: Enable GET request with query params
@app.get("/predict/")
def predict_get(feature1: float, feature2: float, feature3: float):
    input_array = np.array([[feature1, feature2, feature3]])  # Reshape properly
    prediction = model.predict(input_array)
    return {"prediction": prediction.tolist()}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

