import authToken from "../utils/server/auth-token.js";
import getShouldForgetStatus from "../utils/server/get-should-forget-status.js";
import getIndividualId from "../utils/server/get-individual-id.js";

const fetchShouldForget = async (request, reply) => {
  try {
    const email = decodeURIComponent(request.query.id);
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
      queryResult.individualId
    );

    return reply.status(200).send({
      message:
        "The fetch request to the Consent API and shouldforget action was successful.",
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
