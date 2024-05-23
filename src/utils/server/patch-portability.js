import axios from "axios";
import process from "process";

const patchPortability = async (token, userId) => {
  const url = `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/consent/action/portability?ids=${userId}&mode=cdp&status=optin`;

  const config = {
    method: "PATCH",
    url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      aws_s3_bucket_id: "data-cloud-consent-data",
      aws_access_key_id: "AKIA2UC27EEINQXJII62",
      aws_secret_access_key: "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",
      aws_s3_folder: "/",
      aws_region: "us-east-2",
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
