import random

def predict_market_price(crop_name, soil_moisture, temperature):
    """
    Simulates a complex market prediction engine.
    In a real scenario, this would use a time-series model (LSTM/Prophet)
    trained on historical mandi prices and weather data.
    """
    base_prices = {
        "Sugarcane": 3200,
        "Wheat": 2300,
        "Rice": 2000,
        "Grapes": 60,
        "Tomato": 30,
        "Cotton": 6200
    }
    
    base = base_prices.get(crop_name, 1000)
    
    # Logic: If moisture is low, price tends to rise due to supply risk
    moisture_impact = 1.05 if soil_moisture < 35 else 0.98 if soil_moisture > 70 else 1.0
    
    # Logic: Temperature extremes impact yield
    temp_impact = 1.08 if temperature > 38 or temperature < 15 else 1.0
    
    # Random market volatility
    volatility = random.uniform(0.95, 1.05)
    
    predicted_price = base * moisture_impact * temp_impact * volatility
    
    trend = "UP" if predicted_price > base else "DOWN"
    insight = f"Prices for {crop_name} are trending {trend.lower()} based on current environmental stress."
    
    return {
        "crop": crop_name,
        "predicted_price": round(predicted_price, 2),
        "trend": trend,
        "insight": insight,
        "confidence": round(random.uniform(0.75, 0.92), 2)
    }
