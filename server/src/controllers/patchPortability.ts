import { type Request, type Response } from "express";
import sfAuthToken from "../utils/authToken.ts";
import { getCurrentTimestamp } from "../utils/loggingUtil.ts";

const patchPortability = async (req: Request, res: Response) => {
  try {
    console.log(
      `${getCurrentTimestamp()} 📥 - patchPortability - PATCH request received for the Portability endpoint!`
    );

    const email = req.query.email;
    const { accessToken } = await sfAuthToken();

    const salesforceInstanceUrl = process.env.SALESFORCE_INSTANCE_URL;
    const salesforceApiVersion = process.env.SALESFORCE_API_VERSION;
    const unifiedIndividualDmoApiName = process.env.UNIFIED_INDIVIDUAL_DMO_API_NAME;
    const unifiedContactPointEmailDmoApiName = process.env.UNIFIED_CONTACT_POINT_EMAIL_DMO_API_NAME;
    const url = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/ssot/queryv2`;

    const query = JSON.stringify({
      sql: `SELECT ssot__Id__c 
      FROM ${unifiedIndividualDmoApiName}__dlm 
      WHERE ssot__Id__c IN (
        SELECT ssot__Id__c 
        FROM ${unifiedContactPointEmailDmoApiName}__dlm 
        WHERE ssot__EmailAddress__c = '${email}')`,
    });

    let queryConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: query,
    };

    const queryResult = await fetch(url, queryConfig);

    if (!queryResult.ok) {
      console.error(
        `${getCurrentTimestamp()} ❌ - patchPortability - API Error: ${queryResult.status} ${queryResult.statusText}`
      );

      throw new Error(`There was an error while calling the query endpoint: ${queryResult.statusText}`);
    }

    console.log(`${getCurrentTimestamp()} 💳 - patchPortability - Individual ID retrieved`);

    const queryResultData = await queryResult.json();
    const individualId = queryResultData.data;
    const patchUrl = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/portability?ids=${individualId}&mode=cdp&status=optin`;

    const patchConfig = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        aws_s3_bucket_id: process.env.AWS_S3_BUCKET_ID,
        aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
        aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
        aws_s3_folder: process.env.AWS_S3_FOLDER,
        aws_region: process.env.AWS_REGION,
      }),
    };

    console.log(patchConfig);

    console.log(`${getCurrentTimestamp()} 🔏 - patchPortability - Calling the Consent API`);

    const patchConsentApiResponse = await fetch(patchUrl, patchConfig);

    if (!patchConsentApiResponse.ok) {
      console.error(
        `${getCurrentTimestamp()} ❌ - patchPortability - API Error: ${patchConsentApiResponse.status} ${
          patchConsentApiResponse.statusText
        }`
      );

      throw new Error(`There was an error while calling the Consent endpoint: ${patchConsentApiResponse.statusText}`);
    }

    const patchConsentApiResponseData = await patchConsentApiResponse.json();

    console.log(
      `${getCurrentTimestamp()} ✅ - patchPortability - The request to the Consent API and Portability action was successful!`
    );

    res.status(200).send({
      message: "The request to the Consent API and Portability action was successful.",
      data: patchConsentApiResponseData,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `${getCurrentTimestamp()} ❌ - patchPortability - There was a problem when calling Consent API with the Portability action:`,
      errorMessage
    );

    res.status(500).json({
      success: false,
      error: "Failed to update the current Portability status.",
      message: errorMessage,
    });
  }
};

export default patchPortability;
