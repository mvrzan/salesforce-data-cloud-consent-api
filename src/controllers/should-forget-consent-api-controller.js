import authTokenModel from "../models/auth-token-model.js";
import shouldForgetModel from "../models/should-forget-model.js";

const shouldForgetConsentApiController = async (_request, reply) => {
  try {
    const token = await authTokenModel();
    const response = await shouldForgetModel(token);

    reply.statusCode = 200;

    return {
      message:
        "The request to the Consent API and shouldForget action was successful.",
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

export default shouldForgetConsentApiController;
