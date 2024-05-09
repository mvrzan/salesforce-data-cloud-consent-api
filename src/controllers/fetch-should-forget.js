import authToken from "../utils/auth-token.js";
import getShouldForgetStatus from "../utils/get-should-forget-status.js";
import getIndividualId from "../utils/get-individual-id.js";

const fetchShouldForget = async (request, reply) => {
  try {
    const token = await authToken();

    if (token.status === 500) {
      throw new Error("Something went wrong with the auth token request.");
    }

    const individualId = await getIndividualId(token);

    if (individualId.status === 500) {
      throw new Error("Something went wrong with the individual ID request.");
    }

    if (!individualId) {
      throw new Error("The individual ID was not found.");
    }

    const response = await getShouldForgetStatus(
      token,
      individualId,
      request.method
    );

    return reply.status(200).send({
      message:
        "The request to the Consent API and processing action was successful.",
      data: response.data,
    });
  } catch (error) {
    console.error("There was an error with the request:", error);
    reply.status(500).send({
      message: error.message,
      data: error.stack,
    });
  }
};

export default fetchShouldForget;
