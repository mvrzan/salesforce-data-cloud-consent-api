import authToken from "../utils/auth-token.js";
import getShouldForgetStatus from "../utils/get-should-forget-status.js";
import getIndividualId from "../utils/get-individual-id.js";

const fetchShouldForget = async (request, reply) => {
  try {
    const email = request.query.id;
    const token = await authToken();

    if (token.status === 500) {
      throw new Error("Something went wrong with the auth token request.");
    }

    const queryResult = await getIndividualId(token, email);

    if (queryResult.status === 404) {
      return reply.status(404).send({
        message:
          "The individual ID was not found. Please check the email address.",
        data: queryResult.data,
        email: queryResult.email,
      });
    }

    if (queryResult.status === 500) {
      reply.status(500).send({
        message: queryResult.message,
        data: queryResult.data,
      });
    }

    if (!queryResult.individualId) {
      throw new Error("The individual ID was not found.");
    }

    const response = await getShouldForgetStatus(
      token,
      queryResult.individualId,
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
