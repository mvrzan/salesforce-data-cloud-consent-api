import authToken from "../utils/auth-token.js";
import getIndividualId from "../utils/get-individual-id.js";
import patchShouldForget from "../utils/patch-should-forget.js";

const updateShouldForget = async (_request, reply) => {
  try {
    const token = await authToken();

    if (token.status === 500) {
      throw new Error("Something went wrong with the auth token request.");
    }

    const individualId = await getIndividualId(token);

    if (!individualId) {
      throw new Error("The individual ID was not found.");
    }

    const response = await patchShouldForget(token, individualId);

    return reply.status(200).send({
      message:
        "The update request to the Consent API and shouldForget action was successful!",
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

export default updateShouldForget;
