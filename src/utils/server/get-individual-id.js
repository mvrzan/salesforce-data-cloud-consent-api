import axios from "axios";
import process from "process";

const getIndividualId = async (token, email) => {
  const url = `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/ssot/queryv2`;
  const query = JSON.stringify({
    sql: `SELECT Salesforce_Id__c 
    FROM ${process.env.UNIFIED_INDIVIDUAL_DMO_API_NAME}__dlm 
    WHERE ssot__Id__c IN (
        SELECT ssot__Id__c 
        FROM ${process.env.UNIFIED_CONTACT_POINT_EMAIL_DMO_API_NAME}__dlm 
        WHERE ssot__EmailAddress__c = '${email}')`,
  });

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: query,
  };

  try {
    const response = await axios.request(config);

    if (!response.data.data[0][0]) {
      return {
        message: `No individual ID found for email: ${email}`,
        data: response.data.data,
        status: 404,
        individualId: undefined,
        email,
      };
    }

    return {
      message: `Found individual ID found for email: ${email}`,
      data: response.data.data,
      status: 200,
      individualId: response.data.data[0][0],
    };
  } catch (error) {
    console.error(error);
    return {
      message: "There was an error when contacting the Data Cloud Query API.",
      data: error,
      status: 500,
    };
  }
};

export default getIndividualId;