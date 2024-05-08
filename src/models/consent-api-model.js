import axios from "axios";
import process from "process";

const consentApiModel = async (token) => {
  const userId = "003am000001BWl2AAG";

  const config = {
    method: "GET",
    url: `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/consent/action/shouldforget?ids=${userId}&mode=cdp`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    console.log("response from CONSENT API", response);

    return response;
  } catch (error) {
    console.error(error);
  }
};

export default consentApiModel;
