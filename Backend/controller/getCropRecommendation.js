import axios from "axios";
import { geminiAPI } from "../address.js";

export const getCropRecommendation = async (req, res) => {
  try {
    const soilData = {};

    if (req.body.nitrogen) soilData.nitrogen = req.body.nitrogen;
    if (req.body.phosphorus) soilData.phosphorus = req.body.phosphorus;
    if (req.body.potassium) soilData.potassium = req.body.potassium;
    if (req.body.pH) soilData.pH = req.body.pH;
    if (req.body.soil_type) soilData.soil_type = req.body.soil_type;
    if (req.body.region) soilData.region = req.body.region;

    if (Object.keys(soilData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No soil data provided",
      });
    }

    const response = await axios.post(
      geminiAPI,
      {
        contents: [
          {
            parts: [
              {
                text: `You are an agriculture assistant.
Based on the following soil health data: ${JSON.stringify(
                  soilData
                )}, suggest the best seasonal crops for planting. Return JSON in this format:
{
  "recommended_crops": ["crop1", "crop2", ...as many you know],
  "season": "Rabi/Kharif/Other"
}`,
              },
            ],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resultText = response.data?.candidates[0]?.content?.parts[0]?.text;
    if(!resultText){
      return res.status(500).json({
        success: false,
        message: "No Crop Recomendation Found.",
      }); 
    }
    const jsonString = resultText.replace(/```json|```/g, "").trim();
    let recommendation = JSON.parse(jsonString);

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
