import { InferenceClient } from "@huggingface/inference";
import dotenv from "dotenv";
dotenv.config();

const hf = new InferenceClient(process.env.HF_API_KEY);
const testUrl = "https://paypal-security-update.com/login";

async function test() {
  try {
    console.log(`Testing URL: ${testUrl}`);

    const result = await hf.textClassification({
      model: "ealvaradob/bert-finetuned-phishing",
      inputs: testUrl
    });

    console.log("Result:", result);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

test();
