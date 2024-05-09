import authTokenModel from "../models/auth-token-model.js";
import processingModel from "../models/processing-model.js";

const processingConsentApiController = async (_request, reply) => {
  try {
    const token = await authTokenModel();

    if (token.status === 500) {
      throw new Error("Something went wrong with the auth token request.");
    }

    const response = await processingModel(token);

    reply.statusCode = 200;

    return {
      message:
        "The request to the Consent API and processing action was successful.",
      data: response.data,
    };
  } catch (error) {
    console.log("There was an error with the request:", error);
    return reply.status(500).send({
      message: error.message,
      data: error.stack,
    });
  }
};

export default processingConsentApiController;
