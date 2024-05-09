import axios from "axios";
import process from "process";

const patchShouldForget = async (token, userId) => {
  //   const userId = "003am000001BWl2AAG";
  const url = `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/consent/action/shouldforget?ids=${userId}&mode=cdp&status=optin`;

  const config = {
    method: "PATCH",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);
    console.log(
      "response from CONSENT API and shouldForget PATCH action:",
      response.data
    );

    return response;
  } catch (error) {
    console.error(error);
    return {
      message:
        "There was an error when trying to update the Consent API on the shouldForget action.",
      data: error,
      status: 500,
    };
  }
};

export default patchShouldForget;
