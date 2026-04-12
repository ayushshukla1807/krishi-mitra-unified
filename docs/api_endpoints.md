# Krishi Mitra API Endpoints Specification (Conceptual)

This document outlines the key RESTful API endpoints for the Krishi Mitra Backend.

## 1. Authentication & User Management

*   **`POST /api/auth/register`**
    *   **Description:** Registers a new farmer user.
    *   **Request Body:**
        ```json
        {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "password": "strongpassword123",
            "location": "Mysuru, Karnataka"
        }
        ```
    *   **Response:** `201 Created` with JWT token and user details.
*   **`POST /api/auth/login`**
    *   **Description:** Authenticates a user and returns a JWT token.
    *   **Request Body:**
        ```json
        {
            "email": "john.doe@example.com",
            "password": "strongpassword123"
        }
        ```
    *   **Response:** `200 OK` with JWT token and user details.
*   **`GET /api/auth/me`**
    *   **Description:** Retrieves the profile of the currently authenticated user.
    *   **Authentication:** Requires `Bearer Token` in `Authorization` header.
    *   **Response:** `200 OK` with user object (excluding password).

## 2. Crop Management

*   **`GET /api/crops`**
    *   **Description:** Fetches all crop records for the authenticated user.
    *   **Authentication:** Required.
    *   **Response:** `200 OK` with an array of crop objects.
*   **`POST /api/crops`**
    *   **Description:** Adds a new crop record for the authenticated user.
    *   **Authentication:** Required.
    *   **Request Body:**
        ```json
        {
            "cropName": "Paddy (Rice)",
            "variety": "Karnataka Sonamasuri",
            "plantingDate": "2024-06-15T00:00:00Z",
            "expectedHarvestDate": "2024-10-30T00:00:00Z",
            "landArea": 2.5,
            "unit": "acres",
            "currentStage": "Vegetative"
        }
        ```
    *   **Response:** `201 Created` with the new crop object.

## 3. Weather & Climate

*   **`GET /api/weather/current?lat=<latitude>&lon=<longitude>`**
    *   **Description:** Retrieves current weather conditions for a given location.
    *   **Authentication:** Optional (might have rate limits for unauthenticated).
    *   **Response:** `200 OK` with weather data (temp, humidity, condition, etc.).
*   **`GET /api/weather/forecast?lat=<latitude>&lon=<longitude>&days=<number>`**
    *   **Description:** Provides a multi-day weather forecast.
    *   **Authentication:** Optional.
    *   **Response:** `200 OK` with forecast data.

## 4. Pest & Disease Detection

*   **`POST /api/pest-detection/upload`**
    *   **Description:** Uploads a crop image for AI-driven pest/disease diagnosis.
    *   **Authentication:** Required.
    *   **Request Body:** `multipart/form-data` with an "image" file.
    *   **Response:** `200 OK` with prediction, confidence, and recommendations.
        ```json
        {
            "prediction": "Leaf Rust",
            "confidence": "0.92",
            "recommendation": "Apply copper-based fungicide. Isolate affected plants."
        }
        ```
*   **`GET /api/pest-detection/records`**
    *   **Description:** Fetches historical pest/disease detection records for the user.
    *   **Authentication:** Required.
    *   **Response:** `200 OK` with an array of detection records.

## 5. Market Prices

*   **`GET /api/market-prices?commodity=<name>&location=<market_id>`**
    *   **Description:** Retrieves current market prices for a specific commodity at a given market.
    *   **Authentication:** Optional.
    *   **Response:** `200 OK` with price data, date, unit.

## 6. Community Forum

*   **`GET /api/forum/posts`**
    *   **Description:** Fetches all forum posts (or filtered by tags).
    *   **Authentication:** Optional.
    *   **Response:** `200 OK` with an array of forum posts.
*   **`POST /api/forum/posts`**
    *   **Description:** Creates a new forum post.
    *   **Authentication:** Required.
    *   **Request Body:** `{"title": "Question about...", "content": "...", "tags": ["paddy", "disease"]}`
    *   **Response:** `201 Created` with the new post.