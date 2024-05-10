import axios from "axios";
import process from "process";

const getProcessingStatus = async (token, userId) => {
  const url = `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/consent/action/processing?ids=${userId}&mode=cdp`;

  const config = {
    method: "GET",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    console.log(
      "response from CONSENT API and processing action:",
      response.data
    );

    return response;
  } catch (error) {
    console.error(error);

    return {
      message:
        "There was an error when contacting the Consent API on the processing action.",
      data: error,
      status: 500,
    };
  }
};

export default getProcessingStatus;
