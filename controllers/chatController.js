import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import dotenv from "dotenv";
dotenv.config();
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.CHAT_API_KEY;

const vehicleRelatedKeywords = ["car", "bike", "motorcycle", "vehicle", "engine", "tire", "brake", "transmission"];

function isVehicleRelated(input) {
  return vehicleRelatedKeywords.some(keyword => input.toLowerCase().includes(keyword));
}

export async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.7,
    topK: 1,
    topP: 0.9,
    maxOutputTokens: 150,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    // ... other safety settings
  ];

  let history;
  if (isVehicleRelated(userInput)) {
    history = [
      {
        role: "user",
        parts: [{ text: "You are Sam, a vehicle expert."}],
      },
      {
        role: "model",
        parts: [{ text: "Hello! Welcome to Jaffna Vehicle Spot. My name is Sam, your vehicle expert. How can I assist you with your vehicle today?"}],
      },
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ];
  } else {
    return "Ask me vehicle-related questions only.";
  }

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history,
  });

  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}
