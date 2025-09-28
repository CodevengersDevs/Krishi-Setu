import axios from "axios";
import { geminiAPI } from "../address.js";

export const getAdvice = async (req, res) => {
  try {
    const { description } = req.body; 

    const prompt = {
      contents: [
        {
          parts: [
            {
              text: `You are an agriculture advisor.
A farmer has described a pest/insect problem in their crops.

Input Description:
"${description}"

Your task:
1. Analyze the problem described.
2. Suggest possible pest/insect names (if identifiable).
3. Suggest safe and effective solutions in JSON format.
4. Return ONLY valid JSON. No backticks, no extra text.

The JSON must follow this structure:
{
  "possible_pests": ["...","..."],
  "causes": ["...","..."],
  "organic_solutions": ["...","..."],
  "chemical_solutions": ["...","..."],
  "precautions": ["...","..."]
}
`,
            },
          ],
        },
      ],
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
