import { InferenceClient } from "@huggingface/inference";
import validator from "validator";
import { URL } from "url";
import dotenv from "dotenv";
dotenv.config();

const hf = new InferenceClient(process.env.HF_API_KEY);

// ✅ Levenshtein distance (detect lookalikes)
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }
  return matrix[a.length][b.length];
}

// ✅ Detect Unicode homoglyph attacks
function containsSuspiciousUnicode(domain) {
  const normalized = domain.normalize("NFKC");
  if (normalized !== domain) return true;
  const safeRegex = /^[a-z0-9.-]+$/;
  return !safeRegex.test(domain);
}

// ✅ Trusted extensions
const trustedExtensions = [".gov.ng", ".edu.ng", ".mil.ng", ".org.ng"];

// ✅ Trusted banks / services
const trustedBanks = [
  "accessbankplc.com", "gtbank.com", "gtcoplc.com",
  "firstbanknigeria.com", "fbnquest.com", "zenithbank.com",
  "uba.com", "stanbicibtc.com", "fcmb.com", "sterling.ng",
  "unionbankng.com", "fidelitybank.ng", "keystonebankng.com",
  "polarisbanklimited.com", "providusbank.com",
  "citibank.com", "citi.com", "sc.com", "standardchartered.com",
  "ecobank.com", "afrilandfirstbank.com", "jaizbankplc.com"
];

// ✅ Trusted global platforms
const trustedServices = [
  "paypal.com",
  "amazon.com",
  "google.com",
  "microsoft.com",
  "stripe.com",
  "facebook.com",
  "apple.com"
];

// ✅ Trusted full URLs (including paths)
const trustedUrls = [
  "https://www.paypal.com/login",
  "https://www.paypal.com/signin",
  "https://www.amazon.com/ap/signin",
  "https://accounts.google.com/signin"
];

export async function predictPhishing(url) {
  if (!validator.isURL(url, { require_protocol: true })) {
    throw new Error("Invalid URL format");
  }

  const parsedUrl = new URL(url);
  const domain = parsedUrl.hostname.toLowerCase();
  const fullUrl = parsedUrl.href.toLowerCase();

  // 🛡 Step 1: Trusted extensions
  if (trustedExtensions.some(ext => domain.endsWith(ext))) {
    return { label: "legitimate", confidence: 1, reason: "Trusted extension" };
  }

  // 🛡 Step 2: Trusted domains
  if (trustedBanks.includes(domain)) {
    return { label: "legitimate", confidence: 1, reason: "Exact trusted bank domain" };
  }
  if (trustedServices.includes(domain)) {
    return { label: "legitimate", confidence: 1, reason: "Trusted global service" };
  }

  // 🛡 Step 3: Trusted full URLs
  if (trustedUrls.includes(fullUrl)) {
    return { label: "legitimate", confidence: 1, reason: "Trusted URL path" };
  }

  // 🛑 Step 4: Homograph check
  if (containsSuspiciousUnicode(domain)) {
    return { label: "phishing", confidence: 0.99, reason: "Suspicious Unicode in domain" };
  }

  // 🛑 Step 5: Lookalike detection
  for (let trusted of trustedBanks) {
    const distance = levenshtein(domain, trusted);
    if (distance <= 2) {
      return { label: "phishing", confidence: 0.97, reason: `Lookalike of ${trusted}` };
    }
  }

  // 🤖 Step 6: AI fallback
  const result = await hf.textClassification({
    model: "ealvaradob/bert-finetuned-phishing",
    inputs: url
  });

  const { label, score } = result[0];
  return { label, confidence: score, reason: "AI classification" };
}
