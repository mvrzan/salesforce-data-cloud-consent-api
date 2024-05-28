import axios from "axios";
import process from "process";
import { getUserSettings } from "../../database/user-settings.js";

const authToken = async () => {
  const settings = await getUserSettings();

  const username =
    settings.data[0].salesforce_service_username ||
    process.env.SERVICE_USER_USERNAME;
  const password =
    settings.data[0].salesforce_service_password ||
    process.env.SERVICE_USER_PASSWORD;
  const securityToken =
    settings.data[0].salesforce_security_token ||
    process.env.SERVICE_USER_SECURITY_TOKEN;
  const clientId = settings.data[0].client_id || process.env.CLIENT_ID;
  const clientSecret =
    settings.data[0].client_secret || process.env.CLIENT_SECRET;

  const data = new URLSearchParams({
    grant_type: "password",
    username,
    password: password + securityToken,
    client_id: clientId,
    client_secret: clientSecret,
  }).toString();

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: process.env.SALESFORCE_LOGIN_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data,
  };

  try {
    const response = await axios.request(config);

    return response.data.access_token;
  } catch (error) {
    return {
      message: "There was an error when getting the auth token.",
      data: error,
      status: 500,
    };
  }
};

export default authToken;
