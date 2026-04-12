# Krishi Mitra Database Schema (MongoDB - Conceptual)

This document outlines the conceptual MongoDB schema for the Krishi Mitra application. We leverage MongoDB's flexible document model to store agricultural data.

## 1. `users` Collection

*   **Purpose:** Stores farmer profiles and authentication details.
*   **Fields:**
    *   `_id`: ObjectId (Primary Key)
    *   `name`: String (e.g., "Rajesh Kumar")
    *   `email`: String (Unique, Indexed)
    *   `password`: String (Hashed)
    *   `location`: String (e.g., "Mysuru, Karnataka")
    *   `crops`: Array of `ObjectId` (References `crops` collection)
    *   `role`: String (Enum: 'farmer', 'expert', 'admin', Default: 'farmer')
    *   `createdAt`: Date (Timestamp of registration)

## 2. `crops` Collection

*   **Purpose:** Stores records of crops cultivated by each farmer.
*   **Fields:**
    *   `_id`: ObjectId
    *   `userId`: ObjectId (References `users` collection, Indexed)
    *   `cropName`: String (e.g., "Paddy (Rice)", "Wheat", "Sugarcane")
    *   `variety`: String (Optional)
    *   `plantingDate`: Date
    *   `expectedHarvestDate`: Date (Optional)
    *   `landArea`: Number (e.g., 2.5)
    *   `unit`: String (Enum: 'acres', 'hectares', 'sq_meters', Default: 'acres')
    *   `currentStage`: String (Enum: 'Germination', 'Vegetative', 'Flowering', 'Fruiting', 'Harvesting', 'Post-Harvest')
    *   `notes`: String (Optional, Max 500 chars)
    *   `createdAt`: Date

## 3. `weather_data` Collection

*   **Purpose:** Stores historical and forecasted weather information for specific locations.
*   **Fields:**
    *   `_id`: ObjectId
    *   `location`: String (Geohash or text, Indexed)
    *   `latitude`: Number
    *   `longitude`: Number
    *   `timestamp`: Date (Indexed)
    *   `dataType`: String (Enum: 'current', 'hourly_forecast', 'daily_forecast')
    *   `temperature_celsius`: Number
    *   `humidity_percent`: Number
    *   `precipitation_mm`: Number
    *   `windSpeed_kph`: Number
    *   `condition`: String (e.g., "Clear sky", "Light rain")
    *   `weatherIcon`: String (URL or code for icon)

## 4. `pest_detection_records` Collection

*   **Purpose:** Stores history of AI-driven pest/disease detections.
*   **Fields:**
    *   `_id`: ObjectId
    *   `userId`: ObjectId (References `users` collection)
    *   `cropId`: ObjectId (References `crops` collection, Optional)
    *   `imageUrl`: String (URL to image stored in S3/Cloud Storage)
    *   `detectionDate`: Date
    *   `detectedPestDisease`: String (AI-identified name, e.g., "Leaf Rust")
    *   `confidenceScore`: Number (AI model's confidence, 0-1)
    *   `recommendations`: String (AI-generated or predefined treatment steps)
    *   `status`: String (Enum: 'Detected', 'Treated', 'Resolved', Default: 'Detected')

## 5. `soil_tests` Collection

*   **Purpose:** Stores farmer's soil test results and generates recommendations.
*   **Fields:**
    *   `_id`: ObjectId
    *   `userId`: ObjectId (References `users` collection)
    *   `testDate`: Date
    *   `sampleLocation`: String (Optional, specific field area)
    *   `pH`: Number
    *   `nitrogen_ppm`: Number
    *   `phosphorus_ppm`: Number
    *   `potassium_ppm`: Number
    *   `organicMatter_percent`: Number
    *   `recommendations`: String (Fertilizer/amendment suggestions)
    *   `testedBy`: String (e.g., "Local Lab", "Self")

## 6. `market_prices` Collection

*   **Purpose:** Stores historical and real-time commodity market prices.
*   **Fields:**
    *   `_id`: ObjectId
    *   `commodityName`: String (e.g., "Tomato", "Paddy", "Cotton", Indexed)
    *   `marketLocation`: String (e.g., "APMC Mysore", Indexed)
    *   `pricePerUnit`: Number
    *   `unit`: String (e.g., "INR/kg", "INR/quintal")
    *   `date`: Date (Indexed)
    *   `source`: String (e.g., "AgriMarket API", "Manual Input")

## 7. `forum_posts` Collection

*   **Purpose:** Stores community forum discussions.
*   **Fields:**
    *   `_id`: ObjectId
    *   `userId`: ObjectId (References `users` collection)
    *   `title`: String
    *   `content`: String
    *   `tags`: Array of Strings (e.g., ["paddy", "disease", "fertilizer"], Indexed)
    *   `createdAt`: Date
    *   `lastUpdatedAt`: Date
    *   `comments`: Array of Objects:
        *   `commentId`: ObjectId
        *   `userId`: ObjectId (References `users` collection)
        *   `text`: String
        *   `createdAt`: Date
    *   `likes`: Number (Count of likes)
    *   `views`: Number (Count of views)