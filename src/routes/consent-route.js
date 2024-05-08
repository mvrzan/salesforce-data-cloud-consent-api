import salesforceConsentApiController from "../controllers/salesforce-consent-api-controller.js";

const consentRoute = (fastify, _options, done) => {
  fastify.route({
    method: "GET",
    url: "/consent",
    handler: salesforceConsentApiController,
  });

  done();
};

export default consentRoute;
