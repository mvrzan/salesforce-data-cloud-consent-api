import qs from "qs";
import axios from "axios";
import process from "process";

const authToken = async () => {
  const data = qs.stringify({
    grant_type: "password",
    username: process.env.SERVICE_USER_USERNAME,
    password:
      process.env.SERVICE_USER_PASSWORD +
      process.env.SERVICE_USER_SECURITY_TOKEN,
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
  });

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
