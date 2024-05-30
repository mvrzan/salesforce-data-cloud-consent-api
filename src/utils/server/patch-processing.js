import axios from "axios";
import process from "process";
import { readUserSettings } from "../../database/user-settings.js";

const patchProcessing = async (token, userId) => {
  const settings = await readUserSettings();

  const salesforceInstanceUrl =
    settings.data[0]?.salesforce_instance_url ||
    process.env.SALESFORCE_INSTANCE_URL;
  const salesforceApiVersion =
    settings.data[0]?.salesforce_api_version ||
    process.env.SALESFORCE_API_VERSION;

  const url = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/processing?ids=${userId}&mode=cdp&status=optout`;

  const config = {
    method: "PATCH",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.request(config);

    return response;
  } catch (error) {
    console.error(error);
    return {
      message:
        "There was an error when trying to update the Consent API on the processing action.",
      data: error,
      status: 500,
    };
  }
};

export default patchProcessing;
