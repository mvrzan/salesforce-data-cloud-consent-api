import { type Request, type Response } from "express";
import sfAuthToken from "../utils/authToken.ts";
import { getCurrentTimestamp } from "../utils/loggingUtil.ts";

const getPortability = async (req: Request, res: Response) => {
  try {
    console.log(`${getCurrentTimestamp()} 📥 - getPortability - GET request received for the Portability endpoint!`);

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
        `${getCurrentTimestamp()} ❌ - getPortability - API Error: ${queryResult.status} ${queryResult.statusText}`
      );

      throw new Error(`There was an error while calling the query endpoint: ${queryResult.statusText}`);
    }

    console.log(`${getCurrentTimestamp()} 💳 - getPortability - Individual ID retrieved`);

    const queryResultData = await queryResult.json();
    const individualId = queryResultData.data;
    const getUrl = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/portability?ids=${individualId}&mode=cdp`;
    const patchUrl = `${salesforceInstanceUrl}/services/data/${salesforceApiVersion}/consent/action/portability?ids=${individualId}&mode=cdp&status=optin`;

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

    console.log(`${getCurrentTimestamp()} 🔏 - getPortability - Calling the Consent API`);

    if (!getConsentApiResponse.ok) {
      console.error(
        `${getCurrentTimestamp()} ❌ - getPortability - API Error: ${getConsentApiResponse.status} ${
          getConsentApiResponse.statusText
        }`
      );

      throw new Error(`There was an error while calling the Consent endpoint: ${getConsentApiResponse.statusText}`);
    }

    const getConsentApiResponseData = await getConsentApiResponse.json();
    const invalidIDField: boolean = getConsentApiResponseData.results?.errorMessage.includes("INVALID_ID_FIELD");

    if (invalidIDField) {
      console.log(`${getCurrentTimestamp()} ⛳️ - getPortability - The consent flag has not been configured.`);

      const patchConsentApiResponse = await fetch(patchUrl, patchConfig);

      if (!patchConsentApiResponse.ok) {
        console.error(
          `${getCurrentTimestamp()} ❌ - getPortability - API Error: ${patchConsentApiResponse.status} ${
            patchConsentApiResponse.statusText
          }`
        );

        throw new Error(`There was an error while calling the Consent endpoint: ${patchConsentApiResponse.statusText}`);
      }

      const getConsentApiResponse = await fetch(getUrl, getConfig);
      const getConsentApiResponseData = await getConsentApiResponse.json();

      console.log(
        `${getCurrentTimestamp()} ✅ - getPortability - The request to the Consent API and Portability action was successful!`
      );

      res.status(200).send({
        message: "The request to the Consent API and Portability action was successful.",
        data: getConsentApiResponseData,
      });
    }

    console.log(
      `${getCurrentTimestamp()} ✅ - getPortability - The request to the Consent API and Portability action was successful!`
    );

    res.status(200).send({
      message: "The request to the Consent API and Portability action was successful.",
      data: getConsentApiResponseData,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(
      `${getCurrentTimestamp()} ❌ - getPortability - There was a problem when calling Consent API with the Portability action:`,
      errorMessage
    );

    res.status(500).json({
      success: false,
      error: "Failed to get current Portability status.",
      message: errorMessage,
    });
  }
};

export default getPortability;
