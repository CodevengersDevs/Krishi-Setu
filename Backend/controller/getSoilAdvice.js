import axios from "axios";
import { geminiAPI } from "../address.js";

export const getSoilAdvice = async (req, res) => {
  try {
    const { soil_type, coastline_proximity, water_source, land_holding } = req.body;

    const prompt = {
      contents: [
        {
          parts: [
            {
              text: `You are an agriculture soil and crop advisor.
A farmer has provided the following details:

Soil type: ${soil_type}
Proximity to coastline: ${coastline_proximity}
Nearby water source: ${water_source}
Land holding: ${land_holding}

Your task:
1. Estimate what nutrients are likely already present in the soil.
2. Suggest what nutrients are required more for balanced growth.
3. Recommend a list of suitable crops for this land.
4. Suggest which crops can give better profit based on the inputs.
5. Return ONLY valid JSON. No backticks, no extra text.

The JSON must follow this structure:
{
  "nutrients_present": ["...","..."],
  "nutrients_required": ["...","..."],
  "suitable_crops": ["...","..."],
  "profitable_crops": ["...","..."],
  "advice": "..."
}
`
            }
          ]
        }
      ]
    };

    const response = await axios.post(geminiAPI, prompt, {
      headers: { "Content-Type": "application/json" },
    });

    const rawText = response.data?.candidates[0]?.content?.parts[0]?.text;
    if (!rawText) {
      return res.status(500).json({
        success: false,
        message: "Advice not found in Gemini response",
      });
    }

    const jsonString = rawText.replace(/```json|```/g, "").trim();
    const adviceObj = JSON.parse(jsonString);

    return res.status(200).json({
      success: true,
      advice: adviceObj,
    });
  } catch (error) {
    console.error("Gemini Error:", error.message);
    return res.status(400).json({
      message: "Server Error",
      success: false,
    });
  }
};
