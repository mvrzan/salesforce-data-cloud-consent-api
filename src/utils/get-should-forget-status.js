import axios from "axios";
import process from "process";

const getShouldForgetStatus = async (token, userId) => {
  const getUrl = `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/consent/action/shouldforget?ids=${userId}&mode=cdp`;
  const patchUrl = `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/consent/action/shouldforget?ids=${userId}&mode=cdp&status=optout`;

  const getConfig = {
    method: "GET",
    url: getUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const patchConfig = {
    method: "PATCH",
    url: patchUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(getConfig);
    console.log(
      "response from CONSENT API and shouldForget action:",
      response.data
    );

    if (
      response.data.results?.result === "Failure" &&
      response.data.results?.errorMessage.includes("INVALID_ID_FIELD")
    ) {
      const patchResponse = await axios.request(patchConfig);
      console.log("patchResponse:", patchResponse.data);
    }

    return response;
  } catch (error) {
    console.error(error);
    return {
      message:
        "There was an error when contacting the Consent API on the shouldForget action.",
      data: error,
      status: 500,
    };
  }
};

export default getShouldForgetStatus;
