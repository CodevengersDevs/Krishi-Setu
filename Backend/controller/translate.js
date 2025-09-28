import axios from "axios";
import { geminiAPI } from "../address.js";

export const translateAPI = async (req, res) => {
  try {
    const languageObj = req.body.obj;
    const { language } = req.body;

    const prompt = {
      contents: [
        {
          parts: [
            {
              text: `You are a translation assistant.
Take the following JSON object and return the same object structure, 
but translate all the values into ${language}.
Do not add or remove keys. Only change the text values.
Return ONLY valid JSON. No backticks, no extra formatting.

Here is the object:
${JSON.stringify(languageObj)}`,
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
        message: "Translation not found in Gemini response",
      }); 
    }

    // Remove ```json / ``` wrapper and parse
    const jsonString = rawText.replace(/```json|```/g, "").trim();
    const translatedObj = JSON.parse(jsonString);

    return res.status(200).json({
      success: true,
      translatedObj,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Server Error",
      success: false,
    });
  }
};
