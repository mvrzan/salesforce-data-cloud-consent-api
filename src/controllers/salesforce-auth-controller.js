import authTokenModel from "../models/auth-token-model.js";
import consentApiModel from "../models/consent-api-model.js";

const salesforceAuthController = async (_request, reply) => {
  try {
    const token = await authTokenModel();
    const response = await consentApiModel(token);

    reply.statusCode = 200;

    return {
      message: "Authorization token was successfully retrieved.",
      data: response.data,
    };
  } catch (error) {
    console.error("There was an error when getting the auth token:", error);
    reply.status(500).send(error);

    return {
      message: "There was an error with the request.",
      data: error,
      status: 500,
    };
  }
};

export default salesforceAuthController;
