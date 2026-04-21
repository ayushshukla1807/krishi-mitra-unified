from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import tensorflow as tf
import numpy as np
import io
from PIL import Image
import os
import uvicorn

# GenAI Integrations
import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI

import dotenv
dotenv.load_dotenv()

app = FastAPI(title="Krishi Mitra AI Microservice", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Model Loading (Conceptual) ---
MODEL_PATH = 'models/pest_detection_model.h5'
model = None
try:
    if os.path.exists(MODEL_PATH):
        # model = tf.keras.models.load_model(MODEL_PATH)
        print(f"AI model found at {MODEL_PATH}, but running in dummy mode for quick demo.")
    else:
        print(f"AI model file not found at {MODEL_PATH}. Running in dummy mode.")
except Exception as e:
    print(f"Error loading AI model: {e}. Running in dummy mode.")

CLASS_NAMES = ['Healthy', 'Blight', 'Leaf Rust', 'Powdery Mildew', 'Aphids Infestation']

# --- GenAI Setup ---
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY", "")
llm = None
if GOOGLE_API_KEY:
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro", google_api_key=GOOGLE_API_KEY)
    except Exception as e:
        print(f"Warning: Failed to initialize Google GenAI: {e}")

class AgronomistRequest(BaseModel):
    query: str
    context: dict = {}

@app.get("/")
def health_check():
    return {"status": "online", "service": "Krishi Mitra AI Engine"}

@app.post("/predict-pest")
async def predict_pest(image: UploadFile = File(...)):
    if not image.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    image_bytes = await image.read()
    
    try:
        img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
        img = img.resize((224, 224))
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid image file: {e}")

    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = tf.expand_dims(img_array, 0) / 255.0

    # Demo Prediction
    predicted_class = str(np.random.choice(CLASS_NAMES))
    confidence = float(np.random.uniform(0.75, 0.98))

    recommendation = f"For '{predicted_class}', consider isolating affected plants and applying a neem-based organic pesticide. Consult a local expert for specific treatment plans."
    if 'Healthy' in predicted_class:
        recommendation = "Your plant appears healthy! Continue good farming practices."

    return {
        'prediction': predicted_class,
        'confidence': f"{confidence:.2f}",
        'recommendation': recommendation,
        'timestamp': tf.timestamp().numpy().tolist()
    }

@app.post("/agronomist/chat")
async def agronomist_chat(req: AgronomistRequest):
    if not llm:
        return {"response": "The AI Agronomist is currently offline. Please configure your GOOGLE_API_KEY in the `.env` file."}
    
    prompt = f"""
    You are an expert AI Agronomist for the 'Krishi Mitra' platform. 
    You are advising a farmer in India. Speak professionally but simply.
    
    Farm Context Data: {req.context}
    
    Farmer Question: {req.query}
    """
    
    try:
        result = await llm.ainvoke(prompt)
        return {"response": result.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=5001, reload=True)