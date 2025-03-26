import tensorflow as tf
import numpy as np
import pandas as pd
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

# Ensure the models directory exists
os.makedirs("../models", exist_ok=True)

# Step 1: Generate Dummy Disaster Data
np.random.seed(42)
data_size = 500  # 500 data points

data = {
    "temperature": np.random.uniform(15, 45, data_size),  # Temperature (15°C to 45°C)
    "humidity": np.random.uniform(10, 90, data_size),  # Humidity (10% to 90%)
    "wind_speed": np.random.uniform(0, 150, data_size),  # Wind Speed (0 to 150 km/h)
    "severity": np.random.randint(0, 2, data_size)  # Binary disaster severity (0 = Low, 1 = High)
}

df = pd.DataFrame(data)

# Step 2: Split Data (Features & Labels)
X = df.drop(columns=["severity"])  # Features: temperature, humidity, wind_speed
y = df["severity"]  # Target: severity (0 or 1)

# Step 3: Normalize the Data
scaler = MinMaxScaler()
X_scaled = scaler.fit_transform(X)

# Save Scaler
joblib.dump(scaler, "../models/scaler.pkl")

# Split Data for Training & Testing
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Step 4: Define a Simple Neural Network Model
model = tf.keras.models.Sequential([
    tf.keras.layers.Dense(16, activation='relu', input_shape=(3,)),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')  # Output Layer (Binary Classification)
])

# Step 5: Compile & Train the Model
model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X_train, y_train, epochs=10, verbose=1)

# Step 6: Save the Model
model.save("../models/disaster_model.h5")

print("✅ Model training complete! Saved as 'models/disaster_model.h5'.")
