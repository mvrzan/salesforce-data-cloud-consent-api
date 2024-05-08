import salesforceConsentApiController from "../controllers/salesforce-consent-api-controller.js";

const shouldForget = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/shouldForget",
    handler: salesforceConsentApiController,
  });

  done();
};

export default shouldForget;
