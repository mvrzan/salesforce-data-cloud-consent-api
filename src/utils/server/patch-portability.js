import axios from "axios";
import process from "process";
import { readUserSettings } from "../../database/user-settings.js";

const patchPortability = async (token, userId) => {
  const settings = await readUserSettings();

  const salesforceInstanceUrl =
    settings.data[0]?.salesforce_instance_url ||
    process.env.SALESFORCE_INSTANCE_URL;
  const salesforceApiVersion =
    settings.data[0]?.salesforce_api_version ||
    process.env.SALESFORCE_API_VERSION;

  const url = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/portability?ids=${userId}&mode=cdp&status=optin`;

  const config = {
    method: "PATCH",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      aws_s3_bucket_id: process.env.AWS_S3_BUCKET_ID,
      aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
      aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
      aws_s3_folder: process.env.AWS_S3_FOLDER,
      aws_region: process.env.AWS_REGION,
    },
  };

  try {
    const response = await axios.request(config);

    if (response.data?.results?.result === "Failure") {
      return {
        message: response.data.results.errorMessage,
        data: response.data,
        status: 500,
      };
    }

    return response;
  } catch (error) {
    console.error(error);
    return {
      message:
        "There was an error when trying to update the Consent API on the portability action.",
      data: error,
      status: 500,
    };
  }
};

export default patchPortability;
