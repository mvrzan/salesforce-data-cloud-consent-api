export type ConsentOperation = "processing" | "shouldForget" | "portability";

function getApiBaseUrl(): string {
  return import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
}

function buildConsentUrl(baseUrl: string, operation: ConsentOperation, email: string): string {
  const safeEmail = encodeURIComponent(email.trim());

  return `${baseUrl}/api/v1/${operation}/${safeEmail}?email=${safeEmail}`;
}

export async function getConsentStatus(params: {
  baseUrl?: string;
  operation: ConsentOperation;
  email: string;
}): Promise<unknown> {
  const baseUrl = params.baseUrl ?? getApiBaseUrl();
  const url = buildConsentUrl(baseUrl, params.operation, params.email);
  return requestJson(url, "GET");
}

export async function updateConsent(params: {
  baseUrl?: string;
  operation: ConsentOperation;
  email: string;
}): Promise<unknown> {
  const baseUrl = params.baseUrl ?? getApiBaseUrl();
  const url = buildConsentUrl(baseUrl, params.operation, params.email);

  return requestJson(url, "PATCH");
}

async function generateSignature(
  method: "GET" | "PATCH",
  pathWithQuery: string
): Promise<{ timestamp: string; signature: string }> {
  const secret = import.meta.env.VITE_API_SECRET;
  if (!secret) {
    throw new Error("VITE_API_SECRET is not configured");
  }

  const timestamp = Date.now().toString();
  const message = `${timestamp}${method}${pathWithQuery}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(message);

  const cryptoKey = await crypto.subtle.importKey("raw", keyData, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = Array.from(new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, messageData)), (byte) =>
    byte.toString(16).padStart(2, "0")
  ).join("");

  return { timestamp, signature };
}

async function requestJson(url: string, method: "GET" | "PATCH"): Promise<unknown> {
  const headers = new Headers();
  const parsedUrl = new URL(url);
  const pathWithQuery = `${parsedUrl.pathname}${parsedUrl.search}`;
  const { timestamp, signature } = await generateSignature(method, pathWithQuery);
  headers.set("x-timestamp", timestamp);
  headers.set("x-signature", signature);

  const response = await fetch(url, { method, headers });

  const contentType = response.headers.get("content-type") ?? "";
  const data: unknown = contentType.includes("application/json") ? await response.json() : await response.text();

  if (!response.ok) {
    const message = typeof data === "string" && data.trim().length > 0 ? data : response.statusText;
    throw new Error(String(message));
  }

  return data;
}
