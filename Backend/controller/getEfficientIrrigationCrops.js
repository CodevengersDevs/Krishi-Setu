import axios from "axios";
import { geminiAPI } from "../address.js";

export const getEfficientIrrigationCrops = async (req, res) => {
  try {
    const soilData = {};

    if (req.body.soil_type) soilData.soil_type = req.body.soil_type;
    if (req.body.moisture) soilData.moisture = req.body.moisture;
    if (req.body.region) soilData.region = req.body.region;
    if (req.body.rainfall) soilData.rainfall = req.body.rainfall;
    if (req.body.crop_water_need) soilData.crop_water_need = req.body.crop_water_need;

    if (Object.keys(soilData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least soil_type, moisture, region, rainfall, or crop_water_need is required",
      });
    }

    const response = await axios.post(
      geminiAPI,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an agriculture expert.
Based on the following soil and water data: ${JSON.stringify(soilData)}, suggest:
1. Crops that require minimal water and are suitable for this land.
2. The most efficient irrigation method (drip, sprinkler, or flood) to reduce water waste.
Return JSON only in this format:
{
  "recommended_crops": ["crop1", "crop2", "..."],
  "optimal_irrigation_method": "drip/sprinkler/flood",
  "notes": "Any practical advice for efficient irrigation"
}`
              }
            ]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resultText = response.data?.candidates[0]?.content?.parts[0]?.text;
    if (!resultText) {
      return res.status(500).json({
        success: false,
        message: "No irrigation crop recommendation found",
      });
    }

    const jsonString = resultText.replace(/```json|```/g, "").trim();
    let recommendation;
    try {
      recommendation = JSON.parse(jsonString);
    } catch {
      recommendation = { message: resultText };
    }

    res.status(200).json({
      success: true,
      data: recommendation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
