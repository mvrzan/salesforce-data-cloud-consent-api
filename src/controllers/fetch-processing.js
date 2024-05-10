import authToken from "../utils/auth-token.js";
import getProcessingStatus from "../utils/get-processing-status.js";

const fetchProcessing = async (request, reply) => {
  try {
    const email = request.query.id;
    const token = await authToken();

    if (token.status === 500) {
      throw new Error("Something went wrong with the auth token request.");
    }

    const response = await getProcessingStatus(token, email);

    return reply.status(200).send({
      message:
        "The request to the Consent API and processing action was successful.",
      data: response.data,
    });
  } catch (error) {
    console.log("There was an error with the request:", error);
    return reply.status(500).send({
      message: error.message,
      data: error.stack,
    });
  }
};

export default fetchProcessing;
