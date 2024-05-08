import authTokenModel from "../models/auth-token-model.js";
import processingModel from "../models/processing-model.js";

const processingConsentApiController = async (_request, reply) => {
  try {
    const token = await authTokenModel();
    const response = await processingModel(token);

    reply.statusCode = 200;

    return {
      message:
        "The request to the Consent API and processing action was successful.",
      data: response.data,
    };
  } catch (error) {
    console.error("There was an error with the request:", error);
    reply.status(500).send(error);

    return {
      message: "There was an error with the request.",
      data: error,
      status: 500,
    };
  }
};

export default processingConsentApiController;
