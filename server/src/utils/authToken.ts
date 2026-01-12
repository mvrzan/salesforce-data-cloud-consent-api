import { getCurrentTimestamp } from "./loggingUtil.ts";

let tokenCache: {
  accessToken: string | null;
  instanceUrl: string | null;
  expiresAt: number | null;
} = {
  accessToken: null,
  instanceUrl: null,
  expiresAt: null,
};

interface sfAuthTokenResponse {
  accessToken: string;
  instanceUrl: string;
}

const sfAuthToken = async (): Promise<sfAuthTokenResponse> => {
  try {
    if (tokenCache.accessToken && tokenCache.instanceUrl && tokenCache.expiresAt && Date.now() < tokenCache.expiresAt) {
      console.log(
        `${getCurrentTimestamp()} ♻️ - sfAuthToken - Using cached access token (expires in ${Math.round(
          (tokenCache.expiresAt - Date.now()) / 1000
        )}s)`
      );
      return {
        accessToken: tokenCache.accessToken,
        instanceUrl: tokenCache.instanceUrl,
      };
    }

    console.log(`${getCurrentTimestamp()} 🧰 - sfAuthToken - Requesting new Salesforce access token...`);

    const clientId = process.env.CLIENT_ID || "";
    const clientSecret = process.env.CLIENT_SECRET || "";

    const body = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }).toString();

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    };

    const response = await fetch(`${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`There was an error while getting the Salesforce Access Token: ${response.statusText}`);
    }

    const expiresIn = data.expires_in || 7200;
    const bufferTime = 300;
    const expiresAt = Date.now() + (expiresIn - bufferTime) * 1000;

    tokenCache = {
      accessToken: data.access_token,
      instanceUrl: data.instance_url,
      expiresAt,
    };

    console.log(
      `${getCurrentTimestamp()} ✅ - sfAuthToken - Successfully provided! (valid for ${Math.round(
        (expiresAt - Date.now()) / 1000
      )}s)`
    );

    return { accessToken: data.access_token, instanceUrl: data.instance_url };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`${getCurrentTimestamp()} ❌ - sfAuthToken - Error occurred: ${errorMessage}`);
    throw error;
  }
};

export default sfAuthToken;
