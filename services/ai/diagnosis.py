import os
from typing import List, Optional
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import torch
import torchvision.transforms as transforms
from PIL import Image
import io

app = FastAPI(title="KrishiMitra-AIDiagnosis", version="1.2.0")

# Mocking the AI model architecture for the demonstration core
class HarvestClassifier(torch.nn.Module):
    def __init__(self):
        super(HarvestClassifier, self).__init__()
        self.features = torch.nn.Sequential(
            torch.nn.Conv2d(3, 64, kernel_size=3, padding=1),
            torch.nn.ReLU(),
            torch.nn.MaxPool2d(kernel_size=2, stride=2),
            torch.nn.Flatten(),
            torch.nn.Linear(64 * 112 * 112, 4) # 4 classes: Healthy, Pest, Disease, Nutrient Deficiency
        )

    def forward(self, x):
        return self.features(x)

# Initialization
model = HarvestClassifier()
model.eval()

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

class DiagnosisResult(BaseModel):
    status: str
    confidence: float
    recommendations: List[str]

@app.post("/diagnose", response_model=DiagnosisResult)
async def diagnose_crop(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload an image.")

    try:
        content = await file.read()
        image = Image.open(io.BytesIO(content)).convert("RGB")
        tensor = transform(image).unsqueeze(0)

        with torch.no_grad():
            output = model(tensor)
            probs = torch.nn.functional.softmax(output, dim=1)
            conf, pred = torch.max(probs, 1)

        labels = ["Healthy", "Pest Infection", "Fungal Disease", "Nutrient Deficiency"]
        recommendations = [
            "Maintain current irrigation schedule.",
            "Apply organic neem-based pesticide immediately.",
            "Isolate affected plants and apply fungicide.",
            "Increase nitrogen-based fertilizer application."
        ]

        return DiagnosisResult(
            status=labels[pred.item()],
            confidence=float(conf.item()),
            recommendations=[recommendations[pred.item()]]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference Engine Error: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "operational", "gpu_available": torch.cuda.is_available()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
