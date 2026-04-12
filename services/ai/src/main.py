from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import io
from PIL import Image
import os

app = Flask(__name__)

# --- Model Loading (Conceptual) ---
# In a real scenario, the model would be loaded here.
# For this demo, we'll provide dummy outputs.
MODEL_PATH = 'models/pest_detection_model.h5'
model = None
try:
    if os.path.exists(MODEL_PATH):
        # model = tf.keras.models.load_model(MODEL_PATH) # Uncomment if you have a model file
        print(f"AI model found at {MODEL_PATH}, but running in dummy mode for quick demo.")
    else:
        print(f"AI model file not found at {MODEL_PATH}. Running in dummy mode.")
except Exception as e:
    print(f"Error loading AI model: {e}. Running in dummy mode.")

# Example classes (would be derived from your model's training data)
CLASS_NAMES = ['Healthy', 'Blight', 'Leaf Rust', 'Powdery Mildew', 'Aphids Infestation']
# --- End Model Loading ---


@app.route('/predict-pest', methods=['POST'])
def predict_pest():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']
    image_bytes = file.read()
    
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224)) # Assuming model input size is 224x224
    except Exception as e:
        return jsonify({'error': f'Invalid image file: {e}'}), 400

    # Pre-process image for model (normalize, expand dimensions)
    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) / 255.0 # Create a batch, normalize to [0,1]

    # --- Dummy Prediction Logic (for quick demo) ---
    if model: # If a model was successfully loaded
        # predictions = model.predict(img_array)
        # predicted_class_idx = np.argmax(predictions[0])
        # confidence = float(np.max(predictions[0]))
        # predicted_class = CLASS_NAMES[predicted_class_idx]
        # Using dummy for consistency even if model is loaded for this presentation
        predicted_class = np.random.choice(CLASS_NAMES)
        confidence = np.random.uniform(0.75, 0.98)
    else: # Fallback dummy prediction if no model is loaded
        predicted_class = np.random.choice(CLASS_NAMES)
        confidence = np.random.uniform(0.60, 0.85)
    # --- End Dummy Prediction Logic ---

    # Generate a dummy recommendation
    recommendation = f"For '{predicted_class}', consider isolating affected plants and applying a neem-based organic pesticide. Consult a local expert for specific treatment plans."
    if 'Healthy' in predicted_class:
        recommendation = "Your plant appears healthy! Continue good farming practices."

    return jsonify({
        'prediction': predicted_class,
        'confidence': f"{confidence:.2f}",
        'recommendation': recommendation,
        'timestamp': tf.timestamp().numpy().tolist() # Example of adding more info
    })

if __name__ == '__main__':
    # Running on port 5001 to avoid conflict with Node.js backend on 5000
    app.run(debug=True, port=5001)