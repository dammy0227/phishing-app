// services/modelService.js
import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const hf = new InferenceClient(process.env.HF_API_KEY);

export async function predictPhishing(url) {
  const result = await hf.textClassification({
    model: "ealvaradob/bert-finetuned-phishing",
    inputs: url
  });

  // Convert Hugging Face output to a simple object
  return {
    label: result[0].label,
    confidence: result[0].score
  };
}
