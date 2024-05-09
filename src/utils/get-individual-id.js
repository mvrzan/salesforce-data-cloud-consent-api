import axios from "axios";
import process from "process";

const getIndividualId = async (token, email = "wmartin@example.com") => {
  const url = `${process.env.SALESFORCE_INSTANCE_URL}/services/data/${process.env.SALESFORCE_API_VERSION}/ssot/queryv2`;
  const data = JSON.stringify({
    sql: `select ssot__PartyId__c from ssot__ContactPointEmail__dlm WHERE ssot__EmailAddress__c = '${email}'`,
  });

  let config = {
    method: "POST",
    maxBodyLength: Infinity,
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: data,
  };

  try {
    const response = await axios.request(config);

    console.log("response from Data Cloud Query API:", response);

    return response.data.data[0][0];
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
