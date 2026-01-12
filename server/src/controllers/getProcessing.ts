import { type Request, type Response } from "express";
import sfAuthToken from "../utils/authToken.ts";
import { getCurrentTimestamp } from "../utils/loggingUtil.ts";

const getProcessing = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const { accessToken } = await sfAuthToken();

    const salesforceInstanceUrl = process.env.SALESFORCE_INSTANCE_URL;
    const salesforceApiVersion = process.env.SALESFORCE_API_VERSION;
    const unifiedIndividualDmoApiName = process.env.UNIFIED_INDIVIDUAL_DMO_API_NAME;
    const unifiedContactPointEmailDmoApiName = process.env.UNIFIED_CONTACT_POINT_EMAIL_DMO_API_NAME;
    const url = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/ssot/queryv2`;

    const query = JSON.stringify({
      sql: `SELECT Salesforce_Id__c 
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
      data: query,
    };

    const queryResult = await fetch(url, queryConfig);

    if (!queryResult.ok) {
      console.error(
        `${getCurrentTimestamp()} ❌ - getProcessing - API Error: ${queryResult.status} ${queryResult.statusText}`
      );

      throw new Error(`There was an error while calling the query endpoint: ${queryResult.statusText}`);
    }

    const queryResultData = await queryResult.json();
    const individualId = queryResultData.data;
    const getUrl = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/processing?ids=${individualId}&mode=cdp`;
    const patchUrl = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/processing?ids=${individualId}&mode=cdp&status=optin`;

    const getConfig = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const patchConfig = {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const getConsentApiResponse = await fetch(getUrl, getConfig);
    const getConsentApiResponseData = await getConsentApiResponse.json();

    if (!getConsentApiResponse.ok) {
      if (
        getConsentApiResponseData.data.results?.result === "Failure" &&
        getConsentApiResponseData.data.results?.errorMessage.includes("INVALID_ID_FIELD")
      ) {
        const patchConsentApiResponse = await fetch(patchUrl, patchConfig);

        if (!patchConsentApiResponse.ok) {
          console.error(
            `${getCurrentTimestamp()} ❌ - getProcessing - API Error: ${getConsentApiResponse.status} ${
              patchConsentApiResponse.statusText
            }`
          );

          throw new Error(
            `There was an error while calling the Consent endpoint: ${patchConsentApiResponse.statusText}`
          );
        }

        res.status(200).send({
          message: "The request to the Consent API and processing action was successful.",
          data: getConsentApiResponseData,
        });
      } else {
        console.error(
          `${getCurrentTimestamp()} ❌ - getProcessing - API Error: ${getConsentApiResponse.status} ${
            getConsentApiResponse.statusText
          }`
        );

        throw new Error(`There was an error while calling the Consent endpoint: ${getConsentApiResponse.statusText}`);
      }
    }

    res.status(200).send({
      message: "The request to the Consent API and processing action was successful.",
      data: getConsentApiResponseData,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `${getCurrentTimestamp()} ❌ - getProcessing - There was a problem when calling Consent API with the processing action:`,
      errorMessage
    );

    res.status(500).json({
      success: false,
      error: "Failed to get current processing status.",
      message: errorMessage,
    });
  }
};

export default getProcessing;
