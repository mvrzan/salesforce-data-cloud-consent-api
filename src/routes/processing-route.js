import processingConsentApiController from "../controllers/processing-consent-api-controller.js";

const processingRoute = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/processing",
    handler: processingConsentApiController,
  });

  done();
};

export default processingRoute;
