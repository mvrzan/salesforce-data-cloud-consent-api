import axios from "axios";
import process from "process";
import { readUserSettings } from "../../database/user-settings.js";

const getPortabilityStatus = async (token, userId) => {
  const settings = await readUserSettings();

  const salesforceInstanceUrl =
    settings.data[0].salesforce_instance_url ||
    process.env.SALESFORCE_INSTANCE_URL;
  const salesforceApiVersion =
    settings.data[0].salesforce_api_version ||
    process.env.SALESFORCE_API_VERSION;

  const getUrl = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/portability?ids=${userId}&mode=cdp`;
  const patchUrl = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/portability?ids=${userId}&mode=cdp&status=optin`;

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
      "response from CONSENT API and portability action:",
      response.data
    );

    if (
      response.data.results?.result === "Failure" &&
      response.data.results?.errorMessage.includes("INVALID_ID_FIELD")
    ) {
      const patchResponse = await axios.request(patchConfig);
      console.log("patchResponse:", patchResponse.data);

      return patchResponse;
    }

    return response;
  } catch (error) {
    console.error(error);

    return {
      message:
        "There was an error when contacting the Consent API on the portability action.",
      data: error,
      status: 500,
    };
  }
};

export default getPortabilityStatus;
